export class ModelResponse {
  id: string;
  name: string;
  branch?: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
