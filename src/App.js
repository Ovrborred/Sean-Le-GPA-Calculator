import "./App.css";
import React, { Component } from "react";
import SubjectsList from "./components/subjectsList";
import CalculateGPA from "./components/calculateGPA";

class App extends Component {
  state = {
    subjects: [
      { periodID: 1 },
      { periodID: 2 },
      { periodID: 3 },
      { periodID: 4 },
      { periodID: 5 },
      { periodID: 6 },
    ],
    GPAs: { unweightedGPA: 0, weightedGPA: 0 },
    responseValid: true,
  };

  calculateGPA = () => {
    console.log("New GPA calculation started");
    this.setState({ responseValid: true });
    let unweightedGPA = 0;
    let weightedGPA = 0;
    let wereAllResponsesValid = true;
    const numOfSubjects = this.state.subjects.length;
    for (let i = 0; i < numOfSubjects; i++) {
      let currentGPA = document.getElementById(this.state.subjects[i].periodID)
        .value;
      //checking if there is input in the text box
      if (currentGPA.length !== 0) {
        let pointAssigned = this.evaluateGradePoint(currentGPA);
        console.log("Point assigned: " + pointAssigned);
        if (pointAssigned !== -1) {
          let isSubjectWeighted = document.getElementById(
            this.state.subjects[i].periodID + 100
          ).checked;
          unweightedGPA += pointAssigned;
          weightedGPA += pointAssigned;
          if (isSubjectWeighted) {
            weightedGPA += 1;
          }
        }
        //else, the pointAssigned equals -1, so the response wasn't valid
        else {
          wereAllResponsesValid = false;
          break;
        }
      }
    }
    if (wereAllResponsesValid) {
      unweightedGPA /= numOfSubjects;
      weightedGPA /= numOfSubjects;
      console.log(
        "Unweighted GPA before rounding: " +
          unweightedGPA +
          ", weightedGPA before rounding: " +
          weightedGPA
      );
      let roundedGPAs = this.roundGPAs(unweightedGPA, weightedGPA);
      this.setState({
        GPAs: { unweightedGPA: roundedGPAs[0], weightedGPA: roundedGPAs[1] },
      });
    } else {
      this.setState({ responseValid: false });
    }
  };

  evaluateGradePoint(gradeInput) {
    let gradeInputToNum = parseInt(gradeInput);
    if (gradeInputToNum > 150) {
      return -1;
    }
    if (gradeInput === "A+" || gradeInput === "A" || gradeInputToNum >= 92.5) {
      return 4.0;
    } else if (gradeInput === "A-" || gradeInputToNum >= 90) {
      return 3.75;
    } else if (gradeInput === "B+" || gradeInputToNum >= 87.5) {
      return 3.25;
    } else if (gradeInput === "B" || gradeInputToNum >= 82.5) {
      return 3.0;
    } else if (gradeInput === "B-" || gradeInputToNum >= 80) {
      return 2.75;
    } else if (gradeInput === "C+" || gradeInputToNum >= 77.5) {
      return 2.25;
    } else if (gradeInput === "C" || gradeInputToNum >= 72.5) {
      return 2.0;
    } else if (gradeInput === "C-" || gradeInputToNum >= 70) {
      return 1.75;
    } else if (gradeInput === "D+" || gradeInputToNum >= 67.5) {
      return 1.25;
    } else if (gradeInput === "D" || gradeInputToNum >= 62.5) {
      return 1.0;
    } else if (gradeInput === "D-" || gradeInputToNum >= 60) {
      return 0.75;
    } else if (gradeInput === "F" || gradeInputToNum < 60) {
      return 0.0;
    } else {
      //anything else is not a valid input
      return -1;
    }
  }

  roundGPAs(unweightedGPA, weightedGPA) {
    let arrUnweightedGPA = unweightedGPA.toString().split("");
    let arrWeightedGPA = weightedGPA.toString().split("");
    let roundedGPAs = [arrUnweightedGPA, arrWeightedGPA];
    for (let i = 0; i < roundedGPAs.length; i++) {
      let currentGPA = roundedGPAs[i];
      if (currentGPA.length >= 5) {
        //if length is 5 or more, then the number extends past the hundredths place
        let indexOfThousandthsPlace = 4;
        if (currentGPA[indexOfThousandthsPlace] >= 5) {
          console.log(
            "Hundredths place before rounding: " +
              currentGPA[indexOfThousandthsPlace - 1]
          );
          currentGPA[indexOfThousandthsPlace - 1] =
            parseInt(currentGPA[indexOfThousandthsPlace - 1]) + 1; //rounding hundredths place up if the thousandths place is 5 or more
          console.log(
            "Hundredths place after rounding: " +
              currentGPA[indexOfThousandthsPlace - 1]
          );
        }
        roundedGPAs[i] = currentGPA.slice(0, indexOfThousandthsPlace); //keeping only the digits from beginning to the hundredths place
      }
    }
    console.log(
      "Rounded unweighted GPA: " +
        roundedGPAs[0] +
        " , rounded weighted GPA: " +
        roundedGPAs[1]
    );
    return roundedGPAs;
  }

  handleReset = () => {
    for (let i = 1; i <= this.state.subjects.length; i++) {
      document.getElementById(i).value = "";
      document.getElementById(i + 100).checked = false;
    }
    this.setState({ GPAs: { unweightedGPA: 0, weightedGPA: 0 } });
  };

  render() {
    return (
      <React.Fragment>
        <SubjectsList
          subjects={this.state.subjects}
          onReset={this.handleReset}
        ></SubjectsList>
        <CalculateGPA
          onCalculate={this.calculateGPA}
          unweightedGPA={this.state.GPAs.unweightedGPA}
          weightedGPA={this.state.GPAs.weightedGPA}
        ></CalculateGPA>
        <p>{this.state.responseValid ? "" : "Your response was not valid!"}</p>
      </React.Fragment>
    );
  }
}
export default App;
