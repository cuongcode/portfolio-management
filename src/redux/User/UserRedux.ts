import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

/* ------------- Model interface Create Action ------------- */
export interface UserAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_CURRENT_USER_INFO: 'setCurrentUserInfo';
  GET_USER_INFO: 'getUserInfo';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentUserInfo: (data: any) => AnyAction;
}

type IActions = UserAction | AnyAction;

export interface UserState {
  currentUserInfo: any;
}

type ImmutableMyType = Immutable.ImmutableObject<UserState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentUserInfo: ['data'],
  getUserInfo: null,
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentUserInfo: undefined,
});

export const setCurrentUserInfo = (
  state: ImmutableMyType,
  { data }: { data: any }
) => state.merge({ currentUserInfo: data });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_USER_INFO]: setCurrentUserInfo,
});
