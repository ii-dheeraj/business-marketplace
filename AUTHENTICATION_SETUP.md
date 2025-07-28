# 🔐 Authentication Setup Guide

## ❌ Current Issue: "Failed to Fetch" Error

The "failed to fetch" error during sign-in is caused by missing environment variables for Supabase connection.

## ✅ Solution Steps

### 1. Create Environment File

Create a `.env.local` file in your project root with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# For server-side API routes
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Environment
NODE_ENV=development
```

### 2. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon public** key
5. Replace the placeholder values in `.env.local`

### 3. Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Test the Setup

Run the debug script to verify everything is working:

```bash
node test-auth-debug.js
```

### 5. Verify Database Connection

Visit `http://localhost:3000/api/test` in your browser to check:
- Environment variables are loaded
- Database connection is working
- API endpoints are responding

## 🔧 Troubleshooting

### If you still get "Failed to Fetch":

1. **Check Server Status**
   - Make sure your Next.js server is running on port 3000
   - Check terminal for any error messages

2. **Check Environment Variables**
   - Verify `.env.local` file exists in project root
   - Ensure Supabase URL and key are correct
   - Restart the development server after adding environment variables

3. **Check Browser Console**
   - Open browser developer tools (F12)
   - Check Console tab for any JavaScript errors
   - Check Network tab for failed API requests

4. **Check Database Tables**
   - Ensure your Supabase database has the required tables:
     - `customers`
     - `sellers` 
     - `delivery_agents`
   - Run the SQL schema if needed: `supabase_schema.sql`

### Common Issues:

1. **Environment Variables Not Loading**
   - Make sure file is named `.env.local` (not `.env`)
   - Restart the development server
   - Check for typos in variable names

2. **Supabase Connection Failed**
   - Verify Supabase project is active
   - Check if IP is allowed in Supabase settings
   - Ensure database is not paused

3. **CORS Issues**
   - Add your localhost URL to Supabase allowed origins
   - Check browser console for CORS errors

## 🧪 Testing Authentication

### Test with Demo Accounts:

**Customer:**
- Phone: `+919876543210`
- Email: `customer@example.com`

**Seller:**
- Phone: `+919876543211`
- Email: `seller@example.com`

**Delivery Agent:**
- Phone: `+919876543212`
- Email: `delivery@example.com`

### Manual Testing:

1. Go to `http://localhost:3000`
2. Click "Sign In" or "Sign Up"
3. Select user type (Customer/Seller/Delivery Agent)
4. Enter phone number
5. Check console for OTP (in development mode)
6. Enter OTP to complete authentication

## 📞 Support

If you're still experiencing issues:

1. Run the debug script: `node test-auth-debug.js`
2. Check the test endpoint: `http://localhost:3000/api/test`
3. Review browser console and server logs
4. Ensure all environment variables are properly set

## ✅ Success Indicators

When everything is working correctly:

- ✅ No "Failed to fetch" errors
- ✅ OTP is generated and sent (check console)
- ✅ User can successfully sign in
- ✅ User is redirected to appropriate dashboard
- ✅ User session is maintained across page refreshes

---

**Note:** This setup is required for the authentication system to work properly. The "failed to fetch" error will persist until the environment variables are configured correctly. 