export class UserDateOfBirth {
    value: Date;

    constructor(value: Date) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        const today = new Date();
        if (this.value >= today) {
            throw new Error('Invalid UserDateOfBirth');
        }
    }
}