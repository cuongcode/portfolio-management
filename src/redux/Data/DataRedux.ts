import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

/* ------------- Model interface Create Action ------------- */
interface DataAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_CURRENT_DATA: 'setCurrentData';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentData: (data: any) => AnyAction;
}

type IActions = DataAction | AnyAction;

export interface DataState {
  currentData: any;
}

type ImmutableMyType = Immutable.ImmutableObject<DataState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentData: ['data'],
});

export const DataTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentData: [],
});

const setCurrentData = (state: ImmutableMyType, { data }: { data: any }) =>
  state.merge({ currentData: data });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_DATA]: setCurrentData,
});
