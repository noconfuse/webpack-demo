import styles from "./index.less";
import React from "react";
import logo from "images/2.jpeg";
class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //使用es6新的api
    let delay = time =>
      new Promise(resolve =>
        setTimeout(() => {
          resolve("success");
        }, time)
      );
    delay(1000).then(result => {
      console.log(result);
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className="title">hi 我是首页</h1>
        <div className={styles.authorBox}>
          <div className={styles.avator}>
            <img src={logo} />
          </div>
        </div>
      </div>
    );
  }
}
export default Index;
