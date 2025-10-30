export class ErrorUser extends Error {

    constructor(message: string) {
        super(message);
        this.name = 'UserErrors';
    }


    static notFound(id: string): ErrorUser {
        return new ErrorUser(`User with ID ${id} not found`);
    }
}