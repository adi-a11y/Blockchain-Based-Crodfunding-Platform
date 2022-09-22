import React, {Component} from 'react';
import {Form,Button,Input, Message} from 'semantic-ui-react';
import web3 from "../../../../web3";
import {Link} from '../../../routes';
import Campaign from "../../../../campaign";
import Layout from "../../../components/Layout";
import CampaignShow from '../show';
import { Router } from '../../../routes';


class NewRequest extends Component {
   
    state = {
        description:'',
        value:'',
        recipientAddress:'',
        errorMessage:'',
        loading: false
    };
    
    
    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
      }
    

    
    onSubmit = async(event) => {
        
        event.preventDefault();
        this.setState({loading:true,errorMessage:''});
        try{
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);
            
            await campaign.methods
            .createRequest(this.state.description,web3.utils.toWei(this.state.value,'ether'),this.state.recipientAddress)
            .send({
                from:accounts[0]
            });

            Router.push(`/campaigns/${this.props.address}/requests`);
        }
        catch (err){
            this.setState({errorMessage:err.message});
        }

        this.setState({loading:false})
    };

    render(){
        return(
                <Layout>
                    <h3>Create a new request</h3>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            
                            <label>Descriprion</label>
                            <Input
                                value={this.state.description}
                                onChange={event => this.setState({description:event.target.value})}
                            />
                            
                            <label>Value in Ether</label>
                            <Input
                                value={this.state.value}
                                onChange={event => this.setState({value:event.target.value})}
                            />

                            <label>Address of Recipient</label>
                            <Input
                                value={this.state.recipientAddress}
                                onChange={event => this.setState({recipientAddress:event.target.value})}
                            />
                        <br/>
                        <Message error header="Oops!" content={this.state.errorMessage}/>
                        <br/>
                        <Button loading={this.state.loading} primary>
                            Create
                        </Button>
                        
                        </Form.Field>
                    </Form>
                </Layout>
        );
    }
}

export default NewRequest;