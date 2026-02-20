export class UserPasswordValue {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (this.value.length < 6) {
            throw new Error('Invalid UserPasswordValue: password must be at least 6 characters');
        }
    }
}
