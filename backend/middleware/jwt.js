const jwt = require('jsonwebtoken');
const { response } = require('../helper/response');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (!token)
      return response(res, {
        code: 404,
        success: false,
        message: 'token is not found',
      });

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) throw new WrongIdentityError("Your token doesn't matched our credentials");
      req.user = decoded;
    });
  } catch (error) {
    if (error.name === 'NotFoundError')
      return response(res, {
        code: 404,
        success: false,
        message: error.message,
      });

    if (error.name === 'WrongIdentityError')
      return response(res, {
        code: 403,
        success: false,
        message: error.message,
      });

    return response(res, {
      code: 502,
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
  return next();
};

module.exports = { auth };
