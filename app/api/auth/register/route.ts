import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, userType, category, city, area, locality, address, promoted } = body;

    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Removed unique email check
    // const existingUser = await prisma.user.findUnique({ where: { email } });
    // if (existingUser) {
    //   return NextResponse.json({ error: "User already exists" }, { status: 409 });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        userType,
        ...(userType === "seller"
          ? {
              category,
              city,
              area,
              locality,
              address,
              promoted: promoted || false,
            }
          : {}),
      },
    });

    const response = NextResponse.json({ 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email, userType: user.userType } 
    });

    // Set userInfo cookie
    response.cookies.set("userInfo", JSON.stringify({ 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      userType: user.userType 
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 