import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, email, address, city, zip, serviceType, description, preferredDate, preferredTime } = body;

    // Validate required fields
    if (!name || !phone || !address || !serviceType) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, address, serviceType" },
        { status: 400 }
      );
    }

    const validServices = ["washer", "dryer", "range", "dishwasher", "refrigerator", "ac", "plumbing"];
    if (!validServices.includes(serviceType)) {
      return NextResponse.json(
        { error: "Invalid service type" },
        { status: 400 }
      );
    }

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        name,
        phone,
        email: email || null,
        address,
        city: city || null,
        zip: zip || null,
        serviceType,
        description: description || null,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
      },
    });

    return NextResponse.json(
      { success: true, id: serviceRequest.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create service request:", error);
    return NextResponse.json(
      { error: "Failed to create service request" },
      { status: 500 }
    );
  }
}
