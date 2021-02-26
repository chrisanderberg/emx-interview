const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.send(generateAnswer(req)))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function generateAnswer(req) {
  let {q, d} = req.query;
  let response = "";
  switch(q) {
    case "Resume":
      response = "https://mysterious-basin-39601.herokuapp.com/Resume-and-Cover-Letter.zip"
      break;
    case "Puzzle":
      response = solvePuzzle(d);
      break;
    case "Position":
      response = "Software Engineer - Mid Level on the Exchange team"
      break;
    case "Phone":
      response = "(760) 994-5640";
      break;
    case "Degree":
      response = "Bachelor of Science in Computer Science, Minor in Physics at California State Polytechnic University, Pomona";
      break;
    case "Referrer":
      response = "I heard about it from a recruiter, Andrew Rogers.";
      break;
    case "Years":
      response = "I have 8 years of professional experience since graduating, 18 years of writing code since I was a kid.";
      break;
    case "Name":
      response = "Christopher Anderberg";
      break;
    case "Source":
      response = "https://github.com/chrisanderberg/emx-interview";
      break;
    case "Email Address":
      response = "chris.anderberg@protonmail.com";
      break;
    case "Status":
      response = "yes";
      break;
    case "Ping":
    default:
      response = "OK";
      break;
  }
  return response;
}

function solvePuzzle(d) {
  // Parse the puzzle description from the "d" query parameter.
  let puzzleMatch = d.match(/\sABCD\sA([<>=-]{4})\sB([<>=-]{4})\sC([<>=-]{4})\sD([<>=-]{4})/);
  if(puzzleMatch) {
    // Build the puzzle constraints from the regex match.
    let [puzzleString, ...constraints] = puzzleMatch;
    constraints = constraints.map(str => str.split(''));

    // There are 24 possible ways to order (permutations) four letters.
    let possibleOrderings = [
      "ABCD", "ABDC", "ACBD", "ACDB", "ADBC", "ADCB",
      "BACD", "BADC", "BCAD", "BCDA", "BDAC", "BDCA",
      "CABD", "CADB", "CBAD", "CBDA", "CDAB", "CDBA",
      "DABC", "DACB", "DBAC", "DBCA", "DCAB", "DCBA"];
    
    // Brute force method, check each of the 24 possible solutions.
    for(let i = 0; i < possibleOrderings.length; i++) {
      let possibleSolution = solutionFromOrdering(possibleOrderings[i]);

      // A solution that is consistent with the puzzle constraints is correct.
      if(solutionsAreConsitent(constraints, possibleSolution)) {
        let s = possibleSolution;
        return ` ABCD\nA${s[0].join('')}\nB${s[1].join('')}\nC${s[2].join('')}\nD${s[3].join('')}`;
      }
    }
  } else {
    return "couldn't parse puzzle";
  }
}

// This function must take a string of length of 4 with exactly one 'A', 'B', 'C', and 'D' each.
// It uses the ordered letters to generate the corresponding solution to the puzzle.
function solutionFromOrdering(abcdStr) {
  // Setup the order array.
  let letterAsNumber = {A: 0, B: 1, C: 2, D: 3};
  let sequencePosition = [undefined, undefined, undefined, undefined];
  for(let i = 0; i < 4; i++) {
    sequencePosition[letterAsNumber[abcdStr[i]]] = i;
  }

  // Build the solution.
  let solution = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']];
  for(let row = 0; row < 4; row++) {
    for(let col = 0; col < 4; col++) {
      // Use the ordering to determine the correct character to use.
      let char = '';
      if(sequencePosition[row] < sequencePosition[col]) {
        char = '<';
      } else if(sequencePosition[row] > sequencePosition[col]) {
        char = '>';
      } else {
        char = '=';
      }
      solution[row][col] = char;
    }
  }

  return solution;
}

// Check if two potentially partial solutions (with the blank char) are
// consistent. This is done by making sure both solutions use the same
// character whenever both of them don't have a blank '-' char in the
// same position, that is they are both either a '<', '>', or '=' char.
function solutionsAreConsitent(leftSolution, rightSolution) {
  let areConsistent = true;
  for(let row = 0; row < 4 && areConsistent; row++) {
    for(let col = 0; col < 4 && areConsistent; col++) {
      let leftChar = leftSolution[row][col];
      let rightChar = rightSolution[row][col];

      // If neither solution has a '-' char at the position,
      // then both solutions must use the same character.
      if(leftChar !== '-' && rightChar !== '-') {
        areConsistent = leftChar === rightChar;
      }
    }
  }
  return areConsistent;
}