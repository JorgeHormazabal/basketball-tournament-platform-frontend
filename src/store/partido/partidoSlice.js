import { createSlice } from "@reduxjs/toolkit";
import { sliceBase } from "helpers";

export const partidoSlice = createSlice(sliceBase("partido"));

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} = partidoSlice.actions;
