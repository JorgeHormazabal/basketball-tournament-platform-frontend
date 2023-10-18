import { createSlice } from "@reduxjs/toolkit";
import { sliceBase } from "helpers";

export const estadisticaLigaEquipoSlice = createSlice(
  sliceBase("estadisticaLigaEquipo")
);

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} = estadisticaLigaEquipoSlice.actions;
