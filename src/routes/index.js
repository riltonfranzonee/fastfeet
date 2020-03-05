import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import DeliveryRegister from '~/pages/Deliveries/DeliveryRegister';
import DeliveryEdit from '~/pages/Deliveries/DeliveryEdit';

import Deliverymen from '~/pages/Deliverymen';
import DeliverymanRegister from '~/pages/Deliverymen/Register';
import DeliverymanEdit from '~/pages/Deliverymen/Edit';

import Recipients from '~/pages/Recipients';
import RecipientEdit from '~/pages/Recipients/Edit';
import RecipientRegister from '~/pages/Recipients/Register';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} notPrivate />
      <Route path="/deliveries" exact component={Deliveries} />
      <Route path="/deliveries/register" component={DeliveryRegister} />
      <Route path="/deliveries/edit" component={DeliveryEdit} />
      <Route path="/deliverymen" exact component={Deliverymen} />
      <Route path="/deliverymen/register" component={DeliverymanRegister} />
      <Route path="/deliverymen/edit" component={DeliverymanEdit} />
      <Route path="/recipients" exact component={Recipients} />
      <Route path="/recipients/edit" component={RecipientEdit} />
      <Route path="/recipients/register" component={RecipientRegister} />

      <Route path="/problems" exact component={Problems} />
    </Switch>
  );
}
