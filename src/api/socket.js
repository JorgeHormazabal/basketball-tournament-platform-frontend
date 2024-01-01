import { io } from "socket.io-client";
export const socket = io(import.meta.env.VITE_BASE_URL, {
  path: "/tromu-backend/socket.io",
  autoConnect: false,
});

/*
production

import { io } from "socket.io-client";
export const socket = io(import.meta.env.VITE_BASE_URL, {
  path: "/tromu-backend/socket.io",
  autoConnect: false,
});

*/

/*
dev

import { io } from "socket.io-client";
const URL = `${import.meta.env.VITE_API_URL}/`;
export const socket = io(URL, {
  autoConnect: false,
});

*/
