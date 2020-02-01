import axios from "axios";
import { logout } from "../redux/actions/actions";
import store from "../redux/store/store";

axios.defaults.baseURL = "http://localhost:3333";

const TOKEN = "ACCESS_TOKEN";
const PROTECTED_PATHS = [
  "/bookings/employers",
  "/bookings/maids",
  "/add-review",
  "/bookings/maid/complete",
  "/bookings/maid/accept",
  "/bookings/maid/reject"
];

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

const isProtectedPath = url =>
  PROTECTED_PATHS.find(path => path === parseUrl(url));

axios.interceptors.request.use(
  async config => {
    const url = config.url;
    if (isProtectedPath(url)) {
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

// Redirect to login page in case of 403 response
axios.interceptors.response.use(
  async config => {
    return config;
  },
  async error => {
    if (error.request === undefined) throw error;
    let url = error.request.responseURL.split("http://localhost:3333")[1];
    if (error.request.status === 403 && isProtectedPath(url)) {
      console.error("Session expire, redirect to login");
      store.dispatch(logout());
      setTimeout(() => {
        window.appHistory.push("/login");
      }, 1000);
    }

    if (error.request.status === 403) {
      throw error;
    }

    throw error;
  }
);

export default axios;
