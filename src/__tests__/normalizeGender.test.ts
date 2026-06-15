/**
 * normalizeGender.test.ts
 *
 * Test suite for the gender normalization utility.
 * Covers all accepted input representations and edge cases.
 */

import { normalizeGender, isValidGender } from "../utils/normalizeGender";

describe("normalizeGender", () => {
  // ── Male variants ─────────────────────────────────────────
  describe("male inputs", () => {
    it.each([
      ["Male", "male"],
      ["male", "male"],
      ["MALE", "male"],
      ["M", "male"],
      ["m", "male"],
      ["ชาย", "male"],
    ])('normalizes "%s" → "%s"', (input, expected) => {
      expect(normalizeGender(input)).toBe(expected);
    });
  });

  // ── Female variants ───────────────────────────────────────
  describe("female inputs", () => {
    it.each([
      ["Female", "female"],
      ["female", "female"],
      ["FEMALE", "female"],
      ["F", "female"],
      ["f", "female"],
      ["หญิง", "female"],
    ])('normalizes "%s" → "%s"', (input, expected) => {
      expect(normalizeGender(input)).toBe(expected);
    });
  });

  // ── Whitespace handling ───────────────────────────────────
  describe("whitespace trimming", () => {
    it.each([
      ["  male  ", "male"],
      [" Female ", "female"],
      ["\tM\t", "male"],
      [" ชาย ", "male"],
      [" หญิง ", "female"],
    ])('trims and normalizes "%s" → "%s"', (input, expected) => {
      expect(normalizeGender(input)).toBe(expected);
    });
  });

  // ── Invalid inputs ────────────────────────────────────────
  describe("invalid inputs", () => {
    it("throws for empty string", () => {
      expect(() => normalizeGender("")).toThrow();
    });

    it("throws for whitespace-only string", () => {
      expect(() => normalizeGender("   ")).toThrow();
    });

    it("throws for unsupported string", () => {
      expect(() => normalizeGender("other")).toThrow();
    });

    it("throws for number", () => {
      expect(() => normalizeGender(42)).toThrow();
    });

    it("throws for null", () => {
      expect(() => normalizeGender(null)).toThrow();
    });

    it("throws for undefined", () => {
      expect(() => normalizeGender(undefined)).toThrow();
    });

    it("throws for boolean", () => {
      expect(() => normalizeGender(true)).toThrow();
    });

    it("throws for object", () => {
      expect(() => normalizeGender({ gender: "male" })).toThrow();
    });

    it("throws for array", () => {
      expect(() => normalizeGender(["male"])).toThrow();
    });
  });

  // ── Error messages are user-friendly ──────────────────────
  describe("error messages", () => {
    it("includes the invalid value in the error message", () => {
      expect(() => normalizeGender("xyz")).toThrow(/xyz/);
    });

    it("contains Thai guidance text", () => {
      expect(() => normalizeGender("xyz")).toThrow(/กรุณาเลือก/);
    });
  });
});

describe("isValidGender", () => {
  it.each([
    "Male", "Female", "male", "female",
    "M", "F", "m", "f",
    "ชาย", "หญิง",
  ])('returns true for valid input "%s"', (input) => {
    expect(isValidGender(input)).toBe(true);
  });

  it.each([
    "", "   ", "other", "X", null, undefined, 42, true,
  ])('returns false for invalid input %s', (input) => {
    expect(isValidGender(input)).toBe(false);
  });
});
