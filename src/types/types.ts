// User interface based on the JSONPlaceholder API
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// New User form data
export interface NewUser {
  name: string;
  email: string;
  age: number;
  role: UserRole;
}

// User roles enum
export enum UserRole {
  ADMIN = 'Admin',
  EDITOR = 'Editor',
  VIEWER = 'Viewer'
}

// User context state
export interface UserState {
  users: User[];
  newUsers: NewUser[];
  loading: boolean;
  error: string | null;
}

// User action types
export enum UserActionType {
  FETCH_USERS_START = 'FETCH_USERS_START',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
  ADD_NEW_USER = 'ADD_NEW_USER'
}

// User actions
export type UserAction =
  | { type: UserActionType.FETCH_USERS_START }
  | { type: UserActionType.FETCH_USERS_SUCCESS; payload: User[] }
  | { type: UserActionType.FETCH_USERS_ERROR; payload: string }
  | { type: UserActionType.ADD_NEW_USER; payload: NewUser };