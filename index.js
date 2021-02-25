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
    case "ping":
    default:
      response = "OK";
      break;
  }
  return response;
}

function solvePuzzle(d) {
  let puzzleMatch = d.match(/\sABCD\sA([<>=-]{4})\sB([<>=-]{4})\sC([<>=-]{4})\sD([<>=-]{4})/);
  if(puzzleMatch) {
    let [puzzleString, ...constraints] = puzzleMatch;
    constraints = solution.map(str => str.split(''));
    let possibleOrderings = [
      "ABCD", "ABDC", "ACBD", "ACDB", "ADBC", "ADCB",
      "BACD", "BADC", "BCAD", "BCDA", "BDAC", "BDCA",
      "CABD", "CADB", "CBAD", "CBDA", "CDAB", "CDBA",
      "DABC", "DACB", "DBAC", "DBCA", "DCAB", "DCBA"];
    
    for(let i = 0; i < possibleOrderings.length; i++) {
      let possibleOrdering = possibleOrderings[i];
      let possibleSolution = solutionFromOrdering(possibleOrdering);
      if(solutionsAreConsitent(constraints, possibleSolution)) {
        let s = possibleSolution;
        return ` ABCD\nA${s[0].join('')}\nB${s[1].join('')}\nC${s[2].join('')}\nD${s[3].join('')}`;
      }
    }
  } else {
    return "couldn't parse puzzle";
  }
}

// this function must take a string of length four with exactly one 'A', 'B', 'C', and 'D' each.
function solutionFromOrdering(abcdStr) {
  // setup the order array
  let indices = {A: 0, B: 1, C: 2, D: 3};
  let order = [undefined, undefined, undefined, undefined];
  for(let i = 0; i < 4; i++) {
    order[indices[abcdStr[i]]] = i;
  }

  // build the solution
  let solution = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']];
  for(let row = 0; row < 4; row++) {
    for(let col = 0; col < 4; col++) {
      let char = '';
      if(order[row] < order[col]) {
        char = '<';
      } else if(order[row] > order[col]) {
        char = '>';
      } else {
        char = '=';
      }
      solution[row][col] = char;
    }
  }

  return solution;
}

function solutionsAreConsitent(leftSol, rightSol) {
  let areConsistent = true;
  for(let row = 0; row < 4 && areConsistent; row++) {
    for(let col = 0; col < 4 && areConsistent; col++) {
      let leftChar = leftSol[row][col];
      let rightChar = rightSol[row][col];
      if(leftChar !== '-' && rightChar !== '-') {
        areConsistent = leftChar === rightChar;
      }
    }
  }
  return areConsistent;
}