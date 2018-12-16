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
import patientWalletFactory from "../../ethereum/patientWalletFactory";
import PatientWallet from "../../ethereum/patientWallet";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

//GENDER NOT IMLEMENTED YET

const gender = [
	{ key: "m", text: "Male", value: "male" },
	{ key: "f", text: "Female", value: "female" }
];

const bloodgroop = [
	{ key: "o+", text: "O-positive", value: "O-positive" },
	{ key: "o-", text: "O-negative", value: "O-negative" },
	{ key: "a+", text: "A-positive", value: "A-positive" },
	{ key: "a-", text: "A-negative", value: "A-negative" },
	{ key: "b+", text: "B-positive", value: "B-positive" },
	{ key: "b-", text: "B-negative", value: "B-negative" },
	{ key: "ab-", text: "AB-negative", value: "AB-negative" }
];

class SignUp extends Component {
	state = {
		name: "",
		birthdate: "",
		bloodgroup: null,
		weight: "",
		adderss: "",
		mail: "",
		password: "",
		loading: false,
		errorMessage: ""
	};

	onSubmit = async event => {
		event.preventDefault();
		this.setState({ loading: true, errorMessage: "" });
		try {
			const accounts = await web3.eth.getAccounts();
			await patientWalletFactory.methods
				.createPatientWallet(
					this.state.name,
					this.state.birthdate,
					this.state.bloodgroup,
					this.state.weight,
					this.state.adderss,
					this.state.mail,
					this.state.password
				)
				.send({
					from: accounts[0]
				});
			const WalletAddress = await patientWalletFactory.methods
				.deployedPatientWalletAddress(accounts[0])
				.call();
			const patientWallet = PatientWallet(WalletAddress);
			await patientWallet.methods.setWalletAddress(WalletAddress).send({
				from: accounts[0]
			});
			console.log(WalletAddress);
			Router.pushRoute(`/wallet/${WalletAddress}`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	};

	onPush = (event, data) => {
		this.setState({ bloodgroup: data.value });
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
						<Header.Content>Patient Registration:</Header.Content>
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
						<Form.Field required width={16}>
							<label>First & Last name</label>
							<Input
								placeholder="Full Name"
								value={this.state.name}
								onChange={event =>
									this.setState({ name: event.target.value })
								}
								iconPosition="left"
							>
								<Icon name="user circle" />
								<input />
							</Input>
						</Form.Field>

						<Form.Group widths="equal">
							<Form.Field
								required
								control={Input}
								label="Birth Date"
								placeholder="Birth Date"
								type="date"
								value={this.state.birthdate}
								onChange={event =>
									this.setState({
										birthdate: event.target.value
									})
								}
							/>

							<Form.Field required>
								<label>Blood Group</label>
								<Select
									placeholder="Blood Group"
									value={this.state.bloodgroup}
									onChange={this.onPush}
									options={bloodgroop}
								/>
							</Form.Field>

							<Form.Field required>
								<label>Weight</label>
								<Input
									placeholder="Weight"
									type="number"
									value={this.state.weight}
									onChange={event =>
										this.setState({
											weight: event.target.value
										})
									}
									iconPosition="left"
								>
									<Icon name="weight" />
									<input />
								</Input>
							</Form.Field>
						</Form.Group>

						<Form.Field width={16} required>
							<label>Address</label>
							<Input
								value={this.state.adderss}
								onChange={event =>
									this.setState({
										adderss: event.target.value
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
							circular
							color="facebook"
							size="huge"
							style={{ marginTop: "40px" }}
							loading={this.state.loading}
						>
							Sign Up!
						</Button>
					</Form>
				</Container>
				<Footer />
			</Container>
		);
	}
}

export default SignUp;
