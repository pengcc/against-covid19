import * as React from 'react';
import { Route } from 'react-router';
import { URLS } from './constants/urls';
import { Store } from 'redux';
import App from './components/App';
import ClinicList from './components/Pages/Clinic/List';
import Request from './components/Pages/Request';
import Supplier from './components/Pages/Supplier';
import About from './components/Pages/About';

export default (store: Store<any>) => (
  <App>
    <Route exact path={URLS.HOME} component={ClinicList} />
    <Route exact path={URLS.CLINIC} component={ClinicList} />
    <Route exact path={URLS.CLINICS} component={ClinicList} />
    <Route exact path={URLS.REQUEST} component={Request} />
    <Route exact path={URLS.SUPPLIER} component={Supplier} />
    <Route exact path={URLS.ABOUT} component={About} />
  </App>
);
