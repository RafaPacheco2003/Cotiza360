export class UserNumber{
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (this.value.length < 7) {
            throw new Error('Invalid UserNumber');
        }
    }
}