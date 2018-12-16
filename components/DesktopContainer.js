import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Confirm,
  Label
} from "semantic-ui-react";
import Footer from "./Footer";
import { Link } from "../routes";
import Router from "next/router";
import NProgress from "next-nprogress";
import NProgressStyles from "next-nprogress/styles";
import HeaderHome from "./HeaderHome";

/*Router.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();*/

class DesktopContainer extends Component {
  static async getInitialProps(props) {
    const { children } = props.query;

    return { children };
  }

  state = {
    open: false
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  show = () => this.setState({ open: true });
  handleConfirm = () => this.setState({ open: false });
  handleCancel = () => this.setState({ open: false });
  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NProgressStyles spinner={false} />
        <HeaderHome />
        <Image
          src="../static/medicalRecords.jpg"
          fluid
          style={{ marginTop: "1px" }}
        />
        
        {children}
        <Footer />
      </Responsive>
    );
  }
}

export default DesktopContainer;
