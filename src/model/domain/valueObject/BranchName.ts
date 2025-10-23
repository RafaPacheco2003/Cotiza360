export class BranchName {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Invalid BranchName: cannot be empty');
    }
    if (this.value.length > 100) {
      throw new Error('Invalid BranchName: cannot exceed 100 characters');
    }
  }
}