import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

import type { User } from '@/types/User';

/* ------------- Model interface Create Action ------------- */
interface UserAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_ALL_USER: 'setAllUser';
  SET_CURRENT_USER_INFO: 'setCurrentUserInfo';
  GET_USER_INFO: 'getUserInfo';
  SET_TOKEN: 'setToken';
}

interface IActionCreators extends DefaultActionCreators {
  setAllUser: (allUser: User[]) => AnyAction;
  setCurrentUserInfo: (data: any) => AnyAction;
  setToken: (token: string) => AnyAction;
}

type IActions = UserAction | AnyAction;

export interface UserState {
  allUser: User[];
  currentUserInfo: any;
  token: string;
}

type ImmutableMyType = Immutable.ImmutableObject<UserState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setAllUser: ['allUser'],
  setCurrentUserInfo: ['data'],
  getUserInfo: null,
  setToken: ['token'],
});

export const UserTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  allUser: [],
  currentUserInfo: undefined,
  token: 'BTC',
});

const setAllUser = (state: ImmutableMyType, { allUser }: { allUser: User[] }) =>
  state.merge({ allUser });

const setCurrentUserInfo = (state: ImmutableMyType, { data }: { data: any }) =>
  state.merge({ currentUserInfo: data });

const setToken = (state: ImmutableMyType, { token }: { token: string }) =>
  state.merge({ token });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_ALL_USER]: setAllUser,
  [Types.SET_CURRENT_USER_INFO]: setCurrentUserInfo,
  [Types.SET_TOKEN]: setToken,
});
