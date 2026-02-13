import app from "./app.js";
import config from "./configs/config.js";
import { connectDB } from "./configs/db.js";

connectDB();
const port = config.app.port;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
