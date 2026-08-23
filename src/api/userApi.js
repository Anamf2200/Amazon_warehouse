import axios from "axios";
import { APP_SETTINGS } from "../config/index";
// import { getAuthHeaders, getFilteredQuery } from "app/assets/genericActions";
export function login(loginData) {
  return axios.post(APP_SETTINGS.API_PATH.USER.login, loginData)
}
export function create(userData) {
  return axios.post(APP_SETTINGS.API_PATH.USER.create, userData)
}
export function removeUser(userId) {
  return axios.delete(`${APP_SETTINGS.API_PATH.USER.remove}/${userId}`)
}
export function getAllUsers(data, auth) {
  return axios.get(`${APP_SETTINGS.API_PATH.USER.getAllUsers}?${getFilteredQuery(data)}`, getAuthHeaders(auth))
}
export function getUser(id) {
  return axios.get(`${APP_SETTINGS.API_PATH.USER.getUser}/${id}`)
}

export function getUsersByTeamLead(teamLeadId, data) {
  return axios.get(`${APP_SETTINGS.API_PATH.USER.getUsersByTeamLead}/${teamLeadId}?${getFilteredQuery(data)}`)

}
export function updateUSer(userData) {
  return axios.put(`${APP_SETTINGS.API_PATH.USER.updateUser}`, userData)
}
export function changePassword(userData) {
  return axios.put(APP_SETTINGS.API_PATH.USER.changePassword, userData)
}
export function logout(userData) {
  return axios.post(APP_SETTINGS.API_PATH.USER.logout, userData)
}