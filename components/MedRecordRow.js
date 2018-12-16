import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import PatientWallet from "../ethereum/patientWallet";
import { Link } from "../routes";

class MedRecordRow extends Component {
	render() {
		const { Row, Cell } = Table;
		const { id, medRecord } = this.props;
		return (
			<Row>
				<Cell> {id} </Cell>
				<Cell> {medRecord.labName} </Cell>
				<Cell> {medRecord.labAddress} </Cell>
				<Cell> {medRecord.illness} </Cell>
				<Cell> {medRecord.documentType} </Cell>
				<Cell> {medRecord.date} </Cell>
				<Cell>{medRecord.ipfsHash}</Cell>
				<Cell> <a href="{medRecord.bitlyLink}">{medRecord.bitlyLink}</a></Cell>
			</Row>
		);
	}
}

export default MedRecordRow;
