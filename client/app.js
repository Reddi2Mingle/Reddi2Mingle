import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Reddi to Mingle</h1>
        On the page, yeah baby!
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));