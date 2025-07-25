import { NextRequest, NextResponse } from "next/server";
import { createCustomer, createSeller, createDeliveryAgent, storeUserSession, findCustomerByEmail, findSellerByEmail, findDeliveryAgentByEmail, findCustomerByPhone, findSellerByPhone, findDeliveryAgentByPhone } from "@/lib/database";
import { sendOTP } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      userType,
      businessName,
      category,
      subcategories,
      businessAddress,
      businessCity,
      businessState,
      businessPincode,
      businessArea,
      businessLocality,
      businessDescription,
      businessImage,
      vehicleNumber,
      vehicleType,
      otp,
      step
    } = body;

    // Step 1: Request OTP
    if (step === "request_otp") {
      if (!phone) {
        return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
      }
      // Check for duplicate phone/email
      const existingPhone = await findCustomerByPhone(phone) || await findSellerByPhone(phone) || await findDeliveryAgentByPhone(phone);
      const existingEmail = email ? (await findCustomerByEmail(email) || await findSellerByEmail(email) || await findDeliveryAgentByEmail(email)) : null;
      if (existingPhone) {
        return NextResponse.json({ error: "Phone number already registered" }, { status: 409 });
      }
      if (existingEmail) {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 });
      }
      // Send OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      // Store OTP in-memory (for demo, production should use DB or cache)
      globalThis.__signupOtps = globalThis.__signupOtps || {};
      globalThis.__signupOtps[phone] = { otp: otpCode, expiresAt: Date.now() + 5 * 60 * 1000, data: body };
      await sendOTP(phone, otpCode, `Your signup OTP is {OTP}`);
      return NextResponse.json({ success: true, message: "OTP sent to your phone (check console in dev)", phone });
    }

    // Step 2: Verify OTP and create user
    if (step === "verify_otp") {
      if (!phone || !otp) {
        return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
      }
      const store = globalThis.__signupOtps && globalThis.__signupOtps[phone];
      if (!store || Date.now() > store.expiresAt) {
        return NextResponse.json({ error: "OTP expired or not found" }, { status: 400 });
      }
      if (store.otp !== otp) {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
      }
      // Use stored data for user creation
      const regData = store.data;
      let user;
      let userTypeForResponse;
      if (regData.userType === 'CUSTOMER') {
        user = await createCustomer({
          name: regData.name,
          email: regData.email,
          password: '', // No password
          phone: regData.phone
        });
        userTypeForResponse = 'CUSTOMER';
      } else if (regData.userType === 'SELLER') {
        user = await createSeller({
          name: regData.name,
          email: regData.email,
          password: '',
          phone: regData.phone,
          businessName: regData.businessName,
          category: regData.category,
          subcategories: regData.subcategories ? JSON.stringify(regData.subcategories) : '[]',
          businessAddress: regData.businessAddress,
          businessCity: regData.businessCity,
          businessState: regData.businessState,
          businessPincode: regData.businessPincode,
          businessArea: regData.businessArea,
          businessLocality: regData.businessLocality,
          businessDescription: regData.businessDescription,
          businessImage: regData.businessImage,
          deliveryTime: '30-45 min'
        });
        userTypeForResponse = 'SELLER';
      } else if (regData.userType === 'DELIVERY_AGENT') {
        user = await createDeliveryAgent({
          name: regData.name,
          email: regData.email,
          password: '',
          phone: regData.phone,
          vehicleNumber: regData.vehicleNumber,
          vehicleType: regData.vehicleType
        });
        userTypeForResponse = 'DELIVERY_AGENT';
      } else {
        return NextResponse.json({ error: "Invalid user type" }, { status: 400 });
      }
      // Clean up OTP
      delete globalThis.__signupOtps[phone];
      // Store user session
      const userSession = await storeUserSession(userTypeForResponse, user.id);
      const response = NextResponse.json({
        success: true,
        message: `Successfully registered as ${userTypeForResponse}`,
        user: userSession
      });
      response.cookies.set("userInfo", JSON.stringify(userSession), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      response.cookies.set("userType", userTypeForResponse, {
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
      console.log(`User registered: ${userTypeForResponse} - ${user.email} (ID: ${user.id})`);
      return response;
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 