import React, { PureComponent } from "react";
import { mysql } from "generate-schema";
import Layout from "../components/Layout";
import PoweredBy from "../components/PoweredBy";
import ConversionPanel from "../components/ConversionPanel";
import defaultText from "../utils/dummy-json";

export default class Json2Ts extends PureComponent {
  getTransformedValue = newValue => {
    const value = JSON.parse(newValue);
    return mysql(value);
  };

  render() {
    return (
      <Layout pathname={this.props.url.pathname}>
        <ConversionPanel
          leftTitle="JSON"
          rightTitle="MySQL Table Schema"
          getTransformedValue={this.getTransformedValue}
          name={"mysql"}
          defaultText={defaultText}
          leftMode="json"
          rightMode="mysql"
          url={this.props.url}
          prettifyRightPanel={false}
        />
        <PoweredBy pathname={this.props.url.pathname} />
      </Layout>
    );
  }
}
