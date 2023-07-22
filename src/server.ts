import mongoose from "mongoose";

import app from "./app";

import { envConfig } from "./configs/envConfig";

mongoose.set("strictQuery", true);

mongoose
  .connect(envConfig.DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(envConfig.PORT, () => {
      console.log(`Server running. Use our API on port: ${envConfig.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
