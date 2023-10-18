import { createSlice } from "@reduxjs/toolkit";
import { sliceBase } from "helpers";

export const ligaSlice = createSlice(sliceBase("liga"));

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} = ligaSlice.actions;
