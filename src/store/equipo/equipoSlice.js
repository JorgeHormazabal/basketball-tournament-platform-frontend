import { createSlice } from "@reduxjs/toolkit";
import { sliceBase } from "helpers";

export const equipoSlice = createSlice(sliceBase("equipo"));

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} = equipoSlice.actions;
