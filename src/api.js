import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api",
});

// authentication
export function loginReq(email, pass) {
  return api.post("/login", { email, pass });
}
export function registerReq(email, pass) {
  return api.post("/register", { email, pass });
}

// profile
export function fetchProfile() {
  return api.get("/profile");
}
export function saveProfileReq(profile) {
  return api.post("/profile", profile);
}

// transactions
export function fetchTxns() {
  return api.get("/txns");
}
export function addTxnReq(txn) {
  return api.post("/txns", txn);
}
export function deleteTxnReq(id) {
  return api.delete(`/txns/${id}`);
}

// expose raw instance if needed
export { api };
