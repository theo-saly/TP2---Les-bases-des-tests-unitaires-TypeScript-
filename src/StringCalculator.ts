export class StringCalculator {
    add(numbers: string): number {
        if (!numbers || numbers.length === 0) 
            return 0;

        let delimiter = ",";
        let numbersPart = numbers;

        if (numbers.startsWith("//")) {
            const newlineIndex = numbers.indexOf("\n");
            if (newlineIndex !== -1) {
                delimiter = numbers.slice(2, newlineIndex);
                numbersPart = numbers.slice(newlineIndex + 1);
            }
        }

        const parts = numbersPart.split(delimiter);
        const negatives: number[] = [];

        let sum = 0;
        for (let i = 0; i < parts.length; i++) {
            const value = parts[i].trim();
            if (value.length === 0) continue;

            const number = parseInt(value, 10);
            if (number < 0) {
                negatives.push(number);
                continue;
            }

            sum += number;
        }

        if (negatives.length > 0) {
            throw new Error(`Nombres negatifs interdits : ${negatives.join(", ")}`);
        }
        
        return sum;
    }
}