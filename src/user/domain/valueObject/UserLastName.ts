export class UserLastName {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (this.value.length < 3) {
            throw new Error('Invalid UserLastName');
        }
    }
}
