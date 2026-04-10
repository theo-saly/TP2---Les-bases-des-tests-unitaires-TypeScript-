import { describe, it, expect } from "vitest";
import { PasswordValidator } from "../src/PasswordValidator";

describe("PasswordValidator", () => {
    it.each([
        ["Abcdefg1!"],
        ["MonMotDePasse9@"], 
        ["P4ssw0rdOk#"]
    ] as [string][])('validate("%s") retourne isValid=true et aucune erreur', (password) => {
        const validator = new PasswordValidator();

        const result = validator.validate(password);

        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual([]);
        },
    );

    it.each([
        ["Ab1!"],
        ["Abcde1!"],
        ["A1bcde!"],
    ] as [string][])('validate - trop court: "%s" retourne erreur 8 caracteres', (password) => {
        const validator = new PasswordValidator();

        const result = validator.validate(password);

        expect(result.isValid).toBe(false);
        expect(result.errors.some((e) => e.includes("8 caracteres"))).toBe(true);
    });

    it.each([
        ["abcdefg1!"],
        ["motdepasse9@"],
        ["password1#"],
    ] as [string][])('validate - pas de majuscule: "%s" retourne erreur majuscule', (password) => {
        const validator = new PasswordValidator();

        const result = validator.validate(password);

        expect(result.isValid).toBe(false);
        expect(result.errors.some((e) => e.includes("majuscule"))).toBe(true);
    });

    it.each([
        ["ABCDEFG1!"],
        ["MOTDEPASSE9@"],
        ["PASSWORD1#"],
    ] as [string][])('validate - pas de minuscule: "%s" retourne erreur minuscule', (password) => {
        const validator = new PasswordValidator();

        const result = validator.validate(password);

        expect(result.isValid).toBe(false);
        expect(result.errors.some((e) => e.includes("minuscule"))).toBe(true);
    });

    it.each([
        ["Abcdefgh!"],
        ["MonMotDePasse@"],
        ["PasswordOk#"],
    ] as [string][])('validate - pas de chiffre: "%s" retourne erreur chiffre', (password) => {
        const validator = new PasswordValidator();

        const result = validator.validate(password);

        expect(result.isValid).toBe(false);
        expect(result.errors.some((e) => e.includes("chiffre"))).toBe(true);
    });

    it.each([
        ["", false],
        ["Abcdefg1", false],
        ["Abcdef1!", true],
        ["12345678", false],
        ["ABCDEFG1", false],
        ["Aaaaaaaaaaaaaaa1!", true],
    ] as [string, boolean][])('validate - cas limites "%s" retourne isValid=%s', (password, expected) => {
        const validator = new PasswordValidator();

        const result = validator.validate(password);

        expect(result.isValid).toBe(expected);
    });

    it.each([
        ["Abcdefg1"],
        ["MonMotDePasse9"],
        ["P4ssw0rdOk"],
    ] as [string][])('validate - pas de caractere special: "%s" retourne erreur special', (password) => {
        const validator = new PasswordValidator();

        const result = validator.validate(password);

        expect(result.isValid).toBe(false);
        expect(result.errors.some((e) => e.includes("special"))).toBe(true);
    });

    it('validate - trop court et pas de chiffre retourne les deux erreurs', () => {
        const validator = new PasswordValidator();
        const result = validator.validate('Abcde!');

        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(2);
        expect(result.errors.some((e) => e.includes('8 caracteres'))).toBe(true);
        expect(result.errors.some((e) => e.includes('chiffre'))).toBe(true);
    });
});
