// export const WORDPRESS_URL = 'https://rikeja.wordifysites.com'
export const WORDPRESS_URL = `https://${process.env.GRAPHQL_URL}`;

export const WOO = {
  CART_KEY: "woo_cart",
  SESSION_KEY: "woo-session",
  HEADER_KEY: "woocommerce-session",
};

export const PRODUCT_STATUS = {
  IN_STOCK: "IN_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  ON_BACKORDER: "ON_BACKORDER",
};

export const ORDER_STATUS = {
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  ON_HOLD: "ON_HOLD",
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  REFUNDED: "REFUNDED",
};
