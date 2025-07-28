const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedSellerProfiles() {
  console.log('🌱 Seeding seller profiles...');

  try {
    // Sample seller profiles with enhanced data
    const sellerProfiles = [
      {
        name: "Rajesh Kumar",
        email: "rajesh@electronics.com",
        phone: "+91 98765 43210",
        password: "$2a$10$hashedpassword", // In real app, this would be properly hashed
        businessName: "Rajesh Electronics",
        category: "electronics",
        subcategories: JSON.stringify(["Smartphones", "Laptops", "Accessories"]),
        businessAddress: "MG Road, Koramangala",
        businessCity: "Bangalore",
        businessState: "Karnataka",
        businessPincode: "560034",
        businessArea: "Koramangala",
        businessLocality: "1st Block",
        businessDescription: "Premium electronics store with the latest gadgets and accessories. We offer competitive prices and excellent customer service.",
        businessImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
        isVerified: true,
        isPromoted: true,
        rating: 4.5,
        totalReviews: 127,
        deliveryTime: "30-45 min",
        isOpen: true,
        openingHours: "Mon-Sat: 9:00 AM - 9:00 PM, Sun: 10:00 AM - 8:00 PM",
        website: "https://rajeshelectronics.com"
      },
      {
        name: "Priya Sharma",
        email: "priya@fashion.com",
        phone: "+91 98765 43211",
        password: "$2a$10$hashedpassword",
        businessName: "Priya Fashion Boutique",
        category: "fashion",
        subcategories: JSON.stringify(["Women's Clothing", "Accessories", "Footwear"]),
        businessAddress: "Commercial Street, Indiranagar",
        businessCity: "Bangalore",
        businessState: "Karnataka",
        businessPincode: "560038",
        businessArea: "Indiranagar",
        businessLocality: "100 Feet Road",
        businessDescription: "Trendy fashion boutique offering the latest styles in women's clothing, accessories, and footwear. Personalized styling services available.",
        businessImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
        isVerified: true,
        isPromoted: true,
        rating: 4.8,
        totalReviews: 89,
        deliveryTime: "45-60 min",
        isOpen: true,
        openingHours: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 7:00 PM",
        website: "https://priyafashion.com"
      },
      {
        name: "Amit Patel",
        email: "amit@grocery.com",
        phone: "+91 98765 43212",
        password: "$2a$10$hashedpassword",
        businessName: "Amit Fresh Grocery",
        category: "grocery",
        subcategories: JSON.stringify(["Fresh Vegetables", "Fruits", "Dairy", "Grains"]),
        businessAddress: "HSR Layout, Sector 2",
        businessCity: "Bangalore",
        businessState: "Karnataka",
        businessPincode: "560102",
        businessArea: "HSR Layout",
        businessLocality: "Sector 2",
        businessDescription: "Fresh grocery store with organic produce, dairy products, and household essentials. We source directly from local farmers.",
        businessImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
        isVerified: true,
        isPromoted: false,
        rating: 4.3,
        totalReviews: 156,
        deliveryTime: "20-30 min",
        isOpen: true,
        openingHours: "Daily: 6:00 AM - 10:00 PM",
        website: "https://amitfreshgrocery.com"
      },
      {
        name: "Sneha Reddy",
        email: "sneha@restaurant.com",
        phone: "+91 98765 43213",
        password: "$2a$10$hashedpassword",
        businessName: "Sneha's Kitchen",
        category: "food",
        subcategories: JSON.stringify(["South Indian", "North Indian", "Chinese", "Desserts"]),
        businessAddress: "JP Nagar, 3rd Phase",
        businessCity: "Bangalore",
        businessState: "Karnataka",
        businessPincode: "560078",
        businessArea: "JP Nagar",
        businessLocality: "3rd Phase",
        businessDescription: "Authentic Indian cuisine with a modern twist. We serve delicious South Indian, North Indian, and Chinese dishes. Perfect for family dining.",
        businessImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
        isVerified: true,
        isPromoted: true,
        rating: 4.7,
        totalReviews: 203,
        deliveryTime: "35-50 min",
        isOpen: true,
        openingHours: "Mon-Sun: 11:00 AM - 11:00 PM",
        website: "https://snehaskitchen.com"
      },
      {
        name: "Vikram Singh",
        email: "vikram@books.com",
        phone: "+91 98765 43214",
        password: "$2a$10$hashedpassword",
        businessName: "Vikram Bookstore",
        category: "books",
        subcategories: JSON.stringify(["Fiction", "Non-Fiction", "Academic", "Children's Books"]),
        businessAddress: "Whitefield, EPIP Zone",
        businessCity: "Bangalore",
        businessState: "Karnataka",
        businessPincode: "560066",
        businessArea: "Whitefield",
        businessLocality: "EPIP Zone",
        businessDescription: "Comprehensive bookstore with a wide collection of fiction, non-fiction, academic, and children's books. We also offer book recommendations and reading clubs.",
        businessImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        isVerified: true,
        isPromoted: false,
        rating: 4.4,
        totalReviews: 67,
        deliveryTime: "40-55 min",
        isOpen: true,
        openingHours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
        website: "https://vikrambookstore.com"
      },
      {
        name: "Meera Iyer",
        email: "meera@home.com",
        phone: "+91 98765 43215",
        password: "$2a$10$hashedpassword",
        businessName: "Meera Home Decor",
        category: "home",
        subcategories: JSON.stringify(["Furniture", "Decor", "Kitchen", "Bathroom"]),
        businessAddress: "Bannerghatta Road, JP Nagar",
        businessCity: "Bangalore",
        businessState: "Karnataka",
        businessPincode: "560076",
        businessArea: "JP Nagar",
        businessLocality: "5th Phase",
        businessDescription: "Beautiful home decor and furniture store. We offer modern and traditional designs to make your home perfect. Custom furniture available.",
        businessImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        isVerified: true,
        isPromoted: true,
        rating: 4.6,
        totalReviews: 94,
        deliveryTime: "60-90 min",
        isOpen: true,
        openingHours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 11:00 AM - 6:00 PM",
        website: "https://meerahomedecor.com"
      }
    ];

    // Insert seller profiles
    for (const profile of sellerProfiles) {
      const { data, error } = await supabase
        .from('sellers')
        .upsert([profile], { onConflict: 'email' })
        .select();

      if (error) {
        console.error(`❌ Error inserting seller ${profile.businessName}:`, error);
      } else {
        console.log(`✅ Seller profile created/updated: ${profile.businessName}`);
      }
    }

    // Create some sample products for the sellers
    const products = [
      {
        name: "iPhone 14 Pro",
        description: "Latest iPhone with advanced camera system and A16 Bionic chip",
        price: 129999,
        originalPrice: 139999,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
        category: "electronics",
        subcategory: "Smartphones",
        stock: 15,
        inStock: true,
        sellerId: 1
      },
      {
        name: "MacBook Air M2",
        description: "Ultra-thin laptop with M2 chip for ultimate performance",
        price: 114999,
        originalPrice: 124999,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
        category: "electronics",
        subcategory: "Laptops",
        stock: 8,
        inStock: true,
        sellerId: 1
      },
      {
        name: "Designer Saree",
        description: "Elegant silk saree with traditional embroidery work",
        price: 8999,
        originalPrice: 12999,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
        category: "fashion",
        subcategory: "Women's Clothing",
        stock: 25,
        inStock: true,
        sellerId: 2
      },
      {
        name: "Organic Tomatoes",
        description: "Fresh organic tomatoes sourced from local farms",
        price: 80,
        originalPrice: 100,
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop",
        category: "grocery",
        subcategory: "Fresh Vegetables",
        stock: 50,
        inStock: true,
        sellerId: 3
      },
      {
        name: "Masala Dosa",
        description: "Crispy dosa served with sambar and coconut chutney",
        price: 120,
        originalPrice: 150,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
        category: "food",
        subcategory: "South Indian",
        stock: 100,
        inStock: true,
        sellerId: 4
      },
      {
        name: "The Great Gatsby",
        description: "Classic novel by F. Scott Fitzgerald",
        price: 299,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
        category: "books",
        subcategory: "Fiction",
        stock: 30,
        inStock: true,
        sellerId: 5
      },
      {
        name: "Modern Coffee Table",
        description: "Elegant wooden coffee table with storage",
        price: 15999,
        originalPrice: 19999,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        category: "home",
        subcategory: "Furniture",
        stock: 5,
        inStock: true,
        sellerId: 6
      }
    ];

    // Insert products
    for (const product of products) {
      const { data, error } = await supabase
        .from('products')
        .upsert([product], { onConflict: 'id' })
        .select();

      if (error) {
        console.error(`❌ Error inserting product ${product.name}:`, error);
      } else {
        console.log(`✅ Product created/updated: ${product.name}`);
      }
    }

    // Create some sample seller orders for stats
    const sellerOrders = [
      {
        orderId: 1,
        sellerId: 1,
        status: 'DELIVERED',
        items: JSON.stringify([{ productId: 1, quantity: 2, price: 129999 }]),
        subtotal: 259998,
        commission: 25999.8,
        netAmount: 233998.2
      },
      {
        orderId: 2,
        sellerId: 2,
        status: 'DELIVERED',
        items: JSON.stringify([{ productId: 3, quantity: 1, price: 8999 }]),
        subtotal: 8999,
        commission: 899.9,
        netAmount: 8099.1
      },
      {
        orderId: 3,
        sellerId: 4,
        status: 'DELIVERED',
        items: JSON.stringify([{ productId: 5, quantity: 3, price: 120 }]),
        subtotal: 360,
        commission: 36,
        netAmount: 324
      }
    ];

    // Insert seller orders
    for (const order of sellerOrders) {
      const { data, error } = await supabase
        .from('seller_orders')
        .upsert([order], { onConflict: 'id' })
        .select();

      if (error) {
        console.error(`❌ Error inserting seller order:`, error);
      } else {
        console.log(`✅ Seller order created/updated`);
      }
    }

    console.log('🎉 Seller profiles seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding seller profiles:', error);
  }
}

// Run the seeding function
seedSellerProfiles(); 