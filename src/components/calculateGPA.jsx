import React, { Component } from "react";

class CalculateGPA extends Component {
  state = {};
  render() {
    return (
      <div>
        <button
          className="btn btn-outline-success m-2"
          onClick={() => this.props.onCalculate()}
        >
          Calculate GPA
        </button>
        <p>Unweighted GPA: {this.props.unweightedGPA}</p>
        <p>Weighted GPA: {this.props.weightedGPA}</p>
      </div>
    );
  }
}

export default CalculateGPA;
