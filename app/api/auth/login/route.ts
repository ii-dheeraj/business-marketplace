import { NextRequest, NextResponse } from "next/server";
import { findCustomerByEmail, findSellerByEmail, findDeliveryAgentByEmail, storeUserSession, generateLoginOTP, setLoginOTP, validateLoginOTP, clearLoginOTP, findCustomerByPhone, findSellerByPhone, findDeliveryAgentByPhone } from "@/lib/database";
import { sendOTP } from "@/lib/utils";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, password, otp, step } = body;

    // Step 1: Request OTP
    if (step === "request_otp") {
      if (!phone && !email) {
        return NextResponse.json({ error: "Missing phone or email" }, { status: 400 });
      }
      // Find user by phone or email
      let user: any = null;
      let userType: string = '';
      if (phone) {
        user = await findCustomerByPhone(phone) || await findSellerByPhone(phone) || await findDeliveryAgentByPhone(phone);
      } else if (email) {
        user = await findCustomerByEmail(email) || await findSellerByEmail(email) || await findDeliveryAgentByEmail(email);
      }
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      // Use phone from user record if not provided
      const userPhone = user.phone || phone;
      if (!userPhone) {
        return NextResponse.json({ error: "User does not have a phone number on record" }, { status: 400 });
      }
      const otpCode = generateLoginOTP();
      setLoginOTP(userPhone, otpCode);
      await sendOTP(userPhone, otpCode, `Your login OTP is {OTP}`);
      return NextResponse.json({ success: true, message: "OTP sent to your phone (check console in dev)", phone: userPhone });
    }

    // Step 2: Verify OTP
    if (step === "verify_otp") {
      if (!phone || !otp) {
        return NextResponse.json({ error: "Missing phone or OTP" }, { status: 400 });
      }
      // Find user by phone
      let user: any = null;
      let userType: string = '';
      user = await findCustomerByPhone(phone) || await findSellerByPhone(phone) || await findDeliveryAgentByPhone(phone);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      const userPhone = user.phone || phone;
      if (!validateLoginOTP(userPhone, otp)) {
        return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
      }
      clearLoginOTP(userPhone);
      // Determine userType
      if (user.role || user.userType) {
        userType = user.role || user.userType;
      } else if (user.businessName) {
        userType = 'SELLER';
      } else if (user.vehicleNumber) {
        userType = 'DELIVERY_AGENT';
      } else {
        userType = 'CUSTOMER';
      }
      // Store user session
      const userSession = await storeUserSession(userType, user.id);
      const response = NextResponse.json({ 
        success: true, 
        message: `Successfully logged in as ${userType}`,
        user: userSession
      });
      response.cookies.set("userInfo", JSON.stringify(userSession), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      response.cookies.set("userType", userType, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      response.cookies.set("userId", user.id.toString(), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      console.log(`User logged in via OTP: ${userType} - ${user.email} (ID: ${user.id})`);
      return response;
    }

    // Fallback: Password login (legacy)
    if (email && password) {
      // Try to find user in all three tables
      let user: any = null;
      let userType: string = '';
      // Check customer table
      const customer = await findCustomerByEmail(email);
      if (customer) {
        const isValid = await bcrypt.compare(password, customer.password);
        if (isValid) {
          user = customer;
          userType = 'CUSTOMER';
        }
      }
      // Check seller table
      if (!user) {
        const seller = await findSellerByEmail(email);
        if (seller) {
          const isValid = await bcrypt.compare(password, seller.password);
          if (isValid) {
            user = seller;
            userType = 'SELLER';
          }
        }
      }
      // Check delivery agent table
      if (!user) {
        const deliveryAgent = await findDeliveryAgentByEmail(email);
        if (deliveryAgent) {
          const isValid = await bcrypt.compare(password, deliveryAgent.password);
          if (isValid) {
            user = deliveryAgent;
            userType = 'DELIVERY_AGENT';
          }
        }
      }
      if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
      // Store user session with complete data
      const userSession = await storeUserSession(userType, user.id);
      const response = NextResponse.json({ 
        success: true, 
        message: `Successfully logged in as ${userType}`,
        user: userSession
      });
      response.cookies.set("userInfo", JSON.stringify(userSession), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      response.cookies.set("userType", userType, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      response.cookies.set("userId", user.id.toString(), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      console.log(`User logged in: ${userType} - ${user.email} (ID: ${user.id})`);
      return response;
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 