export class DescriptionModelName {
    value: string;
    
    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }
    private ensureIsValid(): void {
        if (!this.value || this.value.trim().length === 0) {
            throw new Error('Invalid DescriptionModelName: cannot be empty');
        }
        if (this.value.length > 100) {
            throw new Error('Invalid DescriptionModelName: cannot exceed 100 characters');
        }
    }
}