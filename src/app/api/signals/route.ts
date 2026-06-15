import { NextResponse } from "next/server";
import fs from "fs";

/**
 * GET /api/signals?subject=235&trial=1
 *
 * Reads pre-extracted, filtered SPG and NIR-iPPG signals from the
 * Lipid_Signal_VS_Code pipeline output and returns downsampled arrays
 * for browser-side scientific visualization.
 *
 * Source: data_for_train/processed/{subject}/{subject}-{trial}_filtered.csv
 * Format: CSV with columns NIR_iPPG,SPG (3601 rows at 120 FPS = ~30s)
 */

const FPS = 120;
const DOWNSAMPLE_FACTOR = 6; // 120 FPS → ~20 points/sec → ~600 points for 30s

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");
    const trial = searchParams.get("trial") || "1";

    if (!subject) {
      return NextResponse.json(
        { error: "Missing required parameter: subject" },
        { status: 400 }
      );
    }

    // Build path to the processed signal CSV
    const sep = "\\";
    const basePath = ["C:", "Users", "palit", "Desktop", "Lipid_Signal_VS_Code", "data_for_train", "processed"].join(sep);
    const csvPath = [basePath, subject, `${subject}-${trial}_filtered.csv`].join(sep);

    if (!fs.existsSync(csvPath)) {
      return NextResponse.json(
        { error: `Signal file not found for subject ${subject}, trial ${trial}` },
        { status: 404 }
      );
    }

    // Read and parse CSV
    const raw = fs.readFileSync(csvPath, "utf-8");
    const lines = raw.trim().split(/\r?\n/);

    // Skip header row
    const nirIppg: number[] = [];
    const spg: number[] = [];

    for (let i = 1; i < lines.length; i++) {
      // Downsample: only take every Nth sample
      if ((i - 1) % DOWNSAMPLE_FACTOR !== 0) continue;

      const parts = lines[i].split(",");
      if (parts.length >= 2) {
        nirIppg.push(parseFloat(parts[0]));
        spg.push(parseFloat(parts[1]));
      }
    }

    return NextResponse.json({
      nir_ippg: nirIppg,
      spg: spg,
      fps: FPS,
      effectiveFps: FPS / DOWNSAMPLE_FACTOR,
      totalSamples: lines.length - 1,
      displayedSamples: nirIppg.length,
      durationSeconds: (lines.length - 1) / FPS,
      subject,
      trial: parseInt(trial),
    });
  } catch (error) {
    console.error("Signal API error:", error);
    return NextResponse.json(
      { error: "Failed to read signal data" },
      { status: 500 }
    );
  }
}
