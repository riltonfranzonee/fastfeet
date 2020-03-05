export function signInRequest(email, password) {
  return {
    type: 'SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token) {
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: { token },
  };
}

export function signInFailure() {
  return {
    type: 'SIGN_IN_FAILURE',
  };
}

export function signOut() {
  return {
    type: 'SIGN_OUT',
  };
}
