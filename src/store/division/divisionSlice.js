import { createSlice } from "@reduxjs/toolkit";
import { sliceBase } from "helpers";

export const divisionSlice = createSlice(sliceBase("division"));

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} = divisionSlice.actions;
