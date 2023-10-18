import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import {
  authSlice,
  clubSlice,
  divisionSlice,
  organizadorSlice,
  jugadorSlice,
  equipoSlice,
  ligaSlice,
  estadisticaLigaEquipoSlice,
} from "./";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
export const store = configureStore({
  reducer: {
    club: clubSlice.reducer,
    organizador: organizadorSlice.reducer,
    auth: authSlice.reducer,
    division: divisionSlice.reducer,
    jugador: jugadorSlice.reducer,
    equipo: equipoSlice.reducer,
    liga: ligaSlice.reducer,
    estadisticaLigaEquipo: estadisticaLigaEquipoSlice.reducer,
  },
  composedEnhancer,
});
