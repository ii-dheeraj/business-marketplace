import { NextRequest, NextResponse } from "next/server";
import { createCustomer, createSeller, createDeliveryAgent, storeUserSession, findCustomerByEmail, findSellerByEmail, findDeliveryAgentByEmail, findCustomerByPhone, findSellerByPhone, findDeliveryAgentByPhone } from "@/lib/database";
import { sendOTP } from "@/lib/utils";

declare global {
  // eslint-disable-next-line no-var
  var __signupOtps: Record<string, { otp: string; expiresAt: number; data: any }>;
}

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
      
      console.log("[DEBUG] Registration request body:", body);
      console.log("[DEBUG] Name field value:", body.name);
      console.log("[DEBUG] User type:", body.userType);
      
      // Validate required fields based on user type
      if (userType === 'SELLER' && (!businessName || !category)) {
        return NextResponse.json({ error: "Business name and category are required for sellers" }, { status: 400 });
      }
      if (userType === 'DELIVERY_AGENT' && (!vehicleNumber || !vehicleType)) {
        return NextResponse.json({ error: "Vehicle number and type are required for delivery agents" }, { status: 400 });
      }
      
      // Check for duplicate phone/email only within the selected userType
      let existingPhone = null;
      let existingEmail = null;
      if (userType === 'CUSTOMER') {
        existingPhone = await findCustomerByPhone(phone);
        existingEmail = email ? await findCustomerByEmail(email) : null;
      } else if (userType === 'SELLER') {
        existingPhone = await findSellerByPhone(phone);
        existingEmail = email ? await findSellerByEmail(email) : null;
      } else if (userType === 'DELIVERY_AGENT') {
        existingPhone = await findDeliveryAgentByPhone(phone);
        existingEmail = email ? await findDeliveryAgentByEmail(email) : null;
      }
      if (existingPhone) {
        return NextResponse.json({ error: "Phone number already registered for this role" }, { status: 409 });
      }
      if (existingEmail) {
        return NextResponse.json({ error: "Email already registered for this role" }, { status: 409 });
      }
      // Send OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      // Store OTP in-memory (for demo, production should use DB or cache)
      globalThis.__signupOtps = globalThis.__signupOtps || {};
      globalThis.__signupOtps[phone] = { otp: otpCode, expiresAt: Date.now() + 5 * 60 * 1000, data: body };
      console.log("[DEBUG] Stored OTP data:", globalThis.__signupOtps[phone].data);
      console.log("[DEBUG] Stored name field:", globalThis.__signupOtps[phone].data.name);
      console.log("[DEBUG] Full stored data:", JSON.stringify(globalThis.__signupOtps[phone].data, null, 2));
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
      console.log("[DEBUG] Retrieved regData for verification:", regData);
      console.log("[DEBUG] Name field in regData:", regData.name);
      console.log("[DEBUG] User type in regData:", regData.userType);
      console.log("[DEBUG] Full regData object:", JSON.stringify(regData, null, 2));
      
      // Ensure we have a name field - this is critical for database constraints
      if (!regData.name || regData.name.trim() === '') {
        console.log("[DEBUG] Name field is missing or empty, using fallback");
        if (regData.userType === 'SELLER') {
          regData.name = regData.businessName || 'Seller';
          console.log("[DEBUG] Using businessName as fallback for seller:", regData.name);
        } else if (regData.userType === 'DELIVERY_AGENT') {
          regData.name = 'Delivery Agent';
          console.log("[DEBUG] Using default name for delivery agent:", regData.name);
        } else if (regData.userType === 'CUSTOMER') {
          regData.name = 'Customer';
          console.log("[DEBUG] Using default name for customer:", regData.name);
        }
        console.log("[DEBUG] Using fallback name:", regData.name);
      }
      
      // Double-check the name field before user creation
      console.log("[DEBUG] Final name field before user creation:", regData.name);
      console.log("[DEBUG] Final userType before user creation:", regData.userType);
      
      // Ensure name is never null or empty
      if (!regData.name || regData.name.trim() === '') {
        console.log("[DEBUG] Name is still empty after fallback, using default");
        regData.name = regData.userType === 'SELLER' ? 'Seller' : 
                      regData.userType === 'DELIVERY_AGENT' ? 'Delivery Agent' : 'Customer';
      }
      
      let user;
      let userTypeForResponse;
      try {
        if (regData.userType === 'CUSTOMER') {
          user = await createCustomer({
            name: regData.name,
            email: regData.email,
            password: '', // No password
            phone: regData.phone,
            countryCode: regData.countryCode || '+91'
          });
          userTypeForResponse = 'CUSTOMER';
        } else if (regData.userType === 'SELLER') {
          // Ensure name is not null - use businessName as fallback
          const sellerName = regData.name || regData.businessName || 'Seller';
          console.log("[DEBUG] Using seller name:", sellerName, "from regData.name:", regData.name, "regData.businessName:", regData.businessName);
          
          // Force set the name if it's still null
          if (!sellerName || sellerName.trim() === '') {
            regData.name = regData.businessName || 'Seller';
          } else {
            regData.name = sellerName;
          }
          
          console.log("[DEBUG] Final seller name being used:", regData.name);
          
          user = await createSeller({
            name: regData.name,
            email: regData.email,
            password: '',
            phone: regData.phone,
            countryCode: regData.countryCode || '+91',
            businessName: regData.businessName,
            category: regData.category,
            subcategories: regData.subcategories ? JSON.stringify(regData.subcategories) : '[]',
            businessAddress: regData.businessAddress || '',
            businessCity: regData.businessCity,
            businessState: regData.businessState,
            businessPincode: regData.businessPincode,
            businessArea: regData.businessArea || '',
            businessLocality: regData.businessLocality || '',
            businessDescription: regData.businessDescription || '',
            businessImage: regData.businessImage || '',
            deliveryTime: '30-45 min'
          });
          userTypeForResponse = 'SELLER';
        } else if (regData.userType === 'DELIVERY_AGENT') {
          // Ensure name is not null - use a default fallback
          const agentName = regData.name || 'Delivery Agent';
          console.log("[DEBUG] Using delivery agent name:", agentName, "from regData.name:", regData.name);
          user = await createDeliveryAgent({
            name: agentName,
            email: regData.email,
            password: '',
            phone: regData.phone,
            countryCode: regData.countryCode || '+91',
            vehicleNumber: regData.vehicleNumber,
            vehicleType: regData.vehicleType
          });
          userTypeForResponse = 'DELIVERY_AGENT';
        } else {
          return NextResponse.json({ error: "Invalid user type" }, { status: 400 });
        }
      } catch (err) {
        console.error('Error during user creation:', err);
        if (err && typeof err === 'object' && 'message' in err) {
          console.error('Supabase/DB error message:', (err as any).message);
        }
        console.error('regData at error:', regData);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
      // Clean up OTP
      delete globalThis.__signupOtps[phone];
      // Store user session
      const userSession = await storeUserSession(userTypeForResponse, user.id);
      console.log("[DEBUG] User session created:", userSession);
      
      // Clean the userSession object to ensure it's JSON-safe
      const cleanUserSession: any = {
        id: userSession.id,
        name: userSession.name || '',
        email: userSession.email || '',
        phone: userSession.phone || '',
        userType: userSession.userType || userTypeForResponse,
      };
      
      // Add seller-specific fields if they exist
      if (userTypeForResponse === 'SELLER') {
        const sellerSession = userSession as any;
        if (sellerSession.businessName) cleanUserSession.businessName = sellerSession.businessName;
        if (sellerSession.category) cleanUserSession.category = sellerSession.category;
        if (sellerSession.businessCity) cleanUserSession.businessCity = sellerSession.businessCity;
        if (sellerSession.businessState) cleanUserSession.businessState = sellerSession.businessState;
      }
      
      console.log("[DEBUG] Clean user session:", cleanUserSession);
      
      const userInfoString = JSON.stringify(cleanUserSession);
      console.log("[DEBUG] userInfo JSON string:", userInfoString);
      
      const response = NextResponse.json({
        success: true,
        message: `Successfully registered as ${userTypeForResponse}`,
        user: cleanUserSession
      });
      
      // Set cookies with proper encoding
      response.cookies.set("userInfo", userInfoString, {
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
      
      console.log("[DEBUG] Cookies set - userInfo:", JSON.stringify(userSession).substring(0, 100) + "...");
      console.log("[DEBUG] Cookies set - userType:", userTypeForResponse);
      console.log("[DEBUG] Cookies set - userId:", user.id);
      console.log(`User registered: ${userTypeForResponse} - ${user.email} (ID: ${user.id})`);
      return response;
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Registration error:", error);
    if (typeof error === 'object' && error !== null && 'stack' in error) {
      console.error('Error stack:', (error as any).stack);
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 