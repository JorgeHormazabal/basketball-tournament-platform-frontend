import { createSlice } from "@reduxjs/toolkit";
import { sliceBase } from "helpers";

export const jugadorSlice = createSlice(sliceBase("jugador"));

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} = jugadorSlice.actions;
