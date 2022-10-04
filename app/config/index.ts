import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    port: process.env.PORT || 13000,
    databaseUrl: process.env.DATABASE_URL,
    secret: "tanle-secret-key",
  },
};
