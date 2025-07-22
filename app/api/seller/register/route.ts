import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      businessName, category, subcategory, businessState, businessCity, email, phone, password, businessPincode
    } = body;
    if (!businessName || !category || !subcategory || !businessState || !businessCity || !phone || !password || !businessPincode) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }
    // Check for existing seller by phone or email
    if (email) {
      const existing = await prisma.seller.findFirst({ where: { email } });
      if (existing) return NextResponse.json({ error: "Email already registered." }, { status: 400 });
    }
    const existingPhone = await prisma.seller.findFirst({ where: { phone } });
    if (existingPhone) return NextResponse.json({ error: "Phone number already registered." }, { status: 400 });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create seller
    const seller = await prisma.seller.create({
      data: {
        businessName,
        category,
        subcategories: JSON.stringify([subcategory]),
        businessState,
        businessCity,
        businessPincode,
        email: email || null,
        phone,
        password: hashedPassword,
        name: businessName, // Use businessName as default personal name
        businessAddress: "-", // Placeholder, required by schema
      },
    });
    return NextResponse.json({ seller });
  } catch (error) {
    console.error("[API] Error registering seller:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 