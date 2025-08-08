export class DescriptionErrors extends Error {
   constructor(message: string) {
       super(message);
       this.name = "DescriptionErrors";
   }

   static notFound(id: string): DescriptionErrors {
       return new DescriptionErrors(`Description with ID ${id} not found`);
   }

   static alreadyExists(id: string): DescriptionErrors {
       return new DescriptionErrors(`Description with ID ${id} already exists`);
   }
}
