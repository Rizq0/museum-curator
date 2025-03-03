require("dotenv").config();
const { app } = require("./api/app");
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port: ${PORT}`);
  }
});
