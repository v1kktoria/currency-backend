import { app } from "./app";
import { AppDataSource } from "./config/db";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log('Server running at http://localhost:${PORT}');
    });
  })
  .catch((err) => {
    console.log(err);
  });
