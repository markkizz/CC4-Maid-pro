const pageComponents = {
  loginMobile: {
    component: "LoginMobile",
    path: "/m.login"
  },
  registerMobile: {
    component: "RegisterMobile",
    path: "/m.register"
  },
  homepage: {
    component: "HomePage",
    path: "/"
  },
  profile: {
    component: "Profile",
    path: "/profile"
  },
  search: {
    component: "Search",
    path: "/search/:option?"
  },
  restaurantDetail: {
    component: "RestaurantDetail",
    path: "/restaurant-detail/:restaurantName/:id?"
  },
  writeReview: {
    component: "WriteReview",
    path: "/write-review/:restaurantName?"
  }
};

export default {
  admin: {
    routes: [...Object.values(pageComponents)]
  },
  user: {
    routes: [
      pageComponents.homepage,
      pageComponents.profile,
      pageComponents.search,
      pageComponents.restaurantDetail,
      pageComponents.writeReview
    ]
  },
  guest: {
    routes: [
      pageComponents.homepage,
      pageComponents.search,
      pageComponents.restaurantDetail,
      pageComponents.loginMobile,
      pageComponents.registerMobile
    ]
  }
};
