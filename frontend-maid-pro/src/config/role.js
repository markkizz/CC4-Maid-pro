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
    path: "/maid/:maidId"
  },
  mybooking: {
    component: "MyBookingHistory",
    path: "/mybooking"
  },
  aboutus: {
    component: "AboutUs",
    path: "/aboutus"
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
      pageComponents.aboutus,
    ],
    redirect: '/'
  },
  maid: {
    routes: [
      pageComponents.homepage,
      pageComponents.search,
      pageComponents.maidDescription,
      pageComponents.mybooking,
      pageComponents.aboutus,
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
      pageComponents.maidDescription,
      pageComponents.mybooking,
      pageComponents.aboutus,
    ],
    redirect: '/login'
  }
};
