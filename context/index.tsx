import React, {createContext, useReducer, Dispatch} from 'react';
import {socialReducer, SocialActions, SocialState, RsvpState, RsvpActions, rsvpReducer} from './reducers';

export type InitialStateType = {
  social: SocialState;
  rsvp: RsvpState;
};

export const initialState = {
  social: {
    imageFileSrc: {
      src: null,
      file: null,
    },
    imageUploadStatus: null,
    imageCanQuery: true,
  },
  rsvp: {
    submitted: false,
  },
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<SocialActions | RsvpActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({social, rsvp}: InitialStateType, action: SocialActions | RsvpActions) => ({
  social: socialReducer(social, action as SocialActions),
  rsvp: rsvpReducer(rsvp, action as RsvpActions),
});

export const AppProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>;
};
