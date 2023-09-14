import axios from "axios";
import Card from "../interfaces/Card";
import { json } from "stream/consumers";

export let api: string = `${process.env.REACT_APP_API}/cards`;

////no need for Authorization
export function getCards() {
  return axios.get(api);
}
export function getCardsByUserId(userId: string) {
  return axios.get(`${api}/search/${userId}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}

////no need for Authorization

export function getCardById(_id: string) {
  return axios.get(`${api}/${_id}`);
}

export function createCard(userId: string, newCard: Card) {
  return axios.post(
    api,
    { userId, ...newCard },
    {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
      },
    }
  );
}

export function deleteCard(_id: string) {
  return axios.delete(`${api}/${_id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}

export function updateCard(updatedCard: Card, _id: string) {
  return axios.put(`${api}/${_id}`, updatedCard, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}
