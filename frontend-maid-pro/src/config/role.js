const pageComponents = {
  login: {
    component: "LoginPage",
    path: "/login"
  },
  register: {
    component: "Registration",
    path: "/register"
  },
  maidRegister: {
    component: "RegistrationMaid",
    path: "/register/maid"
  },
  homepage: {
    component: "HomePage",
    path: "/"
  },
  search: {
    component: "SearchPage",
    path: "/search/:option"
  },
  maidDescription: {
    component: "MaidDescription",
    path: "/maid"
  },
  mybooking: {
    component: "MyBookingHistory",
    path: "/mybooking"
  }
};

export default {
  admin: {
    routes: [...Object.values(pageComponents)],
    redirect: '/admin'
  },
  user: {
    routes: [
      pageComponents.homepage,
      pageComponents.search,
      pageComponents.maidDescription,
      pageComponents.mybooking,
    ],
    redirect: '/'
  },
  maid: {
    routes: [
      pageComponents.homepage,
      pageComponents.search,
      pageComponents.maidDescription,
      pageComponents.mybooking,
    ],
    redirect: '/'
  },
  guest: {
    routes: [
      pageComponents.login,
      pageComponents.register,
      pageComponents.maidRegister,
      pageComponents.homepage,
      pageComponents.search,
      pageComponents.maidDescription
    ],
    redirect: '/login'
  }
};
