import app from "./app.js";

const PORT = Number(process.env.PORT) || 8080;

const serverStarter = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

serverStarter();
