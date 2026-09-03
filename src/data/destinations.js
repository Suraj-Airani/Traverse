// Static destination data — images are fetched live from Pexels
const destinations = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    tags: ["City", "Historic"],
    lat: 48.8566,
    lng: 2.3522,
    description:
      "The City of Light enchants with its iconic landmarks, world-class museums, and café-lined boulevards. From the Eiffel Tower to Montmartre, Paris blends timeless elegance with vibrant culture.",
    famousPlaces: [
      {
        name: "Eiffel Tower",
        description:
          "The wrought-iron masterpiece and symbol of Paris, offering panoramic views from its observation decks.",
      },
      {
        name: "Louvre Museum",
        description:
          "The world's largest art museum, home to the Mona Lisa and over 380,000 works spanning millennia.",
      },
      {
        name: "Notre-Dame Cathedral",
        description:
          "A medieval Gothic cathedral on the Île de la Cité, renowned for its architecture and history.",
      },
    ],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    tags: ["City", "Historic"],
    lat: 35.6762,
    lng: 139.6503,
    description:
      "A dazzling collision of ultra-modern technology and ancient tradition. Neon-lit skyscrapers tower beside centuries-old temples, while the food scene is unmatched anywhere on Earth.",
    famousPlaces: [
      {
        name: "Senso-ji Temple",
        description:
          "Tokyo's oldest temple in Asakusa, approached through the iconic Kaminarimon gate.",
      },
      {
        name: "Shibuya Crossing",
        description:
          "The world's busiest pedestrian intersection, a symbol of Tokyo's electric energy.",
      },
      {
        name: "Meiji Shrine",
        description:
          "A tranquil Shinto shrine set within a lush forest in the heart of the city.",
      },
    ],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    tags: ["Beach", "Nature", "Adventure"],
    lat: -8.3405,
    lng: 115.092,
    description:
      "An island paradise of terraced rice paddies, volcanic mountains, and pristine beaches. Bali's spiritual culture and warm hospitality create an unforgettable escape.",
    famousPlaces: [
      {
        name: "Uluwatu Temple",
        description:
          "A cliffside sea temple perched 70 meters above the Indian Ocean with dramatic sunset views.",
      },
      {
        name: "Tegallalang Rice Terraces",
        description:
          "Stunning sculpted rice paddies showcasing the traditional Balinese irrigation system.",
      },
      {
        name: "Sacred Monkey Forest",
        description:
          "A nature reserve and Hindu temple complex in Ubud, home to over 700 long-tailed macaques.",
      },
    ],
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    region: "Asia",
    tags: ["City", "Historic"],
    lat: 26.9124,
    lng: 75.7873,
    description:
      "The Pink City dazzles with majestic forts, ornate palaces, and bustling bazaars. Jaipur's rich Rajput heritage and vibrant streets make it the crown jewel of Rajasthan.",
    famousPlaces: [
      {
        name: "Hawa Mahal",
        description:
          "The iconic 'Palace of Winds' with its honeycomb facade of 953 small windows, built for royal women to observe street life.",
      },
      {
        name: "Amber Fort",
        description:
          "A majestic hilltop fort of sandstone and marble, known for its artistic Hindu style elements and mirrored halls.",
      },
      {
        name: "City Palace",
        description:
          "A sprawling royal residence blending Rajasthani and Mughal architecture, still home to part of the former royal family.",
      },
    ],
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    region: "Americas",
    tags: ["City", "Historic"],
    lat: 40.7128,
    lng: -74.006,
    description:
      "The city that never sleeps pulses with energy from Times Square to Central Park. A melting pot of cultures, cuisines, and creativity at every corner.",
    famousPlaces: [
      {
        name: "Statue of Liberty",
        description:
          "The colossal neoclassical sculpture on Liberty Island, a universal symbol of freedom.",
      },
      {
        name: "Central Park",
        description:
          "An 843-acre urban oasis offering lakes, gardens, and performance spaces in the heart of Manhattan.",
      },
      {
        name: "Times Square",
        description:
          "The dazzling commercial intersection known for its bright lights and Broadway theatres.",
      },
    ],
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    tags: ["Beach", "Historic"],
    lat: 36.3932,
    lng: 25.4615,
    description:
      "Whitewashed villages cling to volcanic cliffs above the deep blue Aegean Sea. Santorini's sunsets, wine, and ancient ruins make it one of the most romantic destinations on Earth.",
    famousPlaces: [
      {
        name: "Oia Village",
        description:
          "Famous for its blue-domed churches and the most photographed sunset in the world.",
      },
      {
        name: "Red Beach",
        description:
          "A striking beach framed by towering red volcanic cliffs near the ancient site of Akrotiri.",
      },
      {
        name: "Akrotiri Ruins",
        description:
          "A Minoan Bronze Age settlement preserved under volcanic ash, often called the Greek Pompeii.",
      },
    ],
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    region: "Asia",
    tags: ["Beach", "Nature"],
    lat: 15.2993,
    lng: 74.124,
    description:
      "Golden beaches, Portuguese-era churches, and a laid-back coastal vibe define Goa. By day it's swaying palms and seafood shacks; by night, a lively beach party scene.",
    famousPlaces: [
      {
        name: "Basilica of Bom Jesus",
        description:
          "A UNESCO World Heritage baroque church in Old Goa, holding the remains of St. Francis Xavier.",
      },
      {
        name: "Baga Beach",
        description:
          "One of Goa's liveliest beaches, known for water sports, beach shacks, and a buzzing nightlife.",
      },
      {
        name: "Fort Aguada",
        description:
          "A well-preserved 17th-century Portuguese fort overlooking the Arabian Sea, with a still-functioning lighthouse.",
      },
    ],
  },
  {
    id: "kerala-backwaters",
    name: "Kerala Backwaters",
    country: "India",
    region: "Asia",
    tags: ["Nature", "Beach"],
    lat: 9.4981,
    lng: 76.3388,
    description:
      "A tranquil network of lagoons, lakes, and canals lined with coconut palms and paddy fields. Drifting through Alleppey on a houseboat is one of India's most serene experiences.",
    famousPlaces: [
      {
        name: "Alleppey Houseboats",
        description:
          "Traditional kettuvallam houseboats offering overnight cruises through palm-fringed backwaters.",
      },
      {
        name: "Kumarakom Bird Sanctuary",
        description:
          "A lakeside sanctuary on Vembanad Lake, home to migratory birds amid mangroves and paddy fields.",
      },
      {
        name: "Vembanad Lake",
        description:
          "India's longest lake, the heart of the backwaters, famous for its annual snake boat races.",
      },
    ],
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    tags: ["Nature", "Beach", "Adventure"],
    lat: -33.9249,
    lng: 18.4241,
    description:
      "Nestled between Table Mountain and two oceans, Cape Town offers dramatic landscapes, world-class vineyards, and a rich cultural tapestry unlike any other city.",
    famousPlaces: [
      {
        name: "Table Mountain",
        description:
          "A flat-topped mountain and UNESCO World Heritage site offering breathtaking views of the city and ocean.",
      },
      {
        name: "Robben Island",
        description:
          "The historic island prison where Nelson Mandela was held, now a powerful museum.",
      },
      {
        name: "Kirstenbosch Gardens",
        description:
          "One of the great botanical gardens of the world, set against the eastern slopes of Table Mountain.",
      },
    ],
  },
  {
    id: "varanasi",
    name: "Varanasi",
    country: "India",
    region: "Asia",
    tags: ["Historic", "City"],
    lat: 25.3176,
    lng: 82.9739,
    description:
      "One of the oldest continuously inhabited cities in the world, Varanasi sits sacred on the banks of the Ganges. Its ghats, temples, and evening rituals offer a profound glimpse into spiritual India.",
    famousPlaces: [
      {
        name: "Dashashwamedh Ghat",
        description:
          "The main ghat on the Ganges, famous for its mesmerizing evening Ganga Aarti fire ritual.",
      },
      {
        name: "Kashi Vishwanath Temple",
        description:
          "One of the most sacred Hindu temples, dedicated to Lord Shiva, drawing pilgrims from across India.",
      },
      {
        name: "Sarnath",
        description:
          "A short distance from the city, the site where Buddha gave his first sermon, marked by the ancient Dhamek Stupa.",
      },
    ],
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    region: "Americas",
    tags: ["Historic", "Mountain", "Adventure"],
    lat: -13.1631,
    lng: -72.545,
    description:
      "The legendary Inca citadel sits high in the Andes, shrouded in mist and mystery. One of the New Seven Wonders of the World, it remains a bucket-list destination for adventurers.",
    famousPlaces: [
      {
        name: "Sun Gate",
        description:
          "The ancient entrance to Machu Picchu along the Inca Trail, offering the classic first panoramic view.",
      },
      {
        name: "Temple of the Sun",
        description:
          "A semi-circular temple with finely crafted stonework, aligned with the June solstice sunrise.",
      },
      {
        name: "Huayna Picchu",
        description:
          "The towering peak behind the citadel, with a steep trail leading to breathtaking summit views.",
      },
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    region: "Asia",
    tags: ["City", "Adventure"],
    lat: 25.2048,
    lng: 55.2708,
    description:
      "A futuristic metropolis rising from the desert, Dubai astounds with record-breaking architecture, luxury shopping, and a relentless ambition that pushes every boundary.",
    famousPlaces: [
      {
        name: "Burj Khalifa",
        description:
          "The tallest building on Earth at 828 meters, with observation decks offering unrivalled city views.",
      },
      {
        name: "Palm Jumeirah",
        description:
          "An iconic man-made island shaped like a palm tree, home to luxury resorts and residences.",
      },
      {
        name: "Dubai Mall",
        description:
          "The world's largest shopping mall, featuring an aquarium, ice rink, and over 1,200 stores.",
      },
    ],
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    tags: ["City", "Beach"],
    lat: -33.8688,
    lng: 151.2093,
    description:
      "A harbour city where golden beaches meet cosmopolitan culture. Sydney's iconic Opera House, vibrant food scene, and outdoor lifestyle make it endlessly appealing.",
    famousPlaces: [
      {
        name: "Sydney Opera House",
        description:
          "The sail-shaped performing arts centre and UNESCO World Heritage site on Bennelong Point.",
      },
      {
        name: "Bondi Beach",
        description:
          "Australia's most famous beach, beloved for its surf, coastal walks, and laid-back atmosphere.",
      },
      {
        name: "Sydney Harbour Bridge",
        description:
          "The steel arch bridge locals call 'the Coathanger,' offering bridge-climb tours with sweeping views.",
      },
    ],
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    region: "Europe",
    tags: ["Mountain", "Nature", "Adventure"],
    lat: 46.8182,
    lng: 8.2275,
    description:
      "Soaring peaks, crystal lakes, and storybook villages define the Swiss Alps. Whether skiing in winter or hiking in summer, the scenery here is nothing short of extraordinary.",
    famousPlaces: [
      {
        name: "Matterhorn",
        description:
          "The iconic pyramid-shaped peak on the Swiss-Italian border, one of the highest summits in the Alps.",
      },
      {
        name: "Jungfraujoch",
        description:
          "The 'Top of Europe' railway station at 3,454 m, with views of the Aletsch Glacier.",
      },
      {
        name: "Lake Lucerne",
        description:
          "A stunning alpine lake surrounded by mountains and historic towns, best explored by steamboat.",
      },
    ],
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    tags: ["City", "Historic"],
    lat: 31.6295,
    lng: -7.9811,
    description:
      "A sensory overload of spice-scented souks, intricate tilework, and bustling squares. Marrakech is where ancient tradition meets vibrant modern Moroccan life.",
    famousPlaces: [
      {
        name: "Jemaa el-Fnaa",
        description:
          "The lively main square and marketplace, alive with storytellers, musicians, and food stalls after dark.",
      },
      {
        name: "Bahia Palace",
        description:
          "A 19th-century palace showcasing exquisite Moroccan and Islamic architecture with lush gardens.",
      },
      {
        name: "Majorelle Garden",
        description:
          "A stunning botanical garden created by Jacques Majorelle, later restored by Yves Saint Laurent.",
      },
    ],
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    tags: ["Adventure", "Nature", "Mountain"],
    lat: -45.0312,
    lng: 168.6626,
    description:
      "The adventure capital of the world sits on the shores of Lake Wakatipu, surrounded by the Remarkables mountain range. Bungee jumping, skiing, and jaw-dropping scenery await.",
    famousPlaces: [
      {
        name: "Milford Sound",
        description:
          "A dramatic fjord carved by glaciers, with towering cliffs and cascading waterfalls.",
      },
      {
        name: "The Remarkables",
        description:
          "A striking mountain range offering world-class skiing and panoramic hiking trails.",
      },
      {
        name: "Lake Wakatipu",
        description:
          "A glacial lake with crystal-clear water, surrounded by mountains and dotted with scenic cruises.",
      },
    ],
  },
];

export default destinations;
