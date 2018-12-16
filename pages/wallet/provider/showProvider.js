import React, { Component } from "react";
import { Link } from "../../../routes";
import Footer from "../../../components/Footer";
import CSSLink from "../../../components/CSSLink";
import HeaderWelcome from "../../../components/HeaderWelcome";
import {
	Container,
	Header,
	Button,
	Icon,
	Image,
	Table
} from "semantic-ui-react";
import ipfs from "../../../ipfs";
import PatientWallet from "../../../ethereum/patientWallet";
import web3 from "../../../ethereum/web3";
import MedRecordRow from "../../../components/MedRecordRow";

class MedicalRecordsShow extends Component {
	static async getInitialProps(props) {
		const accounts = await web3.eth.getAccounts();
		const { walletAddressFactory } = props.query;
		const patientWallet = PatientWallet(walletAddressFactory);
		const medRecordsCount = await patientWallet.methods
			.getMedRecordsCount()
			.call();
		const medRecords = await Promise.all(
			Array(parseInt(medRecordsCount))
				.fill()
				.map((element, index) => {
					return patientWallet.methods.medRecords(index).call();
				})
		);

		//console.log(medRecords);
		console.log(accounts[0]);
		return { walletAddressFactory, medRecords, medRecordsCount, accounts };
	}

	renderRows() {
		//console.log(this.props.medRecords);
		//console.log(this.props.accounts[0]);
		return this.props.medRecords.map((medRecord, index) => {
			if (medRecord.labAddress == this.props.accounts[0]) {
				return (
					<MedRecordRow
						key={index}
						id={index}
						medRecord={medRecord}
						walletAddressFactory={this.props.walletAddressFactory}
					/>
				);
			}
		});
	}

	render() {
		const { Header, Row, HeaderCell, Body } = Table;

		return (
			<Container fluid>
				<CSSLink />
				<HeaderWelcome />
				<Image
					src="../../../static/healthcare.jpg"
					fluid
					style={{ marginTop: "1px", marginBottom: "30px" }}
				/>
				<Container fluid>
					<Table stackable columns={8} compact="very" size="small">
						<Header>
							<Row>
								<HeaderCell>ID</HeaderCell>
								<HeaderCell>Lab/Doctor Name</HeaderCell>
								<HeaderCell>Lab/Doctor Address</HeaderCell>
								<HeaderCell>Illness</HeaderCell>
								<HeaderCell>Document Type</HeaderCell>
								<HeaderCell>Date</HeaderCell>
								<HeaderCell>Ipfs Hash</HeaderCell>
								<HeaderCell>Bitly Link</HeaderCell>
							</Row>
						</Header>
						<Body>{this.renderRows()}</Body>
					</Table>
				</Container>
				<Footer />
			</Container>
		);
	}
}

export default MedicalRecordsShow;
