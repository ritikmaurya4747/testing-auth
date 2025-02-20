export interface IContact extends Document {
    name: string;
    email: string;
}
export interface User extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }