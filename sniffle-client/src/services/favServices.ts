import axios from "axios";
import Card from "../interfaces/Card";
import { successMsg } from "./feedbacksServices";

let api: string = `${process.env.REACT_APP_API}/favorites`;

export function getFav(userId: string) {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
    data: {
      userId: userId,
    },
  });
}

export async function updateFav(cardToAdd: Card) {
  try {
    return await axios.post(api, cardToAdd, {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function addOrRemoveCard(cardToAdd: Card) {
  try {
    const response = await updateFav(cardToAdd);
    const { action, message } = response.data;

    if (response.status === 200 || 201) {
      ////if added to fav
      if (action === "add") {
        successMsg("Card added to favorites");
        /////if removed from fav
      } else if (action === "remove") {
        successMsg("Card removed from favorites");
        // Show a success message or update your UI here
      }
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
}
