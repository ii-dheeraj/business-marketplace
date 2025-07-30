// Original category structure for seller signup (with subcategories)
export const CATEGORIES_WITH_SUBCATEGORIES = [
  {
    id: "professional-services",
    name: "Professional Services",
    subcategories: ["Consulting", "Legal Services", "Accounting", "Marketing", "Design", "IT Services", "Education", "Training"]
  },
  {
    id: "electronics",
    name: "Electronics",
    subcategories: ["Mobile Phones", "Computers", "Accessories", "Home Electronics", "Gaming", "Audio Equipment"]
  },
  {
    id: "fashion-apparel",
    name: "Fashion & Apparel",
    subcategories: ["Men's Clothing", "Women's Clothing", "Kids' Clothing", "Footwear", "Accessories", "Jewelry"]
  },
  {
    id: "home-living",
    name: "Home & Living",
    subcategories: ["Furniture", "Kitchen & Dining", "Bedding", "Decor", "Appliances", "Garden"]
  },
  {
    id: "beauty-wellness",
    name: "Beauty & Wellness",
    subcategories: ["Skincare", "Haircare", "Makeup", "Fragrances", "Spa Services", "Fitness"]
  },
  {
    id: "food-grocery",
    name: "Food & Grocery",
    subcategories: ["Fresh Produce", "Dairy", "Bakery", "Beverages", "Snacks", "Organic Foods"]
  },
  {
    id: "digital-software",
    name: "Digital / Software",
    subcategories: ["Mobile Apps", "Web Applications", "Software Tools", "Digital Content", "E-books", "Online Courses"]
  },
  {
    id: "health-therapy",
    name: "Health & Therapy",
    subcategories: ["Medical Services", "Dental Care", "Mental Health", "Physiotherapy", "Alternative Medicine", "Nutrition"]
  },
  {
    id: "automotive",
    name: "Automotive",
    subcategories: ["Car Sales", "Auto Parts", "Car Services", "Motorcycles", "Commercial Vehicles", "Auto Accessories"]
  },
  {
    id: "other",
    name: "Other",
    subcategories: ["Handmade", "Vintage", "Collectibles", "Custom Items", "Import/Export", "Wholesale"]
  }
];

// Simple categories for product form (without subcategories)
export const CATEGORIES = [
  "Professional Services",
  "Electronics",
  "Fashion & Apparel", 
  "Home & Living",
  "Beauty & Wellness",
  "Food & Grocery",
  "Digital / Software",
  "Health & Therapy",
  "Automotive",
  "Other"
];

// Functions for seller signup form
export const getSubcategoriesByCategory = (categoryId: string) => {
  const category = CATEGORIES_WITH_SUBCATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.subcategories : [];
};

export const getCategoryById = (id: string) => {
  return CATEGORIES_WITH_SUBCATEGORIES.find(cat => cat.id === id);
};

export const getCategoryByName = (name: string) => {
  return CATEGORIES_WITH_SUBCATEGORIES.find(cat => cat.name === name);
};

export const getAllCategories = () => {
  return CATEGORIES_WITH_SUBCATEGORIES;
}; 