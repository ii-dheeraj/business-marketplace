import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCustomer, createSeller, createDeliveryAgent, storeUserSession } from "@/lib/database";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      password, 
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
      vehicleType
    } = body;

    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    let user: any;
    let userTypeForResponse: string;

    // Create user based on type
    if (userType === 'CUSTOMER') {
      // Check if customer already exists
      const existingCustomer = await prisma.customer.findUnique({ where: { email } });
      if (existingCustomer) {
        return NextResponse.json({ error: "Customer already exists" }, { status: 409 });
      }

      user = await createCustomer({
        name,
        email,
        password: hashedPassword,
        phone
      });
      userTypeForResponse = 'CUSTOMER';
    } else if (userType === 'SELLER') {
      // Check if seller already exists
      const existingSeller = await prisma.seller.findUnique({ where: { email } });
      if (existingSeller) {
        return NextResponse.json({ error: "Seller already exists" }, { status: 409 });
      }

      if (!businessName || !category || !businessAddress || !businessCity || !businessState || !businessPincode) {
        return NextResponse.json({ error: "Missing required business fields" }, { status: 400 });
      }

      user = await createSeller({
        name,
        email,
        password: hashedPassword,
        phone,
        businessName,
        category,
        subcategories: subcategories ? JSON.stringify(subcategories) : '[]',
        businessAddress,
        businessCity,
        businessState,
        businessPincode,
        businessArea,
        businessLocality,
        businessDescription,
        businessImage,
        deliveryTime: '30-45 min'
      });
      userTypeForResponse = 'SELLER';
    } else if (userType === 'DELIVERY_AGENT') {
      // Check if delivery agent already exists
      const existingDeliveryAgent = await prisma.deliveryAgent.findUnique({ where: { email } });
      if (existingDeliveryAgent) {
        return NextResponse.json({ error: "Delivery agent already exists" }, { status: 409 });
      }

      if (!vehicleNumber || !vehicleType) {
        return NextResponse.json({ error: "Missing required delivery agent fields" }, { status: 400 });
      }

      user = await createDeliveryAgent({
        name,
        email,
        password: hashedPassword,
        phone,
        vehicleNumber,
        vehicleType
      });
      userTypeForResponse = 'DELIVERY_AGENT';
    } else {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 });
    }

    // Store user session with complete data
    const userSession = await storeUserSession(userTypeForResponse, user.id);

    const response = NextResponse.json({ 
      success: true, 
      message: `Successfully registered as ${userTypeForResponse}`,
      user: userSession
    });

    // Set userInfo cookie with complete user data
    response.cookies.set("userInfo", JSON.stringify(userSession), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Set userType cookie for quick access
    response.cookies.set("userType", userTypeForResponse, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Set userId cookie
    response.cookies.set("userId", user.id.toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    console.log(`User registered: ${userTypeForResponse} - ${user.email} (ID: ${user.id})`);

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 