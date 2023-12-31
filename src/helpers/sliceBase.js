export function sliceBase(name) {
  return {
    name,
    initialState: {
      isLoadingEvents: true,
      events: [],
      activeEvent: null,
    },
    reducers: {
      onSetActiveEvent: (state, { payload }) => {
        state.activeEvent = payload;
      },
      onAddNewEvent: (state, { payload }) => {
        state.events.push(payload);
        state.activeEvent = null;
      },
      onUpdateEvent: (state, { payload }) => {
        state.events = state.events.map((event) => {
          if (event.id === payload.id) {
            return payload;
          }

          return event;
        });
        if (state.activeEvent?.id === payload.id) {
          state.activeEvent = { ...state.activeEvent, ...payload };
        }
      },
      onDeleteEvent: (state) => {
        if (state.activeEvent) {
          state.events = state.events.filter(
            (event) => event.id !== state.activeEvent.id
          );
          state.activeEvent = null;
        }
      },
      onLoadEvents: (state, { payload = [] }) => {
        // state.events = payload;
        payload.forEach((event) => {
          const exists = state.events.some(
            (dbEvent) => dbEvent.id === event.id
          );
          if (!exists) {
            state.events.push(event);
          }
        });
        state.isLoadingEvents = false;
      },
      onLogoutEvent: (state) => {
        (state.isLoadingEvents = true), (state.events = []);
        state.activeEvent = null;
      },
    },
  };
}
