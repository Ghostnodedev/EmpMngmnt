const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
      department: "Engineering",
      salary: 75000,
      entryTime: new Date("2025-07-01T09:00:00Z"),
      position: "Software Engineer",
      workingOn: "Internal Dashboard",
      // exitTime is optional
    },
  });

  console.log("User created:", user);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
