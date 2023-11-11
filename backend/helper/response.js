const response = (res, data) => {
  return res.status(data.code).json({
    code: data.code,
    success: data.success,
    message: data.message || '',
    content: data.content || null,
  });
};

module.exports = { response };
