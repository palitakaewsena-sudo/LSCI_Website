/**
 * normalizeGender.ts
 *
 * Central utility for normalizing gender/sex input values
 * across the application. Ensures consistent lowercase 'male' | 'female'
 * representation before any API communication.
 *
 * Accepted inputs:
 *   Male, Female, male, female, M, F, m, f, ชาย, หญิง
 *
 * Output:
 *   'male' | 'female'
 */

export type NormalizedGender = "male" | "female";

const MALE_VALUES = new Set(["male", "m", "ชาย"]);
const FEMALE_VALUES = new Set(["female", "f", "หญิง"]);

/**
 * Normalizes a gender/sex string to 'male' or 'female'.
 *
 * @param value - The raw gender value from user input or form data.
 * @returns The normalized gender string.
 * @throws Error if the value cannot be mapped to a valid gender.
 *
 * @example
 * normalizeGender("Male")   // → "male"
 * normalizeGender("F")      // → "female"
 * normalizeGender("ชาย")    // → "male"
 * normalizeGender("หญิง")   // → "female"
 */
export function normalizeGender(value: unknown): NormalizedGender {
  if (typeof value !== "string" || value.trim() === "") {
    console.warn(
      `[normalizeGender] Invalid input: expected a non-empty string, received ${typeof value}:`,
      value
    );
    throw new Error(
      "ข้อมูลเพศไม่ถูกต้อง กรุณาเลือกเพศ (Gender input is invalid. Please select a gender.)"
    );
  }

  const normalized = value.trim().toLowerCase();

  if (MALE_VALUES.has(normalized)) {
    return "male";
  }

  if (FEMALE_VALUES.has(normalized)) {
    return "female";
  }

  console.warn(
    `[normalizeGender] Unsupported gender value: "${value}". Accepted values: Male, Female, M, F, m, f, ชาย, หญิง`
  );
  throw new Error(
    `ค่าเพศ "${value}" ไม่รองรับ กรุณาเลือก Male หรือ Female (Unsupported gender value: "${value}". Please select Male or Female.)`
  );
}

/**
 * Validates whether a gender value can be normalized.
 * Use this for pre-flight checks before form submission.
 *
 * @param value - The raw gender value to validate.
 * @returns true if the value is a valid gender representation.
 */
export function isValidGender(value: unknown): boolean {
  try {
    normalizeGender(value);
    return true;
  } catch {
    return false;
  }
}
