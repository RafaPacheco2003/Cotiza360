export class UserPasswordSalt {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (!this.value || this.value.length === 0) {
            throw new Error('Invalid UserPasswordSalt: salt cannot be empty');
        }
    }
}


/*
POR MOMENTO S SALE ESTO: Application error: a client-side exception has occurred while loading cotizadorautos.mapfre.com.mx (see the browser console for more information).

Y QUIERO QUE LO DETECTE Y SI SALE QUE VUELVA A RECARGAR TODO
*/