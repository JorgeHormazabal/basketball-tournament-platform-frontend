import { createSlice } from "@reduxjs/toolkit";
import { sliceBase } from "helpers";

export const clubSlice = createSlice(sliceBase("club"));

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} = clubSlice.actions;
