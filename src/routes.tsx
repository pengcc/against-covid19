import * as React from 'react';
import { Route } from 'react-router';
import { URLS } from './constants/urls';
import { Store } from 'redux';
import App from './components/App';
import ClinicList from './components/Pages/Clinic/List';

export default (store: Store<any>) => (
  <App>
    <Route exact path={URLS.CLINIC} component={ClinicList} />
    <Route exact path={URLS.CLINICS} component={ClinicList} />
  </App>
);
