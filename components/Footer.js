import React, { Component } from "react";
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

class Footer extends Component {
  render() {
    return (
      <Container>
        <Grid divided stackable attached="bottom">
          <Grid.Row style={{ marginTop: "20px" }}>
            <Grid.Column width={3}>
              <Header as="h4">
                <Icon name="question circle" />
                <Header.Content>About</Header.Content>
              </Header>
              <List link>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Terms of Use</List.Item>
                <List.Item as="a">Privacy Policy</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as="h4">
              <Icon name="google wallet" />
                <Header.Content>Patient Wallet</Header.Content>
              </Header>
              <p>
                It's our body, our data. Aggregate, organize and share your
                medical records
              </p>

              <Button circular color="facebook" icon="facebook" />
              <Button circular color="twitter" icon="twitter" />
              <Button circular color="linkedin" icon="linkedin" />
              <Button circular color="google plus" icon="google plus" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Footer;
