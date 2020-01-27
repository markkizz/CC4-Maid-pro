import axios from "axios";
import {logout} from '../redux/actions/actions'
import store from '../redux/store/store'

axios.defaults.baseURL = "http://localhost:3333";

const TOKEN = "ACCESS_TOKEN";
const PROTECTED_PATHS = ["/bookings/employers", "/bookings/maids", "/add-review", "/bookings/maid/complete", "/bookings/maid/accept"];

const parseUrl = url => {
  const arrUrl = url.split("/");
  const numUrl = Number(arrUrl[arrUrl.length - 1]);
  if (isNaN(numUrl)) {
    return arrUrl.join("/");
  } else {
    arrUrl.pop();
    const newUrl = arrUrl.join("/");
    return newUrl;
  }
};

const isProtectedPath = url => PROTECTED_PATHS.find(path => path === parseUrl(url));

axios.interceptors.request.use(
  async config => {
    console.log(config);
    if (isProtectedPath(config.url)) {
      console.log("pass auth");
      let token = localStorage.getItem(TOKEN);
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    }
    return config;
  },
  async error => {
    throw error;
  }
);

// Redirect to login page in case of 401 response
axios.interceptors.response.use(
  async config => {
    return config;
  },
  async error => {
    if (error.request === undefined) throw error;
    let url = error.request.responseURL.split('http://localhost:3333')[1];
    console.log(error.request.status === 401 && isProtectedPath(url))
    if (error.request.status === 401 && isProtectedPath(url)) {
      console.log("Session expire, redirect to login");
      store.dispatch(logout())
    }

    if (error.request.status === 401) {
      throw error;
    }

    throw error;
  }
);

export default axios;
