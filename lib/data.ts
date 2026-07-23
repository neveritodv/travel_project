export interface TourItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Desert' | 'Imperial Cities' | 'Mountains' | 'Coastal' | 'Excursion';
  duration: string;
  startingFrom: string;
  pricePerPerson: number;
  featuredImage: string;
  gallery: string[];
  highlights: string[];
  description: string;
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  rating: number;
  reviewCount: number;
}

export interface VehicleItem {
  id: string;
  name: string;
  tagline: string;
  category: 'Executive' | 'SUV 4x4' | 'VIP Van' | 'Luxury Coach';
  passengers: number;
  luggage: number;
  features: string[];
  image: string;
  dayRate: number;
  transferRate: number;
  specs: {
    engine: string;
    seating: string;
    wifi: boolean;
    refreshments: boolean;
    chauffeur: string;
  };
}

export interface DestinationHotspot {
  id: string;
  name: string;
  arabicName: string;
  region: string;
  coordinates: { x: number; y: number }; // Percentage on SVG Map
  category: 'Desert' | 'Imperial' | 'Mountains' | 'Coast' | 'Oasis';
  image: string;
  shortTag: string;
  description: string;
  mustSee: string[];
  driveFromMarrakech: string;
  recommendedDuration: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
  tourTaken: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Booking' | 'Airport' | 'Chauffeur' | 'Tours';
}

// Destination Hotspots across Morocco
export const DESTINATIONS: DestinationHotspot[] = [
  {
    id: 'marrakech',
    name: 'Marrakech',
    arabicName: 'مراكش',
    region: 'Haouz Plain',
    coordinates: { x: 35.0, y: 58.0 },
    category: 'Imperial',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=1200',
    shortTag: 'The Red City & Royal Palaces',
    description: 'A vibrant oasis of ancient medinas, secret riads, aromatic spice souks, and Andalusian architecture backed by the Atlas peaks.',
    mustSee: ['Jemaa el-Fnaa', 'Majorelle Garden', 'Bahia Palace', 'Koutoubia Mosque', 'Souk Semmarine'],
    driveFromMarrakech: '0 Hours (Hub)',
    recommendedDuration: '2 - 4 Days'
  },
  {
    id: 'agafay',
    name: 'Agafay Desert',
    arabicName: 'صحراء أStandard',
    region: 'Marrakech Suburbs',
    coordinates: { x: 27.5, y: 74.0 },
    category: 'Desert',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    shortTag: 'Stone Desert & Luxury Glamping',
    description: 'An ethereal stone desert offering moonlike landscapes, infinity pools, luxury tented camps, camel sunset treks, and starlit dining.',
    mustSee: ['Luxury Desert Camps', 'Sunset Camel Ride', 'Quad Biking Dunes', 'Gourmet Starlight Dinner'],
    driveFromMarrakech: '45 Minutes',
    recommendedDuration: '1 - 2 Days'
  },
  {
    id: 'atlas',
    name: 'Atlas Mountains',
    arabicName: 'جبال الأطلس',
    region: 'High Atlas',
    coordinates: { x: 46.25, y: 76.0 },
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200',
    shortTag: 'Berber Highlands & Valleys',
    description: 'Majestic snow-capped peaks, terraced walnut groves, traditional stone Berber villages, and Kasbah Tamadot panoramic vistas.',
    mustSee: ['Imlil Valley', 'Mount Toubkal Viewpoint', 'Ourika Cascades', 'Traditional Berber House Tea'],
    driveFromMarrakech: '1.5 Hours',
    recommendedDuration: '1 - 2 Days'
  },
  {
    id: 'merzouga',
    name: 'Merzouga (Erg Chebbi)',
    arabicName: 'مرزوكة',
    region: 'Drâa-Tafilalet',
    coordinates: { x: 85.0, y: 66.0 },
    category: 'Desert',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
    shortTag: 'Sahara Golden Sand Dunes',
    description: 'Towering 150-meter golden sand dunes of the true Sahara Desert, offering private luxury camps, camel caravans, and nomadic music.',
    mustSee: ['Erg Chebbi Golden Dunes', 'Royal Desert Luxury Camp', 'Gnawa Village Music', '4x4 Sahara Dune Bashing'],
    driveFromMarrakech: '8.5 Hours (via Dades)',
    recommendedDuration: '3 - 4 Days'
  },
  {
    id: 'ouzoud',
    name: 'Ouzoud Waterfalls',
    arabicName: 'شلالات أوزود',
    region: 'Tadla-Azilal',
    coordinates: { x: 51.25, y: 46.0 },
    category: 'Oasis',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200',
    shortTag: '110m Cascading Cascades',
    description: 'Spectacular 110-meter cascading waterfalls nestled in olive orchards, frequented by wild Barbary macaque monkeys and traditional boats.',
    mustSee: ['Upper Cascade Overlook', 'Barbotine Boat River Cruise', 'Barbary Macaque Reserve', 'Shaded Olive Grove Trails'],
    driveFromMarrakech: '2.5 Hours',
    recommendedDuration: '1 Day Excursion'
  },
  {
    id: 'essaouira',
    name: 'Essaouira',
    arabicName: 'الصويرة',
    region: 'Atlantic Coast',
    coordinates: { x: 16.25, y: 60.0 },
    category: 'Coast',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1200',
    shortTag: 'Atlantic Fortress & Coastal Art',
    description: 'An ancient Portuguese fortification with whitewashed ramparts, blue wooden fishing boats, fresh Atlantic seafood, and relaxed artisan energy.',
    mustSee: ['Mogador Ramparts', 'Skala de la Ville', 'Argan Oil Women Co-op', 'Fresh Harbor Fish Market'],
    driveFromMarrakech: '2.5 Hours',
    recommendedDuration: '1 - 2 Days'
  },
  {
    id: 'chefchaouen',
    name: 'Chefchaouen',
    arabicName: 'شفشاون',
    region: 'Rif Mountains',
    coordinates: { x: 52.5, y: 16.0 },
    category: 'Imperial',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    shortTag: 'The Blue Pearl of Morocco',
    description: 'Enchanting mountain village famous for its powder-blue painted alleyways, leather and weaving crafts, and Andalusian architecture.',
    mustSee: ['Blue Alleyways', 'Outa el-Hammam Square', 'Spanish Mosque Sunset Overlook', 'Ras el-Maa Waterfall'],
    driveFromMarrakech: '7 Hours (via Fes)',
    recommendedDuration: '2 Days'
  },
  {
    id: 'fes',
    name: 'Fes',
    arabicName: 'فاس',
    region: 'Fès-Meknès',
    coordinates: { x: 65.0, y: 30.0 },
    category: 'Imperial',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    shortTag: 'Spiritual & Cultural Capital',
    description: 'The world’s largest car-free urban zone, home to the 9th-century Al Quaraouiyine university, ancient leather tanneries, and royal palaces.',
    mustSee: ['Chouara Leather Tannery', 'Bou Inania Madrasa', 'Bab Bou Jeloud (Blue Gate)', 'Royal Palace Golden Gates'],
    driveFromMarrakech: '5.5 Hours',
    recommendedDuration: '2 - 3 Days'
  }
];

// Luxury Fleet Showcase
export const FLEET: VehicleItem[] = [

  {
    id: 'v-class-maybach',
    name: 'Mercedes-Benz V-Class Maybach Edition',
    tagline: 'The Pinnacle of Executive Road Comfort',
    category: 'VIP Van',
    passengers: 6,
    luggage: 6,
    features: [
      'Reclining Maybach Executive Seats with Massage & Heating',
      'High-Speed Wi-Fi & Apple TV / HDMI Screen',
      'Chilled Minibar with Champagne & Bottled Mineral Water',
      'Panoramic Ambient Starlight Roof',
      'Privacy Partition Wall & Electric Curtains'
    ],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
    dayRate: 450,
    transferRate: 120,
    specs: {
      engine: '2.0L Turbo Diesel V250d 4MATIC',
      seating: '6 VIP Captain Chairs (Face-to-Face or Forward)',
      wifi: true,
      refreshments: true,
      chauffeur: 'Multilingual Professional Uniformed VIP Chauffeur'
    }
  },
  {
    id: 'range-rover-auto',
    name: 'Range Rover Autobiography LWB',
    tagline: 'All-Terrain Luxury for Royal Expeditions',
    category: 'SUV 4x4',
    passengers: 3,
    luggage: 4,
    features: [
      'Executive Rear Class Seating with Calf Rests',
      'Meridian 3D Surround Sound System',
      'Adaptive Air Suspension for Desert Highways & Atlas Curves',
      'Chilled Center Console Drinks Compartment',
      'Soft-close doors & Acoustically Laminated Glass'
    ],
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1200',
    dayRate: 580,
    transferRate: 180,
    specs: {
      engine: '4.4L Twin-Turbo V8 AWD',
      seating: '3 Rear Passengers in Ultra Executive Lounger',
      wifi: true,
      refreshments: true,
      chauffeur: 'Master Desert & Mountain VIP Chauffeur'
    }
  },
  {
    id: 'sprinter-vip',
    name: 'Mercedes-Benz Sprinter VIP Lounge',
    tagline: 'Private Jet Luxury on Four Wheels',
    category: 'Luxury Coach',
    passengers: 12,
    luggage: 12,
    features: [
      'Custom Aviation Armchair Leather Seats with USB Outlets',
      'Integrated Nespresso Bar & Beverage Station',
      'Dual 32-inch Smart 4K Display Screens',
      'Individual Reading Lights & Climate Controls',
      'High Capacity Rear Luggage Bay for Long Expeditions'
    ],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    dayRate: 650,
    transferRate: 220,
    specs: {
      engine: '3.0L V6 Turbo Diesel Heavy Duty',
      seating: '12 VIP Reclining Captains Chairs',
      wifi: true,
      refreshments: true,
      chauffeur: 'Senior Tour Chauffeur & Logistics Manager'
    }
  },
  {
    id: 'land-cruiser-v8',
    name: 'Toyota Land Cruiser V8 Sahara Edition',
    tagline: 'Unstoppable Off-Road Master for Dunes & Atlas',
    category: 'SUV 4x4',
    passengers: 4,
    luggage: 4,
    features: [
      'Full Sahara Dune & Off-Road Specification',
      'Reinforced Suspensions with Maximum Cabin Comfort',
      'Dual Air Conditioning & Tinted Thermal Windows',
      'Integrated Satellite GPS & Emergency Communication',
      'Complimentary Cold Beverages & Fresh Moroccan Towels'
    ],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
    dayRate: 380,
    transferRate: 95,
    specs: {
      engine: '4.5L V8 Twin-Turbo Diesel 4WD',
      seating: '4 Passengers with Generous Legroom',
      wifi: true,
      refreshments: true,
      chauffeur: 'Expert Off-Road Berber Guide Chauffeur'
    }
  }
];

export const VEHICLES = FLEET;

// Catalog of Signature Experiences
export const TOURS: TourItem[] = [
  {
    id: 'royal-sahara-3d',
    title: 'The Royal Sahara Expedition',
    subtitle: 'Marrakech to Erg Chebbi Dunes with Private Luxury Camp',
    category: 'Desert',
    duration: '3 Days / 2 Nights',
    startingFrom: 'Marrakech',
    pricePerPerson: 890,
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200'
    ],
    highlights: [
      'Cross the High Atlas via Tizi n’Tichka Pass (2,260m)',
      'UNESCO World Heritage Kasbah Ait Benhaddou tour',
      'Private luxury desert tent with ensuite bathroom & king bed',
      'Sunset camel trek across golden Erg Chebbi sand dunes',
      'Nomadic campfire music under millions of Sahara stars',
      '4x4 Off-road exploration of Khamlia village & desert oases'
    ],
    description: 'An unforgettable private voyage through dramatic mountain passes, ancient mud-brick kasbahs, and lush palm river canyons, culminating in the golden sands of the Sahara with 5-star desert hospitality.',
    itinerary: [
      {
        day: 1,
        title: 'Marrakech - High Atlas - Ait Benhaddou - Dades Valley',
        description: 'Depart Marrakech in your private VIP vehicle over the majestic Tizi n’Tichka pass. Private guided visit to UNESCO Ait Benhaddou Kasbah (gladiator & Game of Thrones filming site). Continue through Ouarzazate to a charming luxury Kasbah hotel in Dades Valley.'
      },
      {
        day: 2,
        title: 'Dades Valley - Todra Gorge - Merzouga Erg Chebbi',
        description: 'Marvel at 300-meter vertical red rock cliffs at Todra Gorge. Arrive in Merzouga by late afternoon. Board your private camel caravan or 4x4 VIP transfer into Erg Chebbi. Sunset welcome drinks, gourmet Moroccan dinner, Berber drums by the fire, and a starry night in your luxury tent.'
      },
      {
        day: 3,
        title: 'Sunrise in Sahara - Draa Valley - Ouarzazate - Marrakech',
        description: 'Wake to an extraordinary desert sunrise. Enjoy a hot gourmet breakfast before returning west through the palm-filled Draa Valley and anti-Atlas mountains, arriving back in Marrakech by early evening.'
      }
    ],
    inclusions: [
      'Private Mercedes-Benz / VIP 4x4 with Chauffeur',
      '2 Nights Luxury Accommodations (1 Kasbah Hotel, 1 Sahara Royal Camp)',
      'All Breakfasts & Gourmet 3-Course Dinners',
      'Private Camel Sunset Trek & Dune Bashing',
      'All Fuel, Tolls, Bottled Water, and Refreshments',
      'Local Certified English / French Speaking Guides'
    ],
    exclusions: ['International Flights', 'Luncheon Drinks', 'Personal Souvenirs'],
    rating: 4.98,
    reviewCount: 342
  },
  {
    id: 'agafay-sunset-glamping',
    title: 'Agafay Sunset & Starlit Glamping',
    subtitle: 'Private Stone Desert Retreat with Camel Trek & Quad Safari',
    category: 'Desert',
    duration: '1 Day / Overnight Option',
    startingFrom: 'Marrakech',
    pricePerPerson: 220,
    featuredImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200'
    ],
    highlights: [
      'Private transfer from your Marrakech Riad or Hotel',
      'Thrilling 1-Hour Quad Biking or Buggy across desert trails',
      'Sunset Camel Trek dressed in traditional Nomad robes',
      'Infinity Pool access with Atlas mountain horizon backdrop',
      'Candlelit 3-course dinner featuring Lamb Tagine & Pastilla',
      'Live Gnaoua musician performance & campfire tea'
    ],
    description: 'Just 45 minutes from Marrakech lies the Agafay stone desert. Experience serenity, infinity pool relaxation, adrenaline quads, and romantic desert starlight dining without the multi-day drive.',
    itinerary: [
      {
        day: 1,
        title: 'Marrakech to Agafay Luxury Camp',
        description: 'Private 16:00 pickup from your address. Arrival at Agafay Luxury Desert Camp. Quad biking adventure across desert hills, followed by a romantic camel ride as the sun dips below the Atlas peaks. Feast on gourmet Moroccan gastronomy surrounded by flickering lanterns and starry skies. Return or optional overnight glamping stay.'
      }
    ],
    inclusions: [
      'VIP Door-to-Door Roundtrip Transfer',
      'Sunset Camel Safari & Traditional Garb',
      'Full Quad / Buggy Tour with Safety Gear',
      '3-Course Starlight Gourmet Dinner & Mint Tea',
      'Access to Luxury Camp Lounges & Pool'
    ],
    exclusions: ['Alcoholic Beverages', 'Personal Gratuities'],
    rating: 4.95,
    reviewCount: 218
  },
  {
    id: 'atlas-berber-escape',
    title: 'High Atlas & Berber Villages Retreat',
    subtitle: 'Imlil Valley, Kasbah Tamadot Vistas & Private Riad Lunch',
    category: 'Mountains',
    duration: '1 Day Excursion',
    startingFrom: 'Marrakech',
    pricePerPerson: 160,
    featuredImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200'
    ],
    highlights: [
      'Scenic climb through Asni Valley and apple orchards',
      'Private gentle walk / mule trek through stone Berber hamlets',
      'Authentic tea ceremony inside a local family mountain home',
      'Panoramas of Mount Toubkal (4,167m - highest peak in N. Africa)',
      'Gourmet lunch terrace overlooking dramatic mountain gorges',
      'Argan oil co-operative visit operated by local women'
    ],
    description: 'Escape the energy of Marrakech into the cool, tranquil air of the High Atlas. Immerse yourself in genuine Berber hospitality, crisp mountain streams, and majestic terraced landscapes.',
    itinerary: [
      {
        day: 1,
        title: 'Marrakech - Asni - Imlil Valley - High Atlas Return',
        description: 'Morning pickup at 09:00. Drive through Tahanaout and Asni market village. Arrive in Imlil valley at the base of Toubkal. Enjoy a guided stroll through walnut tree orchards and ancient stone hamlets. Savor organic lunch on a cliffside riad terrace before afternoon return.'
      }
    ],
    inclusions: [
      'Private Chauffeur Driven Vehicle',
      'Local Certified Mountain Guide',
      'Berber Family Tea Ceremony',
      '3-Course Organic Mountain Lunch',
      'Mule Riding for children/seniors if desired'
    ],
    exclusions: ['Gratuities'],
    rating: 4.97,
    reviewCount: 189
  },
  {
    id: 'ouzoud-waterfalls-private',
    title: 'Ouzoud Waterfalls & Barbary Macaques',
    subtitle: 'Cascade Escapade with Boat Cruise & Olive Valley Walk',
    category: 'Excursion',
    duration: '1 Day Excursion',
    startingFrom: 'Marrakech',
    pricePerPerson: 140,
    featuredImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200'
    ],
    highlights: [
      'Journey through olive groves of the Middle Atlas foothills',
      'Marvel at 110-meter cascading rainbow waterfalls',
      'Traditional wooden Barbotine boat cruise under the falls spray',
      'Encounter wild Barbary Macaque monkeys in their natural sanctuary',
      'Shaded riverbank lunch overlooking water basins'
    ],
    description: 'Discover one of Morocco’s natural wonders. Cascading 110 meters into a lush green gorge, Ouzoud offers refreshing spray, playful macaque encounters, and picturesque river dining.',
    itinerary: [
      {
        day: 1,
        title: 'Marrakech - Ouzoud Waterfalls - Marrakech',
        description: '08:30 pickup. 2.5 hour smooth drive east. Descend the winding shaded olive path with your private guide. Board a traditional decorated boat to touch the mist of the waterfalls. Enjoy a riverbed Tagine lunch while wild Barbary macaques leap between carob trees. Return by 18:00.'
      }
    ],
    inclusions: [
      'Private Climate-Controlled VIP Vehicle',
      'Local English-Speaking Nature Guide',
      'Waterfall Boat Ride Ticket',
      'Traditional Riverside Tagine Lunch',
      'Bottled Water & Snacks'
    ],
    exclusions: ['Tips'],
    rating: 4.92,
    reviewCount: 165
  },
  {
    id: 'essaouira-coastal-escape',
    title: 'Essaouira Atlantic Fortress & Seafood',
    subtitle: '18th Century Portuguese Ramparts & Mogador Bay',
    category: 'Coastal',
    duration: '1 Day Excursion',
    startingFrom: 'Marrakech',
    pricePerPerson: 150,
    featuredImage: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1200'
    ],
    highlights: [
      'Scenic drive through Argan forests (spot tree-climbing goats)',
      'Stop at a fair-trade Women’s Argan Oil Cooperative',
      'Explore Skala de la Ville ramparts & bronze cannons',
      'Guided walk through art galleries, thuya woodcrafts & medina',
      'Fresh Atlantic grilled seafood lunch right at the harbor'
    ],
    description: 'Experience the bohemian coastal charm of Essaouira (Mogador). Feel the ocean breeze, wander blue-and-white stone alleys, admire thuya wood artisans, and savor freshly caught lobster and fish.',
    itinerary: [
      {
        day: 1,
        title: 'Marrakech - Argan Forest - Essaouira Coastal Town',
        description: '08:30 departure west towards the Atlantic coast. See unique Argan trees. Tour Essaouira’s UNESCO-listed medina, historic harbor fortifications, and lively spice markets. Enjoy grilled seafood overlooking the ocean waves before an afternoon drive back.'
      }
    ],
    inclusions: [
      'Private Luxury Transfer',
      'Certified Local Historic Guide',
      'Fresh Harbor Seafood Lunch',
      'Argan Cooperative Visit'
    ],
    exclusions: ['Gratuities'],
    rating: 4.96,
    reviewCount: 204
  },
  {
    id: 'grand-imperial-7d',
    title: 'Grand Imperial Cities & Desert Tour',
    subtitle: 'Casablanca, Rabat, Chefchaouen, Fes, Sahara & Marrakech',
    category: 'Imperial Cities',
    duration: '7 Days / 6 Nights',
    startingFrom: 'Casablanca / Marrakech',
    pricePerPerson: 1980,
    featuredImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=1200'
    ],
    highlights: [
      'Hassan II Mosque in Casablanca (largest in Africa)',
      'Royal Capital of Rabat & Hassan Tower',
      'Photographer’s dream in Chefchaouen Blue City',
      'Private historian guide in Fes ancient 9,000-alley Medina',
      'Luxury Sahara Desert glamping camp experience',
      'Marrakech Palaces, Majorelle & Private Riad Stays'
    ],
    description: 'The definitive Moroccan luxury odyssey. Unveil the rich tapestry of Morocco’s ancient kingdoms, blue mountain towns, Sahara dunes, and imperial palaces with dedicated VIP chauffeur and luxury 5-star accommodations.',
    itinerary: [
      { day: 1, title: 'Arrival Casablanca - Hassan II Mosque - Rabat', description: 'VIP Airport greeting. Tour the magnificent Hassan II Mosque on the Atlantic shore. Transfer to Rabat imperial capital for stay at a luxury boutique hotel.' },
      { day: 2, title: 'Rabat - Chefchaouen Blue City', description: 'Explore Hassan Tower and Udayas Kasbah. Scenic afternoon drive into Rif Mountains to Chefchaouen. Wandering blue-painted streets at golden hour.' },
      { day: 3, title: 'Chefchaouen - Volubilis Roman Ruins - Fes', description: 'Discover UNESCO Roman mosaics at Volubilis and imperial Meknes gate. Arrive in Fes for a 5-star Riad stay.' },
      { day: 4, title: 'Fes Cultural & Artisan Guided Immersion', description: 'Full-day private guided tour of Fes el-Bali: Tanneries, Madrasas, Royal Palace gates, and ceramics workshops.' },
      { day: 5, title: 'Fes - Ifrane Cedar Forests - Ziz Valley - Sahara Desert', description: 'Journey through Switzerland-like Ifrane, see Barbary macaques in cedar forests, traverse Ziz canyon, and arrive at Erg Chebbi luxury camp.' },
      { day: 6, title: 'Sahara - Todra Gorge - Ouarzazate - Marrakech', description: 'Sahara sunrise, high kasbah routes, and evening arrival in Marrakech.' },
      { day: 7, title: 'Marrakech Imperial Tour & VIP Departure', description: 'Majorelle garden, Bahia palace, and private airport transfer.' }
    ],
    inclusions: [
      'Dedicated Chauffeur & VIP Vehicle for 7 Days',
      '6 Nights 5-Star Boutique Riads & Sahara Royal Camp',
      'All Breakfasts, 3 Dinners including Sahara Feast',
      'Private Certified City Historian Guides',
      'All Entrance Tickets to Monuments & Mosques',
      '24/7 Personal VIP Concierge Support'
    ],
    exclusions: ['International Airfare', 'Personal Shopping'],
    rating: 5.0,
    reviewCount: 129
  }
];

// Testimonials & Reviews
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Eleanor Vance',
    role: 'Luxury Travel Curator',
    location: 'London, UK',
    comment: 'See Morocco Travel redefined what luxury private transport means. Our Maybach V-Class chauffeur, Youssef, was discreet, exceptionally punctual, and knew every secret panorama between Marrakech and the Sahara. Unmatched craftsmanship.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    tourTaken: 'The Royal Sahara Expedition',
    date: 'June 2026'
  },
  {
    id: 't2',
    name: 'Marcus & Sophia Lindqvist',
    role: 'Architectural Designers',
    location: 'Stockholm, Sweden',
    comment: 'From our instant airport greeting in Casablanca to our private glamping tent in Agafay, every single detail was handled with royal care. The AI concierge planned our custom route flawlessly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    tourTaken: 'Grand Imperial Cities & Desert Tour',
    date: 'May 2026'
  },
  {
    id: 't3',
    name: 'Hassan Al-Mansoor',
    role: 'Executive Director',
    location: 'Dubai, UAE',
    comment: 'We booked the Range Rover Autobiography for our executive family trip across the Atlas and Essaouira. Flawless vehicle condition, ice-cold drinks, Wi-Fi, and top safety. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    tourTaken: 'Private Chauffeur & Coastal Escape',
    date: 'July 2026'
  }
];

// Frequently Asked Questions
export const FAQS: FAQItem[] = [
  {
    question: 'How does airport transfer greeting work at Marrakech or Casablanca?',
    answer: 'Your personal chauffeur monitors your flight status in real time. Upon landing, they will be waiting immediately outside customs holding a personalized name sign, assist with all luggage, and guide you to your air-conditioned VIP vehicle with cold beverages waiting.',
    category: 'Airport'
  },
  {
    question: 'Are your tours and chauffeurs 100% private?',
    answer: 'Yes! Every journey with See Morocco Travel is 100% private. You will never share a vehicle with strangers. Your schedule, stops, and pacing are completely tailored to your personal preference.',
    category: 'Booking'
  },
  {
    question: 'What is included in the Luxury Sahara Desert Camp experience?',
    answer: 'Our luxury desert tents feature king-sized beds, premium linens, ensuite private bathroom with hot shower and flush toilet, electricity, sunset camel trek or 4x4 dunes transfer, multi-course candlelight dinner, and live traditional nomad campfire music.',
    category: 'Tours'
  },
  {
    question: 'Can I customize an itinerary or request special dietary / accessibility needs?',
    answer: 'Absolutely. Use our AI Travel Concierge on this site or message our VIP team directly on WhatsApp (+212 600 000 000). We cater to vegetarian, vegan, halal, gluten-free diets and arrange gentle pacing or specialized accessibility upon request.',
    category: 'Chauffeur'
  }
];

// Quick statistics
export const STATS = [
  { label: 'Happy VIP Travelers', value: '12,800+' },
  { label: 'Verified 5-Star Reviews', value: '99.8%' },
  { label: 'Luxury Fleet Vehicles', value: '35+' },
  { label: 'Years of Royal Hospitality', value: '14' }
];

export interface ActivityItem {
  id: string;
  title: string;
  category: 'Adventure' | 'Cultural' | 'Luxury' | 'Culinary';
  location: string;
  duration: string;
  price: number;
  image: string;
  videoUrl?: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
}

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'hot-air-balloon',
    title: 'Sunrise Hot Air Balloon Over Marrakech & Atlas',
    category: 'Luxury',
    location: 'Marrakech Countryside',
    duration: '4 Hours (1 Hr Flight)',
    price: 210,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    shortDesc: 'Float quietly above palm groves, Berber hamlets, and the sunrise horizon of the High Atlas mountains.',
    fullDesc: 'Soar silently into the pink dawn over Marrakech. Watch the morning sun illuminate snow-capped High Atlas peaks while enjoying fresh orange juice in your private basket, followed by a lavish Berber tent breakfast.',
    highlights: ['4WD Hotel Pick-up at Dawn', '1-Hour Private Flight with Certified Master Pilot', 'Champagne or Fresh Juice Toast in the Sky', 'Traditional Royal Berber Tent Breakfast', 'Flight Certificate signed by Captain']
  },
  {
    id: 'quad-buggy-dunes',
    title: 'High Performance Quad & Dune Buggy Safari',
    category: 'Adventure',
    location: 'Agafay Desert or Palmeraie',
    duration: '3 Hours',
    price: 65,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    shortDesc: 'Throttle across rugged stone canyons, dried riverbeds, and golden palm trails with top safety gear.',
    fullDesc: 'Unleash adventure in Agafay or Marrakech Palmeraie on modern 450cc quad bikes or 800cc dune buggies. Led by expert desert guides, navigate rolling trails, riverbeds, and remote mud-brick villages with sunset tea stop.',
    highlights: ['2-Hour Off-Road Quad or Buggy Ride', 'Full Helmet, Goggles & Cheich Scarf Provided', 'Sunset Tea Stop at Berber Oasis', 'Roundtrip Chauffeur Hotel Transfer']
  },
  {
    id: 'royal-cooking-class',
    title: 'Private Royal Tagine & Pastilla Culinary Masterclass',
    category: 'Culinary',
    location: 'Marrakech Organic Farm Riad',
    duration: '4.5 Hours',
    price: 85,
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=1200',
    shortDesc: 'Source fresh spices in the souk and craft authentic saffron lamb tagine with a Master Moroccan Chef.',
    fullDesc: 'Immerse your senses in Moroccan gastronomy. Start with a guided spice market discovery in the Medina, pick fresh herbs from an organic garden riad, and master the art of slow-cooked Tagine, Zaalouk, and sweet Almond Pastilla.',
    highlights: ['Guided Souk Spice & Herb Selection', 'Hands-on Cooking with Master Chef', '4-Course Courtyard Lunch with Wine Pairing', 'Recipe Booklet & Spices Gift Set']
  },
  {
    id: 'nomad-camel-sunset',
    title: 'Nomadic Sunset Camel Safari & Traditional Garb',
    category: 'Cultural',
    location: 'Agafay Desert or Erg Chebbi',
    duration: '2 Hours',
    price: 40,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
    shortDesc: 'Dress in royal blue Tuareg robes and ride gentle camels into the golden sunset dunes.',
    fullDesc: 'Traverse golden slopes in rhythmic calm. Dressed in authentic indigo Tuareg robes and turban scarves, capture iconic silhouette photography as the Moroccan sun paints the horizon in magenta and gold.',
    highlights: ['Gentle Well-Cared Camels', 'Authentic Tuareg Turban & Robes', 'Professional Photo Assistance', 'Fresh Mint Tea & Almond Pastries']
  },
  {
    id: 'atlas-mule-trek',
    title: 'High Atlas Mule Trek & Organic Village Feast',
    category: 'Adventure',
    location: 'Imlil Valley, High Atlas',
    duration: 'Full Day',
    price: 95,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200',
    shortDesc: 'Ride friendly mules through terraced walnut orchards to a cliffside Berber village.',
    fullDesc: 'Journey high above the heat into cool mountain air. Ride sure-footed mules along babbling streams and ancient walnut groves to a secluded Berber home for homemade bread, virgin olive oil, and wood-fired Tagine.',
    highlights: ['Gentle Mule Ride & Guide', 'Terraced Walnut Orchard Walk', 'Organic Home-Cooked Lunch on Terrace', 'Breathtaking Toubkal Mountain Panoramas']
  },
  {
    id: 'sahara-heli-tour',
    title: 'Private Helicopter Charter over Sahara & Kasbahs',
    category: 'Luxury',
    location: 'Marrakech to Sahara',
    duration: '2.5 Hours Flying',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
    shortDesc: 'VIP helicopter flight gliding over the High Atlas snow, Draa Valley, and Erg Chebbi dunes.',
    fullDesc: 'The ultimate VIP thrill. Bypass hours of driving with a private Airbus EC130 helicopter charter. Fly over snowbound Atlas peaks, UNESCO Kasbahs, and land directly on a private helipad next to your luxury desert camp.',
    highlights: ['Private Airbus Helicopter Charter', 'Aerial Views of Ait Benhaddou & Atlas', 'Helipad Touchdown at Luxury Glamping', 'Champagne In-Flight Refreshments']
  }
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Travel Guide' | 'Culture' | 'Luxury Living' | 'Gastronomy';
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'ultimate-guide-luxury-morocco-2026',
    title: 'The Ultimate Guide to Luxury Travel in Morocco for 2026',
    excerpt: 'Discover secret riads, private Maybach transfers, helicopter desert flights, and world-class Berber gastronomy.',
    category: 'Luxury Living',
    readTime: '6 min read',
    date: 'July 18, 2026',
    author: 'Youssef El-Mansouri',
    authorRole: 'Head of VIP Concierge',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=1200',
    content: [
      'Morocco has evolved into one of the world’s premier luxury destinations, seamlessly blending 1,000-year-old royal heritage with world-class modern hospitality.',
      'Whether landing at Marrakech Menara Airport in a private jet or taking an executive Maybach V-Class across the High Atlas, discerning travelers seek authentic depth without compromising on air-conditioned ease, security, or privacy.',
      'Key recommendations for 2026 include booking private glamping tents in Erg Chebbi, experiencing a sunrise hot air balloon flight over the Palmeraie, and relying on certified multilingual chauffeurs who understand local customs and hidden gems.'
    ]
  },
  {
    id: 'post-2',
    slug: 'agafay-vs-sahara-erg-chebbi',
    title: 'Agafay Stone Desert vs Sahara Erg Chebbi: Which to Choose?',
    excerpt: 'Comparing the 45-minute stone desert of Agafay with the golden 150-meter sand dunes of Erg Chebbi Merzouga.',
    category: 'Travel Guide',
    readTime: '5 min read',
    date: 'June 29, 2026',
    author: 'Amira Benali',
    authorRole: 'Senior Expedition Curator',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
    content: [
      'One of the most frequent questions from VIP guests is whether to visit Agafay or Erg Chebbi. The answer lies in your available travel timeframe and landscape preference.',
      'Agafay lies just 45 minutes from Marrakech. It features moonlike stone terrain, luxury infinity pools, quad biking, and starlit dining — ideal for 1 to 2-day escapes.',
      'Erg Chebbi, located 8.5 hours east in Merzouga, features towering 150-meter golden sand dunes, true Sahara vastness, and deep nomadic starlit quietness, requiring a 3 to 4-day private expedition.'
    ]
  },
  {
    id: 'post-3',
    slug: 'art-of-moroccan-hospitality-riads',
    title: 'The Secret World of Private Moroccan Riads & Zellige Craft',
    excerpt: 'Step behind modest wooden doors in the Medina to discover marble courtyards, orange trees, and royal tilework.',
    category: 'Culture',
    readTime: '7 min read',
    date: 'June 12, 2026',
    author: 'Karim Tazi',
    authorRole: 'Cultural Historian',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    content: [
      'In traditional Moroccan architecture, luxury is inward-facing. Modest alleyway walls conceal palatial courtyards with marble fountains, aromatic orange blossoms, and hand-chiseled Zellige tiles.',
      'Staying at a private riad offers complete privacy, bespoke butler service, rooftop sunset dining overlooking the Medina minarets, and an intimate connection to centuries of artisan mastery.'
    ]
  }
];

