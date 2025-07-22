// utils/indian-location-data.ts

export const indianStateCityMap: Record<string, string[]> = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  "Delhi": ["New Delhi", "Delhi"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  // ... (add all states and their major cities)
};

export const indianStates = Object.keys(indianStateCityMap); 