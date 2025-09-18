export class ErrorsModel extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ModelErrors';
  }

  static notFound(id: string): ErrorsModel {
    return new ErrorsModel(`Model with ID ${id} not found`);
  }

  static alreadyExists(id: string): ErrorsModel {
    return new ErrorsModel(`Model with ID ${id} already exists`);
  }
}
