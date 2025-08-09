export class BranchErrors extends Error{
   constructor(message: string) {
       super(message);
       this.name = 'BranchErrors';
   }

   static notFound(id:string): BranchErrors{
    return new BranchErrors(`Branch with ID ${id} not found`);
   }
}