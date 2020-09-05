const express = require("express");
const app = express();
const _ = require("lodash");

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server listening on PORT ${port}`);
});
app.use(express.json());
app.post("/get-second-max", async (req, res) => {
  const { message } = req.body;
  console.log(req.body);
  if (!_.isArray(message)) {
    return res.json({
      error: "BadRequest Error",
      message: "Please enter the array as input",
    });
  }
  const response = await getSecondMax(message);
  return res.json({
    result: response,
  });
});

const getSecondMax = async (array) => {
  let intArr = array.map(Number);
  if (intArr.length < 2) {
    return -1;
  }
  let first = (second = Number.MIN_SAFE_INTEGER);
  intArr.forEach((element) => {
    if (element > first) {
      second = first;
      first = element;
    } else if (element > second && element != first) {
      second = element;
    } else if (second == Number.MIN_SAFE_INTEGER) {
      second = -1;
    }
  });
  return second;
};
