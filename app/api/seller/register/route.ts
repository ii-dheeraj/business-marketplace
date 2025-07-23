import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/database";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      businessName, category, subcategory, businessState, businessCity, email, phone, password, businessPincode,
      businessArea, businessLocality, businessDescription, businessImage, avatar, deliveryTime
    } = body;
    if (!businessName || !category || !subcategory || !businessState || !businessCity || !phone || !password || !businessPincode) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }
    // Check for existing seller by phone or email
    if (email) {
      const { data: existing, error: emailError } = await supabase
        .from('sellers')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      if (existing) return NextResponse.json({ error: "Email already registered." }, { status: 400 });
    }
    const { data: existingPhone, error: phoneError } = await supabase
      .from('sellers')
      .select('id')
      .eq('phone', phone)
      .maybeSingle();
    if (existingPhone) return NextResponse.json({ error: "Phone number already registered." }, { status: 400 });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create seller
    const { data: seller, error: createError } = await supabase
      .from('sellers')
      .insert([{
        businessName,
        category,
        subcategories: JSON.stringify([subcategory]),
        businessState,
        businessCity,
        businessPincode,
        businessArea: businessArea || null,
        businessLocality: businessLocality || null,
        businessDescription: businessDescription || null,
        businessImage: businessImage || null,
        avatar: avatar || null,
        deliveryTime: deliveryTime || null,
        email: email || null,
        phone,
        password: hashedPassword,
        name: businessName, // Use businessName as default personal name
        businessAddress: "-", // Placeholder, required by schema
      }])
      .select()
      .single();
    if (createError) {
      console.error("[API] Error registering seller:", createError);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ seller });
  } catch (error) {
    console.error("[API] Error registering seller:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 