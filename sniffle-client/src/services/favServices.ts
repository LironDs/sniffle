import axios from "axios";
import Card from "../interfaces/Card";
import Favorite from "../interfaces/Favorite";
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

// add to fav / update fav
// export async function addToFav(userId: string, cardId: string) {
//   try {
//     let res = await getFav(userId);
//     if (res.data.length === 0) {
//       await createFav(userId);
//       res = await getFav(userId);
//     }

//     const cardInFav = res.data[0].favCards.some((card: Card) => card._id === cardId);
//     if (!cardInFav) {
//       res.data[0].favCards.push(cardId);

//       successMsg("Card added to favorites.");
//       return await axios.patch(`${api}/${res.data[0]._id}`, {
//         favCards: res.data[0].favCards,
//       });
//     } else {
//       successMsg("Card is already in favorites.");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
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
    // Handle errors here
  }
}
