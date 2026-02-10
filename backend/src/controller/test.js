const test = (req, res) => {
  const reqHeaders = req.headers
  
  res.status(200).json({
    message: "tesing",
  });
};

export default { test };
