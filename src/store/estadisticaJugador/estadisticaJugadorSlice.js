import { createSlice } from "@reduxjs/toolkit";
import { sliceBase } from "helpers";

export const estadisticaJugadorSlice = createSlice(
    sliceBase("estadisticaJugador")
  );
  export const {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutEvent,
    onSetActiveEvent,
    onUpdateEvent,
  } = estadisticaJugadorSlice.actions;