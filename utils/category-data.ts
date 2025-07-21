export const CATEGORIES = [
  {
    id: 'retail-general-stores',
    name: 'Grocery',
    subcategories: [
      'Kirana / Grocery Stores',
      'Supermarkets / Hypermarkets (e.g., Big Bazaar, DMart)',
      'Department Stores',
      'Provision Stores',
      'Discount Stores',
      'Convenience Stores',
    ],
  },
  {
    id: 'food-beverage',
    name: '🍛 Food & Beverage',
    subcategories: [
      'Restaurants (Veg / Non-Veg / Multi-Cuisine)',
      'Cafes & Coffee Shops',
      'Bakeries & Sweet Shops',
      'Juice Centers / Shakes & Smoothies',
      'Ice Cream Parlours',
      'Street Food Stalls / Tiffin Centers',
      'Cloud Kitchens / Takeaway Counters',
      'Organic / Health Food Stores',
    ],
  },
  {
    id: 'apparel-accessories',
    name: '🧥 Apparel & Accessories',
    subcategories: [
      "Men's Wear Shops",
      "Women's Wear Shops",
      'Kids & Baby Wear Stores',
      'Saree / Ethnic Wear Stores',
      'Lingerie / Innerwear Stores',
      'Footwear Stores',
      'Fashion Boutiques',
      'Jewelry Stores (Gold / Silver / Artificial)',
      'Watches & Accessories Stores',
      'Tailoring & Alteration Shops',
    ],
  },
  {
    id: 'home-living',
    name: '🛋️ Home & Living',
    subcategories: [
      'Furniture Stores',
      'Home Decor / Interior Stores',
      'Mattress & Bedding Stores',
      'Lighting & Electricals',
      'Hardware & Sanitary Ware Shops',
      'Paint & Wallpaper Shops',
      'Kitchenware / Crockery Stores',
    ],
  },
  {
    id: 'electronics-appliances',
    name: '📱 Electronics & Appliances',
    subcategories: [
      'Mobile Stores',
      'Laptop / Computer Stores',
      'TV & Home Appliances Stores',
      'Electronic Components / Repair Shops',
      'AC / Refrigerator Dealers',
      'Camera & Accessories Stores',
    ],
  },
  {
    id: 'beauty-wellness',
    name: '🧴 Beauty & Wellness',
    subcategories: [
      'Salons (Men / Women / Unisex)',
      'Spas & Massage Parlours',
      'Cosmetic Stores',
      'Ayurvedic / Herbal Product Stores',
      'Tattoo Studios',
      'Perfume & Fragrance Shops',
      'Weight Loss / Slimming Centers',
    ],
  },
  {
    id: 'handicrafts-art',
    name: '🧶 Handicrafts & Art',
    subcategories: [
      'Handicraft Stores',
      'Painting & Art Supplies',
      'Handloom & Khadi Shops',
      'Antique / Curio Shops',
    ],
  },
  {
    id: 'education-stationery',
    name: '📚 Education & Stationery',
    subcategories: [
      'Book Stores',
      'Stationery Shops',
      'Coaching Centers / Tuition Classes',
      'School Uniform / Bag Shops',
      'Educational Toy Stores',
    ],
  },
  {
    id: 'health-medical',
    name: '🏥 Health & Medical',
    subcategories: [
      'Pharmacy / Chemist Shops',
      'Medical Equipment Stores',
      'Clinics / Diagnostic Labs',
      'Ayurvedic / Homeopathy Shops',
      'Optical Stores',
      'Veterinary & Pet Clinics',
    ],
  },
  {
    id: 'automotive',
    name: '🛠️ Automotive',
    subcategories: [
      'Car Showrooms',
      'Bike Showrooms',
      'Spare Parts Shops',
      'Tyre Dealers',
      'Vehicle Repair & Service Centers',
      'Car Wash / Detailing Centers',
    ],
  },
  {
    id: 'pets-livestock',
    name: '🐾 Pets & Livestock',
    subcategories: [
      'Pet Shops',
      'Aquarium / Fish Shops',
      'Poultry & Feed Stores',
    ],
  },
  {
    id: 'construction-building',
    name: '🏗️ Construction & Building Material',
    subcategories: [
      'Cement / Steel / Bricks Suppliers',
      'Tile & Marble Stores',
      'Plumbing / Electrical Material Stores',
      'Paint & Construction Tools Stores',
    ],
  },
  {
    id: 'travel-lifestyle',
    name: '🧳 Travel & Lifestyle',
    subcategories: [
      'Travel Agencies',
      'Luggage & Bags Stores',
      'Gift Shops',
      'Toy Stores',
      'Sports & Fitness Stores',
      'Optical / Sunglass Shops',
    ],
  },
  {
    id: 'professional-services',
    name: '💼 Professional Services',
    subcategories: [
      'Photocopy / Printing Shops',
      'Courier & Cargo Agencies',
      'Cyber Cafes / Internet Centers',
      'Real Estate Agencies',
      'Legal / Tax / CA Offices',
    ],
  },
  {
    id: 'religious-cultural',
    name: '🕌 Religious & Cultural',
    subcategories: [
      'Puja Samagri Shops',
      'Astrology / Vastu Consultants',
      'Handloom / Cultural Stores',
    ],
  },
];

export const getCategoryById = (id: string) => {
  return CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryByName = (name: string) => {
  return CATEGORIES.find(cat => cat.name === name);
};

export const getAllCategories = () => {
  return CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name
  }));
};

export const getSubcategoriesByCategory = (categoryId: string) => {
  const category = getCategoryById(categoryId);
  return category ? category.subcategories : [];
}; 