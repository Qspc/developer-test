const { response } = require('../helper/response');
const { User } = require('../model/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const LoginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return response(res, {
        code: 400,
        success: false,
        message: 'username and password is required',
      });

    const success = User.find((item) => item.username === username && item.password === password);
    if (!success)
      return response(res, {
        code: 404,
        success: false,
        message: 'username or password not found',
      });

    const payload = {
      username: username,
    };
    const accessToken = await jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: '1h',
    });

    return response(res, {
      code: 200,
      success: true,
      message: 'Login Successfully',
      content: accessToken,
    });
  } catch (error) {
    return response(res, {
      code: 500,
      success: false,
      message: 'Something went wrong!',
    });
  }
};

module.exports = { LoginController };
