const rates = require("./rates");

module.exports = [
  {
    product: rates[0].product,
    text: "a good product, i recommend it.",
    owner: rates[0].owner,
    rate: rates[0]._id,
  },
  {
    product: rates[1].product,
    text: "An excellent one",
    owner: rates[1].owner,
    rate: rates[1]._id,
  },
  {
    product: rates[2].product,
    text: "Not recommended",
    owner: rates[2].owner,
    rate: rates[2]._id,
  },
  {
    product: rates[3].product,
    text: "the material is mid level not perfect",
    owner: rates[3].owner,
    rate: rates[3]._id,
  },
  {
    product: rates[4].product,
    text: "the color is pretty",
    owner: rates[4].owner,
    rate: rates[4]._id,
  },
];
