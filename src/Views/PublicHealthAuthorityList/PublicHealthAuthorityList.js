import React, { Component } from 'react';
import {
    Row,
    Col, Button, Table, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import './PublicHealthAuthorityList.css';
import { store } from 'react-notifications-component';
import Icon from '@material-ui/core/Icon';

const tooltip = <Tooltip id="tooltip">Edit</Tooltip>;

class PublicHealthAuthorityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: []
        };

        this.openAddNewPublicHealthAuthority = this.openAddNewPublicHealthAuthority.bind(this);
    }

    componentDidMount() {
        this.getAllPublicHealthAuthorities();
    }

    geturl() {
        var protocol, context, host, strurl;
        protocol = window.location.protocol;
        host = window.location.host;
        //port = window.location.port;
        context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
        strurl = protocol + "//" + host + context;
        return strurl;
    };

    getAllPublicHealthAuthorities() {
        // const serviceURL = this.geturl();
        fetch(process.env.REACT_APP_ECR_BASE_URL + "/api/publicHealthAuthority/", {
            method: 'GET'
        }).then(response => {
            
            if (response.status !== 200) {
                store.addNotification({
                    title: '' + response.status + '',
                    message: 'Error in getting the PublicHealthAuthorities',
                    type: 'danger',
                    insert: 'bottom',
                    container: 'bottom-right',
                    animationIn: ['animated', 'fadeIn'],
                    animationOut: ['animated', 'fadeOut'],
                    dismiss: {
                        duration: 5000,
                        click: true,
                        onScreen: true
                    }
                });
                return;
            } else {
                return response.json();
            }
        }).then(result => {
            
            this.setState({
                details: result
            });
        });
    }

    openAddNewPublicHealthAuthority() {
        this.props.addNewPublicHealthAuthority({ addNewHealthCare: true });
        this.props.selectedPublicHealthAuthority({});
        this.props.history.push('publicHealthAuthority');
    }

    editPublicHealthAuthority(selectedPHA) {
        
        this.props.addNewPublicHealthAuthority({ addNewPublicHealthAuthority: false });
        this.props.selectedPublicHealthAuthority(selectedPHA);
        this.props.history.push('publicHealthAuthority');
    }


    render() {
        return (
            <div className="publicHealthAuthority">
                <br />
                <Row>
                    <Col md="6">
                        <h2>Public Health Authority List</h2>
                    </Col>
                    <Col className="addClient">
                        <Button onClick={this.openAddNewPublicHealthAuthority}>Add New Public Health Authority</Button>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Table responsive="lg" striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Client Id</th>
                                    <th>FHIR Server Url</th>
                                    <th>Authentication Type</th>
                                    <th>Action</th>
                                </tr>
                                {
                                    this.state.details.map(get =>
                                        <tr key={get.id}>
                                            <td>{get.id}</td>
                                            <td>{get.clientId}</td>
                                            <td>{get.fhirServerBaseURL}</td>
                                            <td>{get.authType}</td>
                                            <td className="actionColumn">
                                                <OverlayTrigger placement="top" overlay={tooltip}>
                                                    <Button className="editButton" onClick={e => this.editPublicHealthAuthority(get)}><Icon>edit</Icon></Button></OverlayTrigger></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PublicHealthAuthorityList;
