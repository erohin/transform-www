import React, { PureComponent } from "react";
import Layout from "../components/Layout";
import defaultText from "../utils/dummy-json";
import merge from "lodash/merge";
import loadWorker from "../utils/loadWorker";

import ConversionPanel from "../components/ConversionPanel";

export default class Main extends PureComponent {
  state = {
    isImmutable: false
  };

  getTransformedValue = newValue => {
    let code = JSON.parse(newValue);
    if (typeof code !== "object" || Array.isArray(code)) {
      code = merge({}, ...code);
    }
    code = "const propTypes = " + JSON.stringify(code);
    this.promiseWorker = loadWorker("json-to-proptypes.js", this).promiseWorker;
    return this.promiseWorker.postMessage({
      isImmutable: this.state.isImmutable,
      code
    });
  };

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful");
        })
        .catch(err => {
          console.warn("service worker registration failed");
        });
    }
  }

  render() {
    return (
      <Layout pathname={this.props.url.pathname}>
        <ConversionPanel
          leftTitle="JSON"
          rightTitle="PropTypes"
          leftMode="json"
          getTransformedValue={this.getTransformedValue}
          name={"prop_types"}
          defaultText={defaultText}
          onCheckboxChange={(checked, cb) =>
            this.setState({ isImmutable: checked }, cb)
          }
          checkboxText="Immutable Proptypes"
        />
      </Layout>
    );
  }
}
