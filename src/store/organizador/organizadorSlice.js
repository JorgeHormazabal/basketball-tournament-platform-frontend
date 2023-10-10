import { createSlice } from "@reduxjs/toolkit";
import { sliceBase } from "helpers";

export const organizadorSlice = createSlice(sliceBase("organizador"));

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} = organizadorSlice.actions;
