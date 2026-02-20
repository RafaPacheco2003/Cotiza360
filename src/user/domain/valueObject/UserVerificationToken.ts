export class UserVerificationToken {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (!this.value || this.value.length === 0) {
            throw new Error('Invalid UserVerificationToken: token cannot be empty');
        }
    }
}
