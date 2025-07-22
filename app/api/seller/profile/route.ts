import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id, name, email, phone, businessName, businessAddress, businessCity, businessArea, businessLocality, businessDescription, businessImage
    } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing seller id" }, { status: 400 });
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
        ...(businessAddress && { businessAddress }),
        ...(businessCity && { businessCity }),
        ...(businessArea && { businessArea }),
        ...(businessLocality && { businessLocality }),
        ...(businessDescription && { businessDescription }),
        ...(businessImage && { businessImage }),
      },
    });
    return NextResponse.json({ seller: updatedSeller });
  } catch (error) {
    console.error("[API] Error updating seller profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 