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
		const { addressPromise } = props.query;
		const patientWallet = PatientWallet(addressPromise);
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
		return { addressPromise, medRecords, medRecordsCount };
	}

	renderRows() {
		console.log(this.props.medRecords);
		return this.props.medRecords.map((medRecord, index) => {
			return (
				<MedRecordRow
					key={index}
					id={index}
					medRecord={medRecord}
					addressPromise={this.props.addressPromise}
				/>
			);
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
					style={{ marginTop: "1px", marginBottom: "20px" }}
				/>
				<Container fluid style={{ marginBottom: "30px" }} >
					<Link
						route={`/wallet/${
							this.props.addressPromise
						}/medicalRecords/new`}
					>
						<a>
							<Button
								circular
								color="facebook"
								animated
								fluid
								size="huge"
								style={{
									marginTop: "40px",
									marginBottom: "40px"
								}}
							>
								<Button.Content visible>
									New Medical Record
									<Icon
										name="medrt"
										style={{ marginLeft: "2px" }}
									/>
								</Button.Content>
								<Button.Content hidden>
									Add From Here!
									<Icon
										name="medrt"
										style={{ marginLeft: "2px" }}
									/>
								</Button.Content>
							</Button>
						</a>
					</Link>
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
					<div>
						Found {this.props.medRecordsCount} Medical Record(s)
					</div>
				</Container>
				<Footer />
			</Container>
		);
	}
}

export default MedicalRecordsShow;
