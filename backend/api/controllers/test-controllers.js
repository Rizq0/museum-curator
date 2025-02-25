const testRoute = (req, res) => {
  res.status(200).json({ message: "Test route works!" });
};

const testError = (req, res) => {
  try {
    throw new Error("Test error route works!", 400);
  } catch (error) {
    throw error;
  }
};

module.exports = { testRoute, testError };
