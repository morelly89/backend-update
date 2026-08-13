import app from "./app";
import dotenv from "dotenv";

dotenv.config();// this is used to load environment variables from a .env file into process.env

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});