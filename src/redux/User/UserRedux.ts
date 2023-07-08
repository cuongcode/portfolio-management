import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

import type { User } from '@/types/User';
import { EMPTY_USER } from '@/utils/empty-user';

/* ------------- Model interface Create Action ------------- */
interface UserAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_ALL_USER: 'setAllUser';
  SET_CURRENT_USER: 'setCurrentUser';
  // GET_USER_INFO: 'getUserInfo';
}

interface IActionCreators extends DefaultActionCreators {
  setAllUser: (newAllUser: User[]) => AnyAction;
  setCurrentUser: (user: User) => AnyAction;
}

type IActions = UserAction | AnyAction;

export interface UserState {
  allUser: User[];
  currentUser: User;
}

type ImmutableMyType = Immutable.ImmutableObject<UserState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setAllUser: ['newAllUser'],
  setCurrentUser: ['user'],
  getUserInfo: null,
});

export const UserTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  allUser: <User[]>[
    {
      id: '1',
      username: 'admin',
      password: '2222',
      profile: { firstname: 'Cuong', lastname: 'Nguyen' },
      data: [],
    },
  ],
  currentUser: <User>EMPTY_USER,
});

const setAllUser = (
  state: ImmutableMyType,
  { newAllUser }: { newAllUser: User[] }
) => state.merge({ allUser: newAllUser });

const setCurrentUser = (state: ImmutableMyType, { user }: { user: User }) =>
  state.merge({ currentUser: user });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_ALL_USER]: setAllUser,
  [Types.SET_CURRENT_USER]: setCurrentUser,
});
