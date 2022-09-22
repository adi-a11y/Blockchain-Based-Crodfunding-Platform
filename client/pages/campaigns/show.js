import React,{Component} from "react";
import Layout from '../../components/Layout';
import {Link} from '../../routes';
import Campaign from "../../../campaign";
import { Card, Button , Grid} from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import web3 from "../../../web3";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = await Campaign(props.query.address);

        const summary = await campaign.methods.getAllDetails().call();

        return {
            address: props.query.address,
            name: summary[0],
            description: summary[1],
            minimumcontribution: summary[2],
            balanceOfContract: summary[3],
            noOfRequests: summary[4],
            countOfApprovers: summary[5],
            addressOfManager: summary[6]
        };
    }
    
    renderCards() {
        
        const {
            description,
            minimumcontribution,
            balanceOfContract,
            noOfRequests,
            countOfApprovers,
            addressOfManager
        } = this.props;

        const items = [
          {
            header:addressOfManager,
            meta:'Address of Manager',
            description:'Manager is the creator of the contract who can create requests and finalize the the requests on getting enough approvals from the contributors',
            style: {overflowWrap: 'break-word'}
          },
          {
            header:'About',
            meta:'description of the campaign',
            description:description,
            style: {overflowWrap: 'break-word'}
          },
          {
            header:minimumcontribution,
            meta:'Minimum contribution in wei',
            description:'Minimum amount to be contributed the campaign to be considered as a CONTRIBUTOR/APPROVER. CONTRIBUTOR/APPROVER gets the right to aprrove the requests made by the MANAGER',
            style: {overflowWrap: 'break-word'}
          },
          {
            header:web3.utils.fromWei(balanceOfContract,'ether'),
            meta:'balance in ETH',
            description:'The total balance of this contract',
            style: {overflowWrap: 'break-word'}
          },
          {
            header:noOfRequests,
            meta:'Number of requests',
            description:'Total number of requests made by the MANAGER',
            style: {overflowWrap: 'break-word'}
          },
          {
            header:countOfApprovers,
            meta:'Count of Approvers/Contributors',
            description:'The number of people who have contributed for the campaign',
            style: {overflowWrap: 'break-word'}
          }

        ];

        return <Card.Group items={items}/>;
    }
    
    render() {
        return (
            <Layout>
                <h1>{this.props.name}</h1>
                <br/>
                <Grid>
                    
                    <Grid.Column width={10}>
                        {this.renderCards()}
                        <br/>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>View requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address}/>
                    </Grid.Column>

                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;