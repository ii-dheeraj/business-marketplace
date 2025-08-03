import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/database";

// Test database connection
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    console.log("[API] GET request for seller profile, ID:", id);
    
    if (id) {
      // Fetch specific seller by ID
      const { data: seller, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("[API] Error fetching seller by ID:", error);
        return NextResponse.json({ error: "Seller not found" }, { status: 404 });
      }
      
      console.log("[API] Found seller:", seller?.id);
      return NextResponse.json({ seller });
    } else {
      // Test database connection (original functionality)
      console.log("[API] Testing database connection...");
      const { data: testSeller, error } = await supabase
        .from('sellers')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        console.error("[API] Database connection failed:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
      }
      
      console.log("[API] Database connection successful, found seller:", testSeller?.id);
      return NextResponse.json({ message: "Database connection working", seller: testSeller });
    }
  } catch (error) {
    console.error("[API] Database connection failed:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[API] Received profile update request:", body);
    
    const {
      id, name, email, phone, businessName, website, businessAddress, businessCity, businessState, businessPincode, businessArea, businessLocality, businessDescription, businessImage, openingHours
    } = body;
    
    if (!id) {
      console.log("[API] Missing seller id");
      return NextResponse.json({ error: "Missing seller id" }, { status: 400 });
    }
    
    console.log("[API] Validating fields...");
    if (!name || !businessName) {
      console.log("[API] Missing name or businessName");
      return NextResponse.json({ error: "Name and Business Name are required" }, { status: 400 });
    }
    if (!businessCity) {
      console.log("[API] Missing businessCity");
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }
    if (!businessState) {
      console.log("[API] Missing businessState");
      return NextResponse.json({ error: "State is required" }, { status: 400 });
    }
    if (!businessPincode || !/^[0-9]{6}$/.test(businessPincode)) {
      console.log("[API] Invalid pincode:", businessPincode);
      return NextResponse.json({ error: "Valid 6-digit pincode is required" }, { status: 400 });
    }
    
    // Validate email format (basic)
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      console.log("[API] Invalid email format:", email);
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    
    console.log("[API] All validations passed, updating seller with ID:", id);
    
    // Prepare update data - convert camelCase to snake_case for database
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (businessName) updateData.business_name = businessName;
    // Note: website column doesn't exist in the database, so we'll skip it
    if (businessAddress) updateData.business_address = businessAddress;
    if (businessCity) updateData.business_city = businessCity;
    if (businessState) updateData.business_state = businessState;
    if (businessPincode) updateData.business_pincode = businessPincode;
    if (businessArea) updateData.business_area = businessArea;
    if (businessLocality) updateData.business_locality = businessLocality;
    if (businessDescription) updateData.business_description = businessDescription;
    if (businessImage) updateData.business_image = businessImage;
    // Note: opening_hours column doesn't exist in the database, so we'll skip it
    
    console.log("[API] Update data:", updateData);
    
    // Update seller using Supabase
    const { data: updatedSeller, error } = await supabase
      .from('sellers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error("[API] Supabase update error:", error);
      return NextResponse.json({ error: "Failed to update seller profile" }, { status: 500 });
    }
    
    console.log("[API] Seller updated successfully:", updatedSeller);
    return NextResponse.json({ seller: updatedSeller });
  } catch (error) {
    console.error("[API] Error updating seller profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 