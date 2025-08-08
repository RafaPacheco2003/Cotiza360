export class DescriptionId{
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (this.value.length < 5) {
            throw new Error("Invalid DescriptionId");
        }
    }
}