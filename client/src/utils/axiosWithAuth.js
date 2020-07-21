import axios from "axios";

export const axiosWithAuth = () => {
  //get the token from localStorage
const session = window.sessionStorage.getItem('session')
const loggedIn = window.sessionStorage.getItem('loggedIn')
  //create a new 'instance' of axios with the config object built into it
  return axios.create({
    headers: {
      authorization: {session, loggedIn}
    },
    baseURL: 'http://localhost:8000/api/' //got our baseURL!
  })
}