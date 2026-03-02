import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import "dotenv/config";

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // 1. Admin user (Jay)
  const adminUser = await prisma.user.upsert({
    where: { email: "jay@samedayservice.com" },
    update: {},
    create: {
      name: "Jay",
      email: "jay@samedayservice.com",
      phone: "516-350-0785",
      role: "admin",
    },
  });
  console.log("Created admin user:", adminUser.name);

  // 2. Coupon ($35 off, code: SAVE35)
  const coupon = await prisma.coupon.upsert({
    where: { code: "SAVE35" },
    update: {},
    create: {
      code: "SAVE35",
      description: "$35 off any repair service",
      discountType: "flat",
      amount: 35,
      active: true,
      usageLimit: null,
      usageCount: 0,
    },
  });
  console.log("Created coupon:", coupon.code);

  // 3. Sample service requests
  const serviceRequests = [
    {
      name: "Maria Rodriguez",
      phone: "516-555-0101",
      email: "maria.r@email.com",
      address: "45 Oak St, Flushing, NY",
      city: "Queens",
      zip: "11355",
      serviceType: "washer",
      description: "Washer not draining properly, making loud noise during spin cycle.",
      status: "pending",
    },
    {
      name: "David Kim",
      phone: "516-555-0202",
      email: "david.kim@email.com",
      address: "120 Maple Ave, Garden City, NY",
      city: "Nassau County",
      zip: "11530",
      serviceType: "refrigerator",
      description: "Refrigerator not cooling, compressor runs but temp stays warm.",
      status: "pending",
    },
    {
      name: "Sarah Johnson",
      phone: "516-555-0303",
      email: null,
      address: "78 Pine Rd, Huntington, NY",
      city: "Suffolk County",
      zip: "11743",
      serviceType: "dishwasher",
      description: "Dishwasher leaking from bottom during wash cycle.",
      status: "contacted",
    },
  ];

  for (const sr of serviceRequests) {
    await prisma.serviceRequest.create({ data: sr });
  }
  console.log(`Created ${serviceRequests.length} service requests`);

  // 4. Sample jobs
  const jobs = [
    {
      customerName: "Tom Nguyen",
      customerPhone: "516-555-0404",
      customerEmail: "tom.n@email.com",
      customerAddress: "200 Broadway, Astoria, NY 11102",
      serviceType: "range",
      appliance: "GE Profile PGS960",
      description: "Gas range burner not igniting. Clicks but no flame.",
      status: "new",
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      customerName: "Lisa Chen",
      customerPhone: "516-555-0505",
      customerEmail: "lisa.c@email.com",
      customerAddress: "55 Elm St, Hempstead, NY 11550",
      serviceType: "ac",
      appliance: "Samsung AR12TYHYC",
      description: "AC unit blowing warm air. Refrigerant may need recharging.",
      status: "in_progress",
      scheduledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }
  console.log(`Created ${jobs.length} jobs`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
