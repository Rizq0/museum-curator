const testRoute = (req, res) => {
  res.status(200).json({ message: "Test route works!" });
};

module.exports = { testRoute };
