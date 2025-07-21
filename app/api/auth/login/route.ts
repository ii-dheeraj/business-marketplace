import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { findCustomerByEmail, findSellerByEmail, findDeliveryAgentByEmail, storeUserSession } from "@/lib/database";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

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

    // Set userInfo cookie with complete user data
    response.cookies.set("userInfo", JSON.stringify(userSession), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Set userType cookie for quick access
    response.cookies.set("userType", userType, {
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

    console.log(`User logged in: ${userType} - ${user.email} (ID: ${user.id})`);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 