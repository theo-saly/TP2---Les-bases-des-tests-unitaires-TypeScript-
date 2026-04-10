import { describe, it, expect } from "vitest";
import { StringCalculator } from "../src/StringCalculator";

describe("StringCalculator", () => {
    it.each([
        ["", 0],
        ["1", 1],
        ["1,2", 3],
        ["1,2,3", 6],
        ["1,2,3,4,5", 15],
        ["1, 2, 3", 6],
        ["7,", 7],
        ["//;\n1;2", 3],
        ["//|\n4|5|6", 15],
        [undefined as any, 0],
    ] as [string, number][])('add("%s") retourne %d', (input, expected) => {
        const calculator = new StringCalculator();
        const result = calculator.add(input);

        expect(result).toBe(expected);
    });

    it('add - nombre negatif leve une erreur', () => {
        const calculator = new StringCalculator();

        expect(() => calculator.add('1,-2,3')).toThrow(Error);

        expect(() => calculator.add('1,-2,3')).toThrow('-2');
    });

});
