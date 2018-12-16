import React, { Component } from "react";
import { Link } from "../../routes";
import Footer from "../../components/Footer";
import CSSLink from "../../components/CSSLink";
import HeaderWelcome from "../../components/HeaderWelcome";
import PatientWallet from "../../ethereum/patientWallet";
import web3 from "../../ethereum/web3";
import {
	Container,
	Header,
	Button,
	Icon,
	Image,
	Grid,
	Card,
	Divider
} from "semantic-ui-react";

class Profile extends Component {
	static async getInitialProps(props) {
		console.log(props.query.addressPromise);
		const accounts = await web3.eth.getAccounts();
		const patientWallet = PatientWallet(props.query.addressPromise);
		const summary = await patientWallet.methods.patient().call();
		console.log(summary);

		return {
			addressPromise: props.query.addressPromise,
			name: summary[0],
			birthDate: summary[1],
			bloodGroup: summary[2],
			weight: summary[3],
			address: summary[4],
			mail: summary[5],
			ethAdress: summary[6]
		};
	}
	renderCards() {
		const {
			address,
			name,
			birthDate,
			bloodGroup,
			weight,
			mail,
			ethAdress,
			addressPromise
		} = this.props;

		const items = [
			{
				header: name,
				meta: "Full name of Patient",
				description: "Owner Of Wallet"
			},
			{
				header: birthDate,
				meta: "Birth Date of the owner",
				description: "......."
			},
			{
				header: address,
				meta: "Address of the owner",
				description: "......."
			},
			{
				header: bloodGroup,
				meta: "bloodGroup of the owner",
				description: "........"
			},
			{
				header: weight,
				meta: "weight of the owner",
				description: "........"
			},
			{
				header: mail,
				meta: "mail of the owner",
				description: "........"
			},
			{
				header: ethAdress,
				meta: "Ethereum Adress of the owner",
				description: "........",
				style: { overflowWrap: "break-word" }
			},
			{
				header: addressPromise,
				meta: "Wallet Adress",
				description: "........",
				style: { overflowWrap: "break-word" }
			}
		];

		return <Card.Group items={items} itemsPerRow={1} color="blue" />;
	}

	render() {
		return (
			<Container fluid>
				<CSSLink />
				<HeaderWelcome addressPromise={this.props.addressPromise} />
				<Divider
					as="h4"
					className="header"
					horizontal
					style={{ margin: "3em 0em", textTransform: "uppercase", marginTop: "30px" }}
				>
					<a href="#">Profile Details</a>
				</Divider>
				<Grid container>
					<Grid.Row style={{ marginTop: "30px" }}>
						<Grid.Column width={16}>
							{this.renderCards()}
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Footer />
			</Container>
		);
	}
}

export default Profile;
