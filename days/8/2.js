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

    // deduce the rest using the known numbers as a reference
    line.inputs.forEach((binary) => {
      let length = binary.split("1").length - 1;
      let binaryAsDecimal = parseInt(binary, 2);
      switch (length) {
        case 5:
          // if 100% overlap with #7 then #3
          if ((binaryAsDecimal & numberToBinary[7]) == numberToBinary[7]) {
            numberToBinary[3] = binaryAsDecimal;
            break;
          }

          // if 3 segs are similar with #4 then #5
          if (
            (binaryAsDecimal & numberToBinary[4]).toString(2).split("1")
              .length -
              1 ==
            3
          ) {
            numberToBinary[5] = binaryAsDecimal;
            break;
          }

          // else #2
          numberToBinary[2] = binaryAsDecimal;
          break;
        case 6:
          // if 100% overlap with #4 then #9
          if ((binaryAsDecimal & numberToBinary[4]) == numberToBinary[4]) {
            numberToBinary[9] = binaryAsDecimal;
            break;
          }

          // if 100% overlap with #7 then #0
          if ((binaryAsDecimal & numberToBinary[7]) == numberToBinary[7]) {
            numberToBinary[0] = binaryAsDecimal;
            break;
          }

          // else #6
          numberToBinary[6] = binaryAsDecimal;
          break;
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
