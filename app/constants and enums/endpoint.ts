//Routes
export const AUTH_ROUTE = {
  BASE: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
};
export const USER_PROFILE_ROUTE = {
  BASE: "/",
  ADDRESS: {
    BASE: "/address",
    ID: "/:userId",
  },
  ORDER: {
    BASE: "/order",
    ID: "/:id",
  },
  ID: "/:id",
};
export const PRODUCT_ROUTE = {
  BASE: "/",
  ID: "/:id",
};
export const CART_ROUTE = {
  BASE: "/",
  ID: "/:userId",
};
export const CHECKOUT_STRIPE_ROUTE = {
  BASE: "/",
  PAYMENT_INTENTS: {
    BASE: "/payment_intents",
    ID: { BASE: "/:id", CONFIRM: "/confirm" },
  },
};
export const USER_MANAGEMENT_ROUTE = {
  BASE: "/",
  ID: "/:userId",
};
export const ORDER_MANAGEMENT_ROUTE = {
  BASE: "/",
  ID: "/:id",
};
export const FAVORITE_ROUTE = {
  BASE: "/",
};
//Endpoints
export const API_ENDPOINT = "/api";
export const AUTH_ENDPOINT = "/auth";
export const USER_PROFILE_ENDPOINT = "/profile";
export const ADMIN_ENDPOINT = "/admin";
export const PRODUCT_ENDPOINT = "/product";
export const CART_ENDPOINT = "/cart";
export const CHECKOUT_STRIPE_ENDPOINT = "/checkout/stripe";
export const USER_MANAGEMENT_ENDPOINT = "/user-management";
export const ORDER_MANAGEMENT_ENDPOINT = "/order-management";
export const FAVORITE_ENDPOINT = "/favorite";
