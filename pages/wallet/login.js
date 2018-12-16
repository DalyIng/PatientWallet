import React, { Component } from "react";
import Footer from "../../components/Footer";
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
import CSSLink from "../../components/CSSLink";
import HeaderHome from "../../components/HeaderHome";
import PatientWallet from "../../ethereum/patientWallet";
import patientWalletFactory from "../../ethereum/patientWalletFactory";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

class Login extends Component {
	state = {																																																																																																																																																																																																																																																																																																																																																										
		address: "",
		mail: "",
		password: "",
		loading: false,
		errorMessage: ""
	};

	onSubmit = async event => {
		event.preventDefault();
		let addressPromise = "";
		this.setState({ loading: true, errorMessage: "" });
		try {
			const accounts = await web3.eth.getAccounts();
			const addressFromFactory = await patientWalletFactory.methods
				.deployedPatientWalletAddress(accounts[0])
				.call()
				.then(function(value) {
					addressPromise = value;
				});

			console.log("From contract", addressPromise);
			console.log("Input", this.state.address);
			if (
				addressPromise == this.state.address &&
				addressPromise != "0x0000000000000000000000000000000000000000"
			) {
				const patientWallet = PatientWallet(addressFromFactory);
				console.log("Good");
				Router.pushRoute(`/wallet/${addressPromise}`);
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
				<HeaderHome />
				<Container>
					<Header
						as="h2"
						textAlign="center"
						style={{ marginTop: "40px" }}
						icon
					>
						<Icon name="user" circular />
						<Header.Content>Welcome! Fill this Form please:</Header.Content>
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
							<label>Wallet Address</label>
							<Input
								value={this.state.address}
								onChange={event =>
									this.setState({
										address: event.target.value
									})
								}
								iconPosition="left"
							>
							<Icon name="address card" />
							<input />
							</Input>
						</Form.Field>

						<Form.Field required width={16}>
							<label>Email</label>
							<Input
								placeholder="Email"
								iconPosition="left"
								type="email"
								value={this.state.mail}
								onChange={event =>
									this.setState({ mail: event.target.value })
								}
							>
								<Icon name="at" />
								<input />
							</Input>
						</Form.Field>
						<Form.Field required width={16}>
							<label>Password</label>
							<Input
								placeholder="Password"
								type="password"
								value={this.state.password}
								onChange={event =>
									this.setState({
										password: event.target.value
									})
								}
								iconPosition="left"
							>
							<Icon name="lock" />
							<input />
							</Input>
						</Form.Field>
						<Message
							error
							header="Oops!"
							content={this.state.errorMessage}
						/>
						<Button
							type="submit"
							fluid
							color="facebook"
							circular
							size="huge"
							style={{ marginTop: "40px" }}
							loading={this.state.loading}
						>
							Log in!
						</Button>
					</Form>
				</Container>
				<Footer />
			</Container>
		);
	}
}

export default Login;
