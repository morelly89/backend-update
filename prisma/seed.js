import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("seeding started lookup tables");
  const parent = await prisma.ParentProfile.create({
    data: {
      firstName: "John",
      city: "New York",
      state: "NY",
    },
  });

  await prisma.privacySettings.create({
    data: {
      parentProfileId: parent.id,
      isNeedsPublic: true,
      isChildStagePublic: true,
      isGroupsPublic: true,
    },
  });

  await prisma.familyNeed.createMany({
    data: [
      // Accessibility
      { code: "WHEELCHAIR_ACCESS", label: "Wheelchair Access" },
      { code: "ELEVATOR_ACCESS", label: "Elevator Access" },
      { code: "STROLLER_ACCESS", label: "Stroller Access" },

      // Amenities
      { code: "AIR_CONDITIONING", label: "Air Conditioning" },
      { code: "DOG_FRIENDLY", label: "Dog Friendly" },
      { code: "OUTDOOR_SEATING", label: "Outdoor Seating" },
      { code: "TOURIST_ATTRACTION", label: "Tourist Attraction" },

      // Dietary
      { code: "GLUTEN_FREE", label: "Gluten Free" },
      { code: "HEALTHY_OPTIONS", label: "Healthy Options" },
      { code: "SMALL_PLATES", label: "Small Plates" },
      { code: "VEGAN", label: "Vegan" },
      { code: "VEGETARIAN", label: "Vegetarian" },

      // Atmosphere
      { code: "BUZZY", label: "Buzzy" },
      { code: "FUN_QUIRKY", label: "Fun & Quirky" },
      { code: "POSH", label: "Posh" },
      { code: "RELAXED", label: "Relaxed" },

      // Service
      { code: "FRIENDLY_STAFF", label: "Friendly Staff" },
      { code: "GOOD_FOR_GROUPS", label: "Good for Groups" },
      { code: "QUICK_SERVICE", label: "Quick Service" },
      { code: "TAKEAWAY", label: "Takeaway" },

      // Deals
      { code: "FREE_KIDS_MEAL", label: "Free Kids Meal" },

      // Cuisine Type
      { code: "AMERICAN", label: "American" },
      { code: "ASIAN", label: "Asian" },
      { code: "BAKERY", label: "Bakery" },
      { code: "BAR_GRILL", label: "Bar & Grill" },
      { code: "BBQ", label: "BBQ" },
      { code: "BREAKFAST", label: "Breakfast" },
      { code: "BRITISH", label: "British" },
      { code: "CAFE", label: "Cafe" },
      { code: "CHINESE", label: "Chinese" },
      { code: "DESSERT", label: "Dessert" },
      { code: "EUROPEAN", label: "European" },
      { code: "FRENCH", label: "French" },
      { code: "GREEK", label: "Greek" },
      { code: "INDIAN", label: "Indian" },
      { code: "INTERNATIONAL", label: "International" },
      { code: "ITALIAN", label: "Italian" },
      { code: "JAPANESE", label: "Japanese" },
      { code: "KOREAN", label: "Korean" },
      { code: "LATIN_AMERICAN", label: "Latin American" },
      { code: "MEXICAN", label: "Mexican" },
      { code: "MIDDLE_EASTERN", label: "Middle Eastern" },
      { code: "PERUVIAN", label: "Peruvian" },
      { code: "PUB", label: "Pub" },
      { code: "SANDWICHES", label: "Sandwiches" },
      { code: "SEAFOOD", label: "Seafood" },
      { code: "SPANISH", label: "Spanish" },
      { code: "STEAKHOUSE", label: "Steakhouse" },
      { code: "THAI", label: "Thai" },
      { code: "TURKISH", label: "Turkish" },
      { code: "VEGETARIAN_CUISINE", label: "Vegetarian" },

      // Kids & Family
      { code: "BABY_CHANGE_MEN", label: "Baby Change (Men)" },
      { code: "BABY_CHANGE_UNISEX", label: "Baby Change (Unisex)" },
      { code: "BABY_CHANGE_WOMEN", label: "Baby Change (Women)" },
      { code: "GAMES_AVAILABLE", label: "Games Available" },
      { code: "HIGH_CHAIRS", label: "High Chairs" },
      { code: "KIDS_COLORING", label: "Kids Coloring" },
      { code: "KIDS_MENU", label: "Kids Menu" },
      { code: "KIDS_PLAY_SPACE", label: "Kids Play Space" },
      { code: "PLAYGROUND_NEARBY", label: "Playground Nearby" },
      { code: "PRAM_STORAGE", label: "Pram Storage" },
      { code: "TEEN_FAVOURITE", label: "Teen Favourite" },
    ],
    skipDuplicates: true,
  });

  await prisma.childStage.createMany({
    data: [
      { code: "BABY", label: "Baby (0-12 months)", sortOrder: 1 },
      { code: "TODDLER", label: "Toddler (1-3 years)", sortOrder: 2 },
      { code: "BIG_KID", label: "Big Kid (4-7 years)", sortOrder: 3 },
      { code: "TWEEN", label: "Tween (8-12 years)", sortOrder: 4 },
      { code: "TEEN", label: "Teen (13-18 years)", sortOrder: 5 },
    ],
    skipDuplicates: true,
  });

  await prisma.communityGroup.createMany({
    data: [
      {
        name: "Daddy Stroller Club",
        city: "Dallas",
        state: "TX",
        website: "https://daddystrollerclub.com",
        description: "Monthly meetup for dads and kids",
      },
      {
        name: "Milwaukee Babbling Babes",
        city: "Milwaukee",
        state: "WI",
        website: "https://babblingbabes.com",
        description: "Community group for new parents",
      },
      {
        name: "NYC Family Walkers",
        city: "New York",
        state: "NY",
        website: "https://nycfamilywalkers.com",
        description: "Weekly stroller walks in Central Park",
      },
    ],
    skipDuplicates: true,
  });

  console.log("seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
