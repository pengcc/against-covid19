import { Reducer } from "redux";
import * as React from 'react'
import { isActionType } from "../../common/StrongAction";
import { IClinic } from "../../types/interfaces";
import * as Actions from './actions';
import { createSelector } from "reselect";
import { IApplicationState } from "..";


export interface ClinicsState {
	demandsList: IClinic[];
	selectedCity: string;
	selectedSupplyType: string;
	selectedRequestType: string;
}

export const initialClinicsState: ClinicsState = {
	demandsList: [],
	selectedCity: '',
	selectedSupplyType: '',
	selectedRequestType: ''
}

export const clinicsSelector = (state: IApplicationState) => state.clinic.demandsList;

export const selectedCitySelector = (state: IApplicationState) => state.clinic.selectedCity;

export const selectedSupplyTypeSelector = (state: IApplicationState) => state.clinic.selectedSupplyType;

export const selectedRequestTypeSelector = (state: IApplicationState) => state.clinic.selectedRequestType;

export const makeFilteredClinicsSelector = () => {
	return createSelector(
		[clinicsSelector, selectedCitySelector, selectedRequestTypeSelector, selectedSupplyTypeSelector],
		(clinics: IClinic[], selectedCity: string, selectedRequestType: string, selectedSupplyType: string) => {
			if (!clinics) return [];
			return clinics.filter((c) => {
				const { hospital, requestType, supplyList} = c;
				  const matchCity = !selectedCity || hospital.city === selectedCity;
				  const matchRequest = !selectedRequestType || selectedRequestType === requestType;
				  const matchSupply = !selectedSupplyType || supplyList.find(item => item.type === selectedRequestType);
				  return matchCity && matchRequest && matchSupply;
      		});
		}
	)
}

const ClinicReducer: Reducer<ClinicsState> = (state: ClinicsState, act) =>
{
	if (isActionType(act, Actions.UpdateClinicListActions)) {
		return {...state, demandsList: state.demandsList.concat(act.demandsList)};
	} else if (isActionType(act, Actions.UpdateCityAction)) {
		return {...state, selectedCity: act.value};
	} else if (isActionType(act, Actions.UpdateSupplyTypeAction)) {
		return {...state, selectedSupplyType: act.value};
	} else if (isActionType(act, Actions.UpdateRequestTypeAction)) {
		return {...state, selectedRequestType: act.value};
	} else if (isActionType(act, Actions.ResetAction)) {
		return {...initialClinicsState};
	} 
	return state || initialClinicsState
}

export default ClinicReducer;