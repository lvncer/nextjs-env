import {
  capitalize,
  shuffleArray,
  calculateAverage,
  isValidEmail,
  parseUrlParams,
  removeDuplicates,
  toKebabCase,
} from "./utils";

describe("Utils Functions", () => {
  describe("capitalize", () => {
    it("should capitalize the first letter of a string", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("WORLD")).toBe("World");
      expect(capitalize("tEST")).toBe("Test");
    });

    it("should handle empty string", () => {
      expect(capitalize("")).toBe("");
    });

    it("should handle single character", () => {
      expect(capitalize("a")).toBe("A");
      expect(capitalize("Z")).toBe("Z");
    });
  });

  describe("shuffleArray", () => {
    it("should return an array with the same length", () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      expect(shuffled).toHaveLength(original.length);
    });

    it("should contain all original elements", () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      expect(shuffled.sort()).toEqual(original.sort());
    });

    it("should not modify the original array", () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      shuffleArray(original);
      expect(original).toEqual(originalCopy);
    });

    it("should handle empty array", () => {
      expect(shuffleArray([])).toEqual([]);
    });
  });

  describe("calculateAverage", () => {
    it("should calculate the average of numbers", () => {
      expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
      expect(calculateAverage([10, 20, 30])).toBe(20);
      expect(calculateAverage([2.5, 3.5])).toBe(3);
    });

    it("should handle single number", () => {
      expect(calculateAverage([42])).toBe(42);
    });

    it("should handle empty array", () => {
      expect(calculateAverage([])).toBe(0);
    });

    it("should handle negative numbers", () => {
      expect(calculateAverage([-1, -2, -3])).toBe(-2);
      expect(calculateAverage([-5, 5])).toBe(0);
    });
  });

  describe("isValidEmail", () => {
    it("should validate correct email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.jp")).toBe(true);
      expect(isValidEmail("admin+tag@site.org")).toBe(true);
    });

    it("should reject invalid email addresses", () => {
      expect(isValidEmail("invalid-email")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
      expect(isValidEmail("user@")).toBe(false);
      expect(isValidEmail("user@domain")).toBe(false);
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("user name@domain.com")).toBe(false);
    });
  });

  describe("parseUrlParams", () => {
    it("should parse URL parameters correctly", () => {
      const url = "https://example.com?name=John&age=30&city=Tokyo";
      const params = parseUrlParams(url);
      expect(params).toEqual({
        name: "John",
        age: "30",
        city: "Tokyo",
      });
    });

    it("should handle URL without parameters", () => {
      expect(parseUrlParams("https://example.com")).toEqual({});
    });

    it("should handle invalid URL", () => {
      expect(parseUrlParams("not-a-url")).toEqual({});
    });

    it("should handle URL with empty parameter values", () => {
      const url = "https://example.com?empty=&filled=value";
      const params = parseUrlParams(url);
      expect(params).toEqual({
        empty: "",
        filled: "value",
      });
    });
  });

  describe("removeDuplicates", () => {
    it("should remove duplicate numbers", () => {
      expect(removeDuplicates([1, 2, 2, 3, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    });

    it("should remove duplicate strings", () => {
      expect(removeDuplicates(["a", "b", "b", "c", "a"])).toEqual(["a", "b", "c"]);
    });

    it("should handle array without duplicates", () => {
      expect(removeDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("should handle empty array", () => {
      expect(removeDuplicates([])).toEqual([]);
    });
  });

  describe("toKebabCase", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(toKebabCase("camelCase")).toBe("camel-case");
      expect(toKebabCase("someVariableName")).toBe("some-variable-name");
    });

    it("should convert PascalCase to kebab-case", () => {
      expect(toKebabCase("PascalCase")).toBe("pascal-case");
      expect(toKebabCase("SomeClassName")).toBe("some-class-name");
    });

    it("should convert spaces to hyphens", () => {
      expect(toKebabCase("some string")).toBe("some-string");
      expect(toKebabCase("multiple   spaces")).toBe("multiple-spaces");
    });

    it("should convert underscores to hyphens", () => {
      expect(toKebabCase("snake_case")).toBe("snake-case");
      expect(toKebabCase("some_variable_name")).toBe("some-variable-name");
    });

    it("should handle already kebab-case strings", () => {
      expect(toKebabCase("kebab-case")).toBe("kebab-case");
    });

    it("should handle empty string", () => {
      expect(toKebabCase("")).toBe("");
    });
  });
});
