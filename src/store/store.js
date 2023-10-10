import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  clubSlice,
  divisionSlice,
  organizadorSlice,
  jugadorSlice,
  equipoSlice,
} from "./";
export const store = configureStore({
  reducer: {
    club: clubSlice.reducer,
    organizador: organizadorSlice.reducer,
    auth: authSlice.reducer,
    division: divisionSlice.reducer,
    jugador: jugadorSlice.reducer,
    equipo: equipoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
