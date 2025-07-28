import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    
    const envStatus = {
      supabaseUrl: !!supabaseUrl,
      supabaseAnonKey: !!supabaseAnonKey,
      nodeEnv: process.env.NODE_ENV,
      hasEnvFile: !!(supabaseUrl && supabaseAnonKey)
    };

    // Test database connection
    let dbStatus = { connected: false, error: null };
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('count')
        .limit(1);
      
      if (error) {
        dbStatus = { connected: false, error: error.message };
      } else {
        dbStatus = { connected: true, error: null };
      }
    } catch (error: any) {
      dbStatus = { connected: false, error: error.message };
    }

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: envStatus,
      database: dbStatus,
      message: envStatus.hasEnvFile 
        ? "Environment variables are configured" 
        : "Environment variables are missing - create .env.local file"
    });

  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      timestamp: new Date().toISOString(),
      error: error.message,
      message: "Test endpoint failed"
    }, { status: 500 });
  }
} 