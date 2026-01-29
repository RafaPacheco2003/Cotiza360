export class QuotationYear {
    value: number;

    constructor(value: number) {
        this.validate(value);
        this.value = value;
    }

    private validate(value: number): void {
        const currentYear = new Date().getFullYear();
        const minYear = 1900;
        
        if (value < minYear || value > currentYear + 1) {
            throw new Error(`Year must be between ${minYear} and ${currentYear + 1}`);
        }
    }
}
