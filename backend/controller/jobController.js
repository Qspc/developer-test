const { response } = require('../helper/response');
const { User } = require('../model/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const axios = require('axios');

const GetAllJobs = async (req, res) => {
  try {
    const data = await axios
      .get('https://dev6.dansmultipro.com/api/recruitment/positions.json')
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));

    return response(res, {
      code: 200,
      success: true,
      message: 'Login Successfully',
      content: data,
    });
  } catch (error) {
    return response(res, {
      code: 500,
      success: false,
      message: 'Something went wrong!',
    });
  }
};

const getJobsById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await axios
      .get(`https://dev6.dansmultipro.com/api/recruitment/positions/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));

    return response(res, {
      code: 200,
      success: true,
      message: 'Login Successfully',
      content: data,
    });
  } catch (error) {
    return response(res, {
      code: 500,
      success: false,
      message: 'Something went wrong!',
    });
  }
};

module.exports = { GetAllJobs, getJobsById };
