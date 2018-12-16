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
  Visibility
} from "semantic-ui-react";
import Head from "next/head";
import DesktopContainer from "../components/DesktopContainer";
import { Link } from "../routes";
import CSSLink from "../components/CSSLink";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

const HomepageLayout = () => (
  <DesktopContainer>
    <CSSLink />
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container style={{ marigTop: "15px" }}>
        <Grid.Row>
          <Grid.Column width={5}>
            <Image
              src="../static/download.svg"
              circular
              style={{ marginLeft: "70px" }}
            />
            <Header as="h3" style={{ fontSize: "2em" }}>
              Download and Organize Medical Records
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Download health data from various sources, including wearables,
              lab reports, and doctor and hospital visits.
            </p>
          </Grid.Column>
          <Grid.Column width={5}>
            <Image
              src="../static/secure.svg"
              circular
              style={{ marginLeft: "70px" }}
            />
            <Header as="h3" style={{ fontSize: "2em" }}>
              Secure my Data
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              My health data is secure and private. Patient Wallet does not
              share my data with anyone. Period. I have complete control over
              who gets to see what part of my data.
            </p>
          </Grid.Column>
          <Grid.Column width={5}>
            <Image
              src="../static/share.svg"
              circular
              style={{ marginLeft: "70px" }}
            />
            <Header as="h3" style={{ fontSize: "2em" }}>
              Share Healthcare Data
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Share healthcare records with physicians, personal trainer, or for
              research. Provide access to my data on my terms and get OmPoints
              for sharing data.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Read more!</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container text>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <a href="#">How can Patient Wallet help me?</a>
        </Divider>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Patient Wallet allows me to:
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          take control of my wellness & medical records at the touch of a
          finger. Connect with Hospitals and Doctors' Offices and download your
          data. Never pay for transferring your records from one provider to
          another. Complete privacy and security. Connect to my favorite
          devices, apps, and with healthcare providers.
        </p>
      </Container>
    </Segment>
  </DesktopContainer>
);
export default HomepageLayout;
