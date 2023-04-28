import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function ApproveRoute({ component: Component, render, ...rest }) {
  const account = useSelector((state) => state.account);

  if (!account.user) {
    return <Redirect to="/login" />;
  }

  if (account.user.role === 'buyer' || (account.user.role === 'seller' && !account.user.isApproved)) {
    return <Redirect to="/404" />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
}

ApproveRoute.propTypes = {
  component: PropTypes.any,
  render: PropTypes.func
};

export default ApproveRoute;
