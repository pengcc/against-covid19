 import { Reducer } from "redux";
import React from 'react';
import { isActionType } from "../../common/StrongAction";
import { ILocales } from "../../intl";
import * as Actions from './actions';

export interface IDataSource {
	demandData: any;
}

export interface AppState
{
	locale: ILocales;
	loading: boolean;
	dataSource?: IDataSource;
}

export const initialAppState: AppState =
{
	locale: "en-US",
	loading: false,
	dataSource: undefined,
}

const AppReducer: Reducer<AppState> = (state: AppState, act) =>
{
	if (isActionType(act, Actions.ToggleAppLoadingAction)) {
		return {...state, loading: act.loading};
	} else if (isActionType(act, Actions.UpdateDataSourcesAction)) {
		return {...state, dataSource: act.source};
	}
	return state || initialAppState
}

export default AppReducer;