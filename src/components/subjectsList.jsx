import React, { Component } from "react";
import "./styles.css";

class SubjectsList extends Component {
  state = {};

  renderSubjectsTableData() {
    let testString = "string";
    return this.props.subjects.map((subject) => {
      const { periodID } = subject;
      return (
        <tr key={periodID}>
          <td>
            <span className="badge badge-info">{periodID}</span>
          </td>
          <td>
            <input
              id={periodID}
              type="text"
              size="10"
              maxlength="5"
              className="m-2"
            ></input>
          </td>
          <td>
            <input id={periodID + 100} type="checkbox"></input>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-warning m-2 btn-sm"
          onClick={() => this.props.onReset()}
        >
          Reset
        </button>
        <p>
          Enter a capital letter grade (+ or - sign optional) or your grade
          percentage (anywhere from 0 to 150, without the percentage sign)
        </p>
        <table>
          <tbody>
            <tr>
              <th>Period</th>
              <th>Grade</th>
              <th>Weighted</th>
            </tr>
            {this.renderSubjectsTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SubjectsList;
