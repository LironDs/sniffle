import Card from "./Card";

export default interface Favorite {
  _id?: string;
  userId: string;
  favCards: Card[];
}
