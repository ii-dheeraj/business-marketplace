import { NextRequest, NextResponse } from "next/server";
import { findCustomerByEmail, findSellerByEmail, findDeliveryAgentByEmail, storeUserSession, generateLoginOTP, setLoginOTP, validateLoginOTP, clearLoginOTP, findCustomerByPhone, findSellerByPhone, findDeliveryAgentByPhone } from "@/lib/database";
import { sendOTP } from "@/lib/utils";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Supabase configuration missing:', { supabaseUrl: !!supabaseUrl, supabaseAnonKey: !!supabaseAnonKey });
      return NextResponse.json({ 
        error: "Database configuration error. Please check environment variables." 
      }, { status: 500 });
    }

    const body = await request.json();
    const { email, phone, password, otp, step } = body;

    // Step 1: Request OTP
    if (step === "request_otp") {
      if (!phone && !email) {
        return NextResponse.json({ error: "Missing phone or email" }, { status: 400 });
      }
      // Only check the selected userType's table
      let user: any = null;
      let type: string = body.userType;
      if (phone) {
        if (type === 'CUSTOMER') user = await findCustomerByPhone(phone);
        else if (type === 'SELLER') user = await findSellerByPhone(phone);
        else if (type === 'DELIVERY_AGENT') user = await findDeliveryAgentByPhone(phone);
      } else if (email) {
        if (type === 'CUSTOMER') user = await findCustomerByEmail(email);
        else if (type === 'SELLER') user = await findSellerByEmail(email);
        else if (type === 'DELIVERY_AGENT') user = await findDeliveryAgentByEmail(email);
      }
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
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
      // Only check the selected userType's table
      let user: any = null;
      let type: string = body.userType;
      if (type === 'CUSTOMER') user = await findCustomerByPhone(phone);
      else if (type === 'SELLER') user = await findSellerByPhone(phone);
      else if (type === 'DELIVERY_AGENT') user = await findDeliveryAgentByPhone(phone);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      const userPhone = user.phone || phone;
      if (!validateLoginOTP(userPhone, otp)) {
        return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
      }
      clearLoginOTP(userPhone);
      // Store user session
      const userSession = await storeUserSession(type, user.id);
      
      // Create a minimal user object for cookies (without large data like images)
      const cookieUser = {
        id: userSession.id,
        name: userSession.name,
        email: userSession.email,
        phone: userSession.phone,
        userType: userSession.userType,
        businessName: userSession.businessName,
        category: userSession.category,
        subcategories: userSession.subcategories,
        businessAddress: userSession.businessAddress,
        businessCity: userSession.businessCity,
        businessArea: userSession.businessArea,
        businessLocality: userSession.businessLocality,
        businessDescription: userSession.businessDescription,
        // Don't include businessImage in cookie to prevent corruption
      };
      
      const response = NextResponse.json({ 
        success: true, 
        message: `Successfully logged in as ${type}`,
        user: userSession
      });
      response.cookies.set("userInfo", JSON.stringify(cookieUser), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      response.cookies.set("userType", type, {
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
      console.log(`User logged in via OTP: ${type} - ${user.email} (ID: ${user.id})`);
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
      
      // Create a minimal user object for cookies (without large data like images)
      const cookieUser = {
        id: userSession.id,
        name: userSession.name,
        email: userSession.email,
        phone: userSession.phone,
        userType: userSession.userType,
        businessName: userSession.businessName,
        category: userSession.category,
        subcategories: userSession.subcategories,
        businessAddress: userSession.businessAddress,
        businessCity: userSession.businessCity,
        businessArea: userSession.businessArea,
        businessLocality: userSession.businessLocality,
        businessDescription: userSession.businessDescription,
        // Don't include businessImage in cookie to prevent corruption
      };
      
      const response = NextResponse.json({ 
        success: true, 
        message: `Successfully logged in as ${userType}`,
        user: userSession
      });
      response.cookies.set("userInfo", JSON.stringify(cookieUser), {
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