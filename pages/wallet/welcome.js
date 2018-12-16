import React, { Component } from "react";
import { Link } from "../../routes";
import Footer from "../../components/Footer";
import CSSLink from "../../components/CSSLink";
import HeaderWelcome from "../../components/HeaderWelcome";
import {
	Container,
	Header,
	Button,
	Icon,
	Image,
	Grid
} from "semantic-ui-react";

class WalletIndex extends Component {
	static async getInitialProps(props) {
		console.log(props.query.addressPromise);

		return { addressPromise: props.query.addressPromise };
	}

	render() {
		return (
			<Container fluid>
				<CSSLink />
				<HeaderWelcome addressPromise={this.props.addressPromise} />

				<Image
					src="../static/healthcare.jpg"
					fluid
					style={{ marginTop: "1px", marginBottom: "50px" }}
				/>
				<Grid
					container
					style={{ marigTop: "50px", marginBottom: "50px" }}
				>
					<Grid.Row>
						<Grid.Column width={8}>
							<Image
								src="../static/share.svg"
								circular
								style={{ marginLeft: "210px" }}
							/>
							<Link
								route={`/wallet/${
									this.props.addressPromise
								}/profile`}
							>
								<a>
									<Button
										circular
										animated="fade"
										fluid
										color="facebook"
										size="huge"
										style={{ marginTop: "40px" }}
									>
										<Button.Content visible>
											Profile!
										</Button.Content>
										<Button.Content hidden>
											Check your informations!
										</Button.Content>
									</Button>
								</a>
							</Link>
						</Grid.Column>
						<Grid.Column width={8}>
							<Image
								src="../static/download.svg"
								circular
								style={{ marginLeft: "210px" }}
							/>
							<Link
								route={`/wallet/${
									this.props.addressPromise
								}/profile`}
							>
								<a>
									<Button
										circular
										animated="fade"
										fluid
										color="facebook"
										size="huge"
										style={{ marginTop: "40px" }}
									>
										<Button.Content visible>
											Add Doctor
										</Button.Content>
										<Button.Content hidden>
											List All your Drs
										</Button.Content>
									</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={5}>
							<Image
								src="../static/download.svg"
								circular
								style={{ marginLeft: "100px" }}
							/>

							<Link
								route={`/wallet/${
									this.props.addressPromise
								}/medicalRecords`}
							>
								<a>
									<Button
										circular
										animated="fade"
										fluid
										primary
										size="huge"
										style={{ marginTop: "40px" }}
									>
										<Button.Content visible>
											Medical Records
										</Button.Content>
										<Button.Content hidden>
											List All your M.R
										</Button.Content>
									</Button>
								</a>
							</Link>
						</Grid.Column>
						<Grid.Column width={5}>
							<Image
								src="../static/secure.svg"
								circular
								style={{ marginLeft: "100px" }}
							/>
							<Link
								route={`/wallet/${
									this.props.addressPromise
								}/medicalRecords`}
							>
								<a>
									<Button
										circular
										animated="fade"
										fluid
										primary
										size="huge"
										style={{ marginTop: "40px" }}
									>
										<Button.Content visible>
											Prescriptions
										</Button.Content>
										<Button.Content hidden>
											List All your Prescriptions
										</Button.Content>
									</Button>
								</a>
							</Link>
						</Grid.Column>
						<Grid.Column width={5}>
							<Image
								src="../static/share.svg"
								circular
								style={{ marginLeft: "100px" }}
							/>
							<Link
								route={`/wallet/${
									this.props.addressPromise
								}/profile`}
							>
								<a>
									<Button
										circular
										animated="fade"
										fluid
										primary
										size="huge"
										style={{ marginTop: "40px" }}
									>
										<Button.Content visible>
											Ether Wallet
										</Button.Content>
										<Button.Content hidden>
											Pay From Here
										</Button.Content>
									</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Footer />
			</Container>
		);
	}
}

export default WalletIndex;
