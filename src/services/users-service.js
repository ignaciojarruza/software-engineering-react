import axios from "axios";
const BASE_URL = "https://tuitera2.herokuapp.com";
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";

const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/users`;

export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () =>
  axios.get(USERS_API)
    .then(response => response.data);

export const findUserById = (userid) =>
  axios.get(`${USERS_API}/${userid}`)
    .then(response => response.data);

export const deleteUser = (userid) =>
  axios.delete(`${USERS_API}/${userid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
  axios.delete(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;