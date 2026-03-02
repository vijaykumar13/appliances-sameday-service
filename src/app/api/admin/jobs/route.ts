import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerPhone,
      serviceType,
      customerEmail,
      customerAddress,
      appliance,
      description,
      scheduledAt,
    } = body;

    if (!customerName || !customerPhone || !serviceType) {
      return NextResponse.json(
        { error: "customerName, customerPhone, and serviceType are required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        customerAddress: customerAddress || null,
        serviceType,
        appliance: appliance || null,
        description: description || null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: "new",
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
