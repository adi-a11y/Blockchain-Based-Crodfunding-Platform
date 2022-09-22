import React, { Component } from 'react';
import factory from '../../factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';

/*const campaign = await Campaign(props.query.address);

const summary = await campaign.methods.getAllDetails().call();*/

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        


        return {campaigns};

    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return{
                header: address,
                description: (
                    <Link route = {`/campaigns/${address}`}>
                        <a>View campaign</a>
                    </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items = {items}/>;
    }

    render(){
        return  <Layout>
                    <div>
                        
                        <h3>Open campaigns</h3>
                        
                        <Link route="/campaigns/new">
                            <a>
                                <Button
                                    floated="right"
                                    content="Create Campaign"
                                    icon="plus square icon"
                                    primary
                                />
                            </a>
                        </Link>

                        {this.renderCampaigns()}
                        

                    </div>
                </Layout>
    }
}

export default CampaignIndex;