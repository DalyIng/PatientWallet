import React, { Component } from "react";
import { Link, Router } from "../../../routes";
import Footer from "../../../components/Footer";
import CSSLink from "../../../components/CSSLink";
import HeaderWelcome from "../../../components/HeaderWelcome";
import {
	Message,
	Select,
	Input,
	Form,
	Container,
	Header,
	Button,
	Icon,
	Image
} from "semantic-ui-react";
import ipfs from "../../../ipfs";
import bitly from "../../../bitly";
import PatientWallet from "../../../ethereum/patientWallet";
import web3 from "../../../ethereum/web3";
import delay from "delay";

const documentTypes = [
	{ key: "photo", text: "IMAGE", value: "Photo Scan" },
	{ key: "pdf", text: "PDF", value: "PDF file" }
];

class MedicalRecordsNew extends Component {
	state = {
		labName: "",
		adderss: "",
		illness: "",
		documentType: "",
		ipfsHash: "",
		buffer: "",
		bitlyLink: "",
		loading: false,
		errorMessage: ""
	};

	static async getInitialProps(props) {
		const { addressPromise } = props.query;

		return { addressPromise };
	}

	captureFile = event => {
		event.stopPropagation();
		event.preventDefault();
		const file = event.target.files[0];
		let reader = new window.FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => this.convertToBuffer(reader);
		console.log("Captured!!");
	};

	convertToBuffer = async reader => {
		let url = "";
		const buffer = await Buffer.from(reader.result);
		this.setState({ buffer });
		await ipfs.add(this.state.buffer, (err, ipfsHash) => {
			console.log(err, ipfsHash);
			this.setState({ ipfsHash: ipfsHash[0].hash });
		});
		this.setState({ loading: true});
		await delay(12000);
		await bitly
			.shorten(`https://ipfs.io/ipfs/${this.state.ipfsHash}`)
			.then(function(response) {
				console.log(response.url);
				url = response.url;
			})
			.catch(function(error) {
				console.log(error);
			});
		console.log(url);
		this.setState({ bitlyLink: url });
		console.log(this.state.bitlyLink);
		this.setState({ loading: false});
	};

	onPush = (event, data) => {
		this.setState({ documentType: data.value });
	};

	onSubmit = async event => {
		event.preventDefault();
		const patientWallet = PatientWallet(this.props.addressPromise);
		const {
			labName,
			adderss,
			illness,
			documentType,
			ipfsHash,
			bitlyLink
		} = this.state;
		this.setState({ loading: true, errorMessage: "" });
		try {
			const accounts = await web3.eth.getAccounts();
			await patientWallet.methods
				.createMedicalRecord(
					labName,
					adderss,
					illness,
					documentType,
					ipfsHash,
					bitlyLink
				)
				.send({ from: accounts[0] });
			Router.pushRoute(
				`/wallet/${this.props.addressPromise}/medicalRecords`
			);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	};

	render() {
		return (
			<Container fluid>
				<CSSLink />
				<HeaderWelcome addressPromise={this.props.addressPromise} />
				<Container>
					<Header
						as="h2"
						textAlign="center"
						style={{ marginTop: "30px", marginBottom: "30px" }}
						icon
					>
						<Icon name="file text" circular />
						<Header.Content>
							Fill this form to add new Medical Record:
						</Header.Content>
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
							<label>Lab/Doctor Name</label>
							<Input
								placeholder="Lab/Doctor Name"
								value={this.state.labName}
								onChange={event =>
									this.setState({
										labName: event.target.value
									})
								}
								iconPosition="left"
							>
								<Icon name="doctor" />
								<input />
							</Input>
						</Form.Field>

						<Form.Field width={16} required>
							<label>Lab/Doctor Address</label>
							<Input
								placeholder="Lab/Doctor Address"
								value={this.state.adderss}
								onChange={event =>
									this.setState({
										adderss: event.target.value
									})
								}
								iconPosition="left"
							>
								<Icon name="ethereum" />
								<input />
							</Input>
						</Form.Field>
						<Form.Field required width={16}>
							<label>Illness</label>
							<Input
								placeholder="Illness"
								value={this.state.illness}
								onChange={event =>
									this.setState({
										illness: event.target.value
									})
								}
								iconPosition="left"
							>
								<Icon name="ambulance" />
								<input />
							</Input>
						</Form.Field>

						<Form.Field width={16} required>
							<label>Medical Record Type</label>
							<Select
								placeholder="Document Type"
								value={this.state.documentType}
								onChange={this.onPush}
								options={documentTypes}
							/>
						</Form.Field>

						<Form.Field style={{ marginTop: "40px" }}>
							<div className="ui middle aligned center aligned grid container">
								<div className="ui fluid segment">
									<input
										type="file"
										onChange={this.captureFile}
										className="inputfile"
										id="embedpollfileinput"
										style={{ display: "none" }}
									/>

									<label
										htmlFor="embedpollfileinput"
										className="ui huge red right floated button"
									>
										<i className="ui upload icon" />
										Upload File
									</label>
								</div>
							</div>
						</Form.Field>

						<Form.Field width={16} required>
							<label>IPFS Hash</label>
							<Input
								placeholder="IPFS Hash"
								value={this.state.ipfsHash}
								onChange={event =>
									this.setState({
										ipfsHash: event.target.value
									})
								}
								disabled
								iconPosition="left"
							>
								<Icon name="slack hash" />
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
							positive
							circular
							size="huge"
							style={{ marginTop: "40px", marginBottom: "40px" }}
							loading={this.state.loading}
						>
							Submit
						</Button>
					</Form>
				</Container>
				<Footer />
			</Container>
		);
	}
}

export default MedicalRecordsNew;
