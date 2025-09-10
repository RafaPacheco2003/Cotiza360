export class DescriptionDescription {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid(): void {
    if (this.value.length < 10) {
      throw new Error('Invalid DescriptionDescription');
    }
  }
}
