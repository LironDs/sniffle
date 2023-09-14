export default interface Card {
  userId?: string;
  _id?: string;
  title: string;
  subTitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  imageUrl: string;
  imageAlt: string;
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip?: number;
}
