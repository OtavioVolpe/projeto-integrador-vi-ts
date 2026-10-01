import app from "./app";
import { sequelize } from "./config/database";

const port = 3000;

sequelize.sync().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});