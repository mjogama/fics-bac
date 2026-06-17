import app from "./app";
import { connectDB } from "./config/db";
import { connectCache } from "./config/cache";

const PORT = Number(process.env.PORT) || 8080;

const serverStarter = async () => {
  try {
    await connectCache();
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

serverStarter();
