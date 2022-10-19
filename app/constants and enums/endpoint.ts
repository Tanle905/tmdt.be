//Routes
export const AUTH_ROUTE = {
  BASE: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
};
export const PROFILE_ROUTE = {
  BASE: "/",
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
//Endpoints
export const API_ENDPOINT = "/api";
export const AUTH_ENDPOINT = "/auth";
export const USER_ENDPOINT = "/user";
export const PROFILE_ENDPOINT = "/profile";
export const ADMIN_ENDPOINT = "/admin";
export const PRODUCT_ENDPOINT = "/product";
export const CART_ENDPOINT = "/cart";
export const CHECKOUT_STRIPE_ENDPOINT = "/checkout/stripe";
