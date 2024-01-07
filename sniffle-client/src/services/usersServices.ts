import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";

let api: string = `${process.env.REACT_APP_API}`;

type userLogin = Pick<User, "email" | "password">;

export function checkUser(userToCheck: userLogin) {
  return axios.post(`${api}/login`, userToCheck);
}

////no need for Authorization

export function addUser(newUser: User) {
  return axios.post(`${api}/register`, newUser);
}

export function updateUser(_id: string, updatedUser: User) {
  return axios.put(`${api}/users/${_id}`, updatedUser, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}

export function getUserById(_id: string) {
  return axios.get(`${api}/users/${_id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}

export function getUsers() {
  return axios.get(`${api}/users`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}

export function deleteUser(_id: string) {
  return axios.delete(`${api}/users/${_id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}

export function getTokenDetails() {
  let token = JSON.parse(sessionStorage.getItem("token") as string).token;
  return jwt_decode(token);
}
