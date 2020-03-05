import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  notPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && !notPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && notPrivate) {
    return <Redirect to="/deliveries" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  notPrivate: PropTypes.bool,
  component: PropTypes.element.isRequired,
};

RouteWrapper.defaultProps = {
  notPrivate: false,
};
