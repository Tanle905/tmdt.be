import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
  },
};
