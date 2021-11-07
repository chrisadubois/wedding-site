import React, {createContext, useReducer, Dispatch} from 'react';
import {socialReducer, baseReducer, SocialActions, BaseActions, SocialState} from './reducers';

type InitialStateType = {
  social: SocialState;
  base: number;
};

const initialState = {
  social: {
    imageFileSrc: {
      src: null,
      file: null,
    },
    imageUploadStatus: null,
  },
  base: 0,
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<SocialActions | BaseActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({social, base}: InitialStateType, action: SocialActions | BaseActions) => ({
  social: socialReducer(social, action),
  base: baseReducer(base, action),
});

export const AppProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>;
};
