import React, { Component } from "react";
import Footer from "../../../components/Footer";
import {
	Container,
	Button,
	Checkbox,
	Form,
	Input,
	Icon,
	Header,
	Select,
	Image,
	Message
} from "semantic-ui-react";
import CSSLink from "../../../components/CSSLink";
import HeaderHome from "../../../components/HeaderHome";
import HeaderWelcome from "../../../components/HeaderWelcome";
import PatientWallet from "../../../ethereum/patientWallet";
import patientWalletFactory from "../../../ethereum/patientWalletFactory";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class ProviderLogin extends Component {
	state = {																																																																																																																																																																																																																																																																																																																																																										
		patientAddress: "",
		walletAddress: "",
		loading: false,
		errorMessage: ""
	};

	onSubmit = async event => {
		event.preventDefault();
		let walletAddressFactory = "";
		this.setState({ loading: true, errorMessage: "" });
		try {
			const accounts = await web3.eth.getAccounts();
			const walletAddressFromFactory = await patientWalletFactory.methods
				.deployedPatientWalletAddress(this.state.patientAddress)
				.call()
				.then(function(value) {
					walletAddressFactory = value;
				});

			console.log("From contract", walletAddressFactory);
			console.log("Input", this.state.walletAddress);
			if (
				walletAddressFactory == this.state.walletAddress &&
				walletAddressFactory != "0x0000000000000000000000000000000000000000"
			) {
				const patientWallet = PatientWallet(walletAddressFromFactory);
				console.log("Good");
				
				Router.pushRoute(`/wallet/provider/${walletAddressFactory}`);
			} else {
				this.setState({ errorMessage: "Not available address!" });
			}
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	};

	render() {
		return (
			<Container fluid>
				<CSSLink />
				<HeaderWelcome />
				<Container>
					<Header
						as="h2"
						textAlign="center"
						style={{ marginTop: "40px" }}
						icon
					>
						<Icon name="user md" circular />
						<Header.Content>Welcome Doctor! Fill this Form please:</Header.Content>
					</Header>
					<Form
						size="huge"
						style={{
							marginTop: "40px",
							marginBottom: "40px"
						}}
						onSubmit={this.onSubmit}
						error={!!this.state.errorMessage}
					>
						<Form.Field width={16} required>
							<label>Patient Address</label>
							<Input
								value={this.state.patientAddress}
								onChange={event =>
									this.setState({
										patientAddress: event.target.value
									})
								}
							/>
						</Form.Field>

						<Form.Field width={16} required>
							<label>Wallet Address</label>
							<Input
								value={this.state.walletAddress}
								onChange={event =>
									this.setState({
										walletAddress: event.target.value
									})
								}
							/>
						</Form.Field>

						<Message
							error
							header="Oops!"
							content={this.state.errorMessage}
						/>
						<Button
							type="submit"
							fluid
							circular
							positive
							size="huge"
							style={{ marginTop: "40px" }}
							loading={this.state.loading}
						>
							Next!
						</Button>
					</Form>
				</Container>
				<Footer />
			</Container>
		);
	}
}

export default ProviderLogin;
