import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

/* ------------- Model interface Create Action ------------- */
interface UserAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_ALL_USER: 'setCurrentData';
  SET_CURRENT_USER: 'setCurrentUser';
  // GET_USER_INFO: 'getUserInfo';
}

interface IActionCreators extends DefaultActionCreators {
  setAllUser: (allUser: any) => AnyAction;
  setCurrentUser: (user: any) => AnyAction;
}

type IActions = UserAction | AnyAction;

export interface UserState {
  allUser: any;
  currentUser: any;
}

type ImmutableMyType = Immutable.ImmutableObject<UserState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setAllUser: ['allUser'],
  setCurrentUser: ['user'],
  getUserInfo: null,
});

export const UserTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  allUser: [
    {
      id: '1',
      username: 'admin',
      password: '2222',
      profile: { firstname: 'Cuong', lastname: 'Nguyen' },
      data: [],
    },
  ],
  currentUser: undefined,
});

const setAllUser = (state: ImmutableMyType, { allUser }: { allUser: any }) =>
  state.merge({ allUser });

const setCurrentUser = (state: ImmutableMyType, { user }: { user: any }) =>
  state.merge({ currentUser: user });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_ALL_USER]: setAllUser,
  [Types.SET_CURRENT_USER]: setCurrentUser,
});
