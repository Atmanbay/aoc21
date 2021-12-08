const toBinary = (str) => {
  let full = "abcdefg".split("");
  let binary = "";
  full.forEach((letter) => {
    if (str.includes(letter)) {
      binary += "1";
    } else {
      binary += "0";
    }
  });
  return binary;
};

module.exports = function (input) {
  let lines = input.map((line) => {
    let splitLine = line.split(" | ");
    return {
      inputs: splitLine[0].split(" ").map(toBinary),
      outputs: splitLine[1].split(" ").map(toBinary),
    };
  });

  let sum = 0;

  // first get the known numbers
  lines.forEach((line) => {
    let numberToBinary = [];
    line.inputs.forEach((binary) => {
      let length = binary.split("1").length - 1;
      let binaryAsDecimal = parseInt(binary, 2);
      switch (length) {
        case 2:
          numberToBinary[1] = binaryAsDecimal;
          break;
        case 3:
          numberToBinary[7] = binaryAsDecimal;
          break;
        case 4:
          numberToBinary[4] = binaryAsDecimal;
          break;
        case 7:
          numberToBinary[8] = binaryAsDecimal;
          break;
      }
    });

    line.inputs.forEach((binary) => {
      let length = binary.split("1").length - 1;
      let binaryAsDecimal = parseInt(binary, 2);
      let similarToOne =
        (binaryAsDecimal & numberToBinary[1]).toString(2).split("1").length - 1;
      let similarToFour =
        (binaryAsDecimal & numberToBinary[4]).toString(2).split("1").length - 1;

      if (length == 6 && similarToOne == 2 && similarToFour == 3) {
        numberToBinary[0] = binaryAsDecimal;
      } else if (length == 5 && similarToOne == 1 && similarToFour == 2) {
        numberToBinary[2] = binaryAsDecimal;
      } else if (length == 5 && similarToOne == 2 && similarToFour == 3) {
        numberToBinary[3] = binaryAsDecimal;
      } else if (length == 5 && similarToOne == 1 && similarToFour == 3) {
        numberToBinary[5] = binaryAsDecimal;
      } else if (length == 6 && similarToOne == 1 && similarToFour == 3) {
        numberToBinary[6] = binaryAsDecimal;
      } else if (length == 6 && similarToOne == 2 && similarToFour == 4) {
        numberToBinary[9] = binaryAsDecimal;
      }
    });

    let outputValue = "";
    line.outputs.forEach((binary) => {
      let binaryAsDecimal = parseInt(binary, 2);
      let indexOf = numberToBinary.indexOf(binaryAsDecimal);
      outputValue += indexOf.toString();
    });

    sum += Number(outputValue);
  });

  return sum;
};
