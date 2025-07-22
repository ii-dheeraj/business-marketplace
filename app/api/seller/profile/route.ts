import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id, name, email, phone, businessName, website, businessAddress, businessCity, businessState, businessPincode, businessArea, businessLocality, businessDescription, businessImage, openingHours
    } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing seller id" }, { status: 400 });
    }
    if (!name || !businessName) {
      return NextResponse.json({ error: "Name and Business Name are required" }, { status: 400 });
    }
    if (!businessCity) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }
    if (!businessState) {
      return NextResponse.json({ error: "State is required" }, { status: 400 });
    }
    if (!businessPincode || !/^[0-9]{6}$/.test(businessPincode)) {
      return NextResponse.json({ error: "Valid 6-digit pincode is required" }, { status: 400 });
    }
    // Validate email format (basic)
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    // Update seller
    const updatedSeller = await prisma.seller.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(businessName && { businessName }),
        ...(website && { website }),
        ...(businessAddress && { businessAddress }),
        ...(businessCity && { businessCity }),
        ...(businessState && { businessState }),
        ...(businessPincode && { businessPincode }),
        ...(businessArea && { businessArea }),
        ...(businessLocality && { businessLocality }),
        ...(businessDescription && { businessDescription }),
        ...(businessImage && { businessImage }),
        ...(openingHours && { openingHours }),
      },
    });
    return NextResponse.json({ seller: updatedSeller });
  } catch (error) {
    console.error("[API] Error updating seller profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 