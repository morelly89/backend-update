import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const familyNeeds = [
    { code: "high-chair", label: "High Chair" },
    { code: "changing-table", label: "Changing Table" },
    { code: "stroller-friendly", label: "Stroller Friendly" },
    { code: "kids-menu", label: "Kids Menu" },
    { code: "sensory-friendly", label: "Sensory Friendly" },
  ];

  const childStages = [
    { code: "baby", label: "Baby", sortOrder: 1 },
    { code: "toddler", label: "Toddler", sortOrder: 2 },
    { code: "big-kid", label: "Big Kid", sortOrder: 3 },
    { code: "tween", label: "Tween", sortOrder: 4 },
    { code: "teen", label: "Teen", sortOrder: 5 },
  ];

  for (const need of familyNeeds) {
    await prisma.familyNeed.upsert({
      where: { code: need.code },
      update: {
        label: need.label,
      },
      create: need,
    });
  }

  for (const stage of childStages) {
    await prisma.childStage.upsert({
      where: { code: stage.code },
      update: {
        label: stage.label,
        sortOrder: stage.sortOrder,
      },
      create: stage,
    });
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });