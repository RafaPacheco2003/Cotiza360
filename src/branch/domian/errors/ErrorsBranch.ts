export class ErrorsBranch extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BranchErrors';
  }

  static notFound(id: string): ErrorsBranch {
    return new ErrorsBranch(`Branch with ID ${id} not found`);
  }
}
