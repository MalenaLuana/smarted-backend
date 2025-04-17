const ERROR_STATUS = {
  missingFields: 400,
  default: 404,
  userAlreadyExist: 501,
  userNotfound: 502,
  wrongPassword: 503,
};

export default ERROR_STATUS;

export const USER_ROLES = {
  admin: 'admin',
  user: 'user',
};
