export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export class PasswordValidator {
    validate(password: string): ValidationResult {
        const errors: string[] = [];

        if (password.length < 8) {
            errors.push("Le mot de passe doit contenir au moins 8 caracteres");
        }

        if (!/[A-Z]/.test(password)) {
            errors.push("Le mot de passe doit contenir au moins une majuscule");
        }

        if (!/[a-z]/.test(password)) {
            errors.push("Le mot de passe doit contenir au moins une minuscule");
        }

        if (!/[0-9]/.test(password)) {
            errors.push("Le mot de passe doit contenir au moins un chiffre");
        }

        if (!/[!@#$%^&*]/.test(password)) {
            errors.push("Le mot de passe doit contenir au moins un caractere special (!@#$%^&*)");
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}