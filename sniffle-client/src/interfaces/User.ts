export default interface User {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  imageUrl: string;
  imageAlt: string;
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip?: number;
  role: string;
}
