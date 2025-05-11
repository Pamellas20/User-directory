import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, NewUser, UserState, UserAction, UserActionType } from '../types/types';


const initialState: UserState = {
  users: [],
  newUsers: [],
  loading: false,
  error: null
};


const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}>({
  state: initialState,
  dispatch: () => null
});


const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionType.FETCH_USERS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UserActionType.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case UserActionType.FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UserActionType.ADD_NEW_USER:
      return {
        ...state,
        newUsers: [...state.newUsers, action.payload]
      };
    default:
      return state;
  }
};


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};