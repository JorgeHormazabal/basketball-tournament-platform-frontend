import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.NODE_ENV ===
  "https://basketball-tournament-platform-backend.onrender.com/api/";

//const URL = "http://localhost:3000/";

export const socket = io(URL, {
  autoConnect: false,
});
