function generateOrderNr() {
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += Math.ceil(Math.random() * 10).toString();
  }
  return `AB${result}`;
}

function generateETA() {
  let eta = 10;
  return eta + Math.floor(Math.random() * 20);
}

module.exports = { generateOrderNr, generateETA };
