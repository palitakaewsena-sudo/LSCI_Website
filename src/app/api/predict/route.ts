import { NextResponse } from "next/server";
import { normalizeGender } from "@/utils/normalizeGender";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gender, age, weight, height, bmi, videoFilename, videoId } = body;

    // Validate required fields
    if (!gender || !age || !weight || !height || !videoFilename) {
      return NextResponse.json(
        { error: "Missing required patient or signal parameters." },
        { status: 400 }
      );
    }

    // Normalize and validate gender
    let normalizedGender: string;
    try {
      normalizedGender = normalizeGender(gender);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid gender value.";
      console.warn(`[API /predict] Gender validation failed for value: "${gender}"`);
      return NextResponse.json(
        { error: message },
        { status: 400 }
      );
    }

    // Validate numeric parameters
    const ageNum = Number(age);
    const weightNum = Number(weight);
    const heightNum = Number(height);

    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      return NextResponse.json(
        { error: "Age must be a number between 1 and 120." },
        { status: 400 }
      );
    }
    if (isNaN(weightNum) || weightNum <= 10 || weightNum > 300) {
      return NextResponse.json(
        { error: "Weight must be a number between 10 and 300 kg." },
        { status: 400 }
      );
    }
    if (isNaN(heightNum) || heightNum <= 50 || heightNum > 250) {
      return NextResponse.json(
        { error: "Height must be a number between 50 and 250 cm." },
        { status: 400 }
      );
    }

    // High fidelity Mock Response (Standalone Demo Mode)
    // Always used to ensure safe deployment on Vercel/Netlify without requiring a Python backend.
    
    // Slight simulated delay to feel like processing is happening before returning the mock data
    await new Promise((resolve) => setTimeout(resolve, 800));

    let tgRisk: "Low" | "Moderate" | "High" = "Low";
    let ldlRisk: "Low" | "Moderate" | "High" = "Low";
    let hdlRisk: "Low" | "Moderate" | "High" = "Low";
    let aipRisk: "Low" | "Moderate" | "High" = "Low";
    let sdldlRisk: "Low" | "Moderate" | "High" = "Low";
    let hrRisk: "Low" | "Moderate" | "High" = "Low";
    let hrValue = 72;

    switch (videoId) {
      case 1: // Control Patient
        tgRisk = "Low"; ldlRisk = "Low"; hdlRisk = "Low"; aipRisk = "Low"; sdldlRisk = "Low"; hrRisk = "Low";
        hrValue = 68;
        break;
      case 2: // Borderline Metabolic
        tgRisk = "Moderate"; ldlRisk = "Moderate"; hdlRisk = "Low"; aipRisk = "Moderate"; sdldlRisk = "Moderate"; hrRisk = "Low";
        hrValue = 74;
        break;
      case 3: // High Risk Vascular Plaque
        tgRisk = "High"; ldlRisk = "High"; hdlRisk = "High"; aipRisk = "High"; sdldlRisk = "High"; hrRisk = "Moderate";
        hrValue = 105;
        break;
      case 4: // Autonomic / Heart Rate Deviant
        tgRisk = "Low"; ldlRisk = "Moderate"; hdlRisk = "Low"; aipRisk = "Low"; sdldlRisk = "Moderate"; hrRisk = "High";
        hrValue = 115;
        break;
      case 5: // Athletic Perfusion
        tgRisk = "Low"; ldlRisk = "Low"; hdlRisk = "Low"; aipRisk = "Low"; sdldlRisk = "Low"; hrRisk = "Low";
        hrValue = 58;
        break;
    }

    // Apply BMI penalty checks
    if (bmi >= 30) {
      if (tgRisk === "Low") tgRisk = "Moderate";
      else if (tgRisk === "Moderate") tgRisk = "High";
      
      if (ldlRisk === "Low") ldlRisk = "Moderate";
      else if (ldlRisk === "Moderate") ldlRisk = "High";
      
      if (aipRisk === "Low") aipRisk = "Moderate";
      else if (aipRisk === "Moderate") aipRisk = "High";

      if (sdldlRisk === "Low") sdldlRisk = "Moderate";
      else if (sdldlRisk === "Moderate") sdldlRisk = "High";
    }

    return NextResponse.json({
      tgRisk,
      ldlRisk,
      hdlRisk,
      aipRisk,
      sdldlRisk,
      hrRisk,
      hrValue,
    });
  } catch (error) {
    console.error("Internal API route error:", error);
    return NextResponse.json(
      { error: "Internal server processing error." },
      { status: 500 }
    );
  }
}
