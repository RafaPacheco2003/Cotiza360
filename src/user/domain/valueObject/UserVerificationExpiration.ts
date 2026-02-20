export class UserVerificationExpiration {
    value: Date;

    constructor(value: Date) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (!(this.value instanceof Date) || isNaN(this.value.getTime())) {
            throw new Error('Invalid UserVerificationExpiration: must be a valid date');
        }
    }
}
