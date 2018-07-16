import React, { Component } from 'react';

import { Segment, Tab, Divider } from 'semantic-ui-react'

import RegistrarInput from './RegistrarInput';
import Error from './Error';
import DidResult from './result/DidResult';
import DidDocument from './result/DidDocument';
import RegistrarMetadata from './result/RegistrarMetadata';
import MethodMetadata from './result/MethodMetadata';

export class Registrar extends Component {

	constructor (props) {
		super(props);
		this.state = { loading: false, didReference: '', didDocument: '', registrarMetadata: '', methodMetadata: '', error: '' };
		this.examples = [
			'did:sov:WRfXPg8dantKVubE3HX8pw',
			'did:btcr:xkrn-xzcr-qqlv-j6sl',
			'did:btcr:x6lj-wzvr-qqrv-m80w',
			'did:v1:test:nym:3AEJTDMSxDDQpyUftjuoeZ2Bazp4Bswj1ce7FJGybCUu',
			'did:v1:test:nym:UxYjr6F3hqwiF3yffplpcsV3pXSWSzVQ2396WT65e2E',
			'did:uport:2omWsSGspY7zhxaG6uHyoGtcYxoGeeohQXz',
			'did:stack:v0:16EMaNw3pkn3v6f2BgnSSs53zAKH4Q8YJg-0',
			'did:erc725:ropsten:2F2B37C890824242Cb9B0FE5614fA2221B79901E',
			'did:ipid:QmbFuwbp7yFDTMX6t8HGcEiy3iHhfvng89A19naCYGKEBj',
			'did:dom:Jjbfgyu7My4RrbRNrXTPBz4PnhnMEE',
			'did:muport:Qmbrpc3gKtapsL5k6nZuzYvoMQZwMup5qWvss1q4XuaRJd',
			'did:eth:0x3b0BC51Ab9De1e5B7B6E34E5b960285805C41736',
			'did:ethr:0x3b0BC51Ab9De1e5B7B6E34E5b960285805C41736'
		];
	}

    render() {
    	var resultOrError;
    	if (this.state.error) resultOrError = (
    		<Error text={this.state.error} />
    		);
    	if (this.state.didReference && this.state.didDocument) resultOrError = (
            <DidResult
            	didReference={this.state.didReference}
            	didDocument={this.state.didDocument}
				registrarMetadata={this.state.registrarMetadata}
            	error={this.state.error} />
            );

        return (
            <Segment className="registrar">
                <RegistrarInput 
                	examples={this.examples}
                	onClear={this.onClear.bind(this)}
                	onLoading={this.onLoading.bind(this)}
                	onResult={this.onResult.bind(this)}
                	onError={this.onError.bind(this)} />
                <Divider />
                <Tab panes={[
					{ menuItem: 'DID RESULT', render: () =>
					<Tab.Pane loading={this.state.loading}>
						{resultOrError}
					</Tab.Pane> },
					{ menuItem: 'DID DOCUMENT', render: () =>
					<Tab.Pane loading={this.state.loading}>
		                <DidDocument
		                	didDocument={this.state.didDocument} />
					</Tab.Pane> },
					{ menuItem: 'REGISTRAR METADATA', render: () =>
					<Tab.Pane loading={this.state.loading}>
		                <RegistrarMetadata 
		                	registrarMetadata={this.state.registrarMetadata} />
					</Tab.Pane> },
					{ menuItem: 'METHOD METADATA', render: () =>
					<Tab.Pane loading={this.state.loading}>
				<MethodMetadata
					methodMetadata={this.state.methodMetadata} />
					</Tab.Pane> }
				]} />
            </Segment>
        );
    }

    onClear() {
	this.setState({ loading: false, didReference: '', didDocument: '', registrarMetadata: '', methodMetadata: '', error: '' });
	}

	onLoading() {
	this.setState({ loading: true, didReference: '', didDocument: '', registrarMetadata: '', methodMetadata: '', error: '' });
	}

    onResult(didReference, didDocument, registrarMetadata, methodMetadata) {
	this.setState({ loading: false, didReference: didReference, didDocument: didDocument, registrarMetadata: registrarMetadata, methodMetadata: methodMetadata, error: '' });
	}

    onError(error) {
	this.setState({ loading: false, didReference: '', didDocument: '', registrarMetadata: '', methodMetadata: '', error: error });
	}
}

export default Registrar;
