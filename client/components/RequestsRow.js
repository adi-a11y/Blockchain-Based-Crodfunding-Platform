import React, {Component} from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../../web3';
import Campaign from '../../campaign';
import {Router} from '../routes';

class RequestsRow extends Component {

    state = {
        loadingA:false,
        loadingB:false
    };
    
    onApprove = async () => {
        this.setState({loadingA: true});

        const campaign = await Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts()
        try{
            await campaign.methods
            .approveRequests(this.props.id)
            .send({
                from: accounts[0]
             });
            }
        catch(err){
            console.log(err.message);
        }
            
        this.setState({loadingA: false});
       
        Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    }

    onFinalize = async () => {
        this.setState({loadingB: true});

        const campaign = await Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts()
        try{
            await campaign.methods
            .finializeRequest(this.props.id)
            .send({
                from: accounts[0]
             });
            }
        catch(err){
            console.log(err.message);
        }
            
        this.setState({loadingB: false});
       
        Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    }

    render() {
        const {Row,Cell} = Table;
        return(
            <Row disabled={this.props.request.complete}>
                <Cell>{this.props.id}</Cell>
                <Cell>{this.props.request.description}</Cell>
                <Cell>{web3.utils.fromWei(this.props.request.value,'ether')}</Cell>
                <Cell>{this.props.request.recipient}</Cell>
                <Cell>{this.props.request.approvalsCount}/{this.props.countOfApprovers}</Cell>
                <Cell>
                    {this.props.request.complete ? null : (
                        <Button color='green' basic onClick={this.onApprove} loading={this.state.loadingA}>
                            Approve
                        </Button>
                     )}
                </Cell>
                <Cell>
                    {this.props.request.complete ? null : (
                        <Button color='red' basic onClick={this.onFinalize} loading={this.state.loadingB}>
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestsRow;