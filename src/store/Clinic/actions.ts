import * as React from 'react'
import { typeName, StrongAction } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getClinics } from '../../http/Api';
import { IClinic } from '../../types/interfaces';

const SUFFIX = '__CLINICS';

@typeName('UPDATE_LIST' + SUFFIX)
export class UpdateClinicListActions extends StrongAction { constructor(public demandsList: IClinic[]) { super(); }}

@typeName('UPDATE_CITY' + SUFFIX)
export class UpdateCityAction extends StrongAction { constructor(public value: string) {super(); }}

@typeName('UPDATE_SUPPLY_TYPE' + SUFFIX)
export class UpdateSupplyTypeAction extends StrongAction { constructor(public value: string) {super(); }}

@typeName('UPDATE_REQUEST_TYPE' + SUFFIX)
export class UpdateRequestTypeAction extends StrongAction { constructor(public value: string) {super(); }}

@typeName('RESET' + SUFFIX)
export class ResetAction extends StrongAction { constructor() { super(); }}


export interface Actions
{
  fetchClinicList(list: any[]);
  updateCity(value: number);
  updateSupplyType(value: number);
  updateRequestType(value: number);
}


export const actionCreators = {
  fetchClinicList: (link: string): any => async (dispatch) => {
    dispatch(new ResetAction());
    dispatch(appActionCreators.toggleAppLoading(true));
    try {
      getClinics(link).then((result) => {
        dispatch(new UpdateClinicListActions(result));
      }).catch(() => []);;
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(appActionCreators.toggleAppLoading(false));
    }
  },
  updateCity: (value: string): any => dispatch => dispatch(new UpdateCityAction(value)),
  updateSupplyType: (value: string): any => dispatch => dispatch(new UpdateSupplyTypeAction(value)),
  updateRequestType: (value: string): any => dispatch => dispatch(new UpdateRequestTypeAction(value)),
};