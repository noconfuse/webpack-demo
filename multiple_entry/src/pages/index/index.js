import React from "react";
import ReactDOM from "react-dom";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>我的index页面</h2>
      </div>
    );
  }
}
ReactDOM.render(<Index />, document.getElementById("root"));
