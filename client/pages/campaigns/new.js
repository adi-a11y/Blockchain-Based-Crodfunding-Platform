import React,{Component} from "react";
import Layout from "../../components/Layout";
import {Form,Button,Input, Message} from 'semantic-ui-react';
import factory from "../../../factory";
import web3 from "../../../web3";
import {Link,Router} from '../../routes';


class CampaignNew extends Component {
    state = {
        name:'',
        description:'',
        minimumContribution: null,
        errorMessage:'',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true,errorMessage:''});

        try{
            const accounts  = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(this.state.name,this.state.description,this.state.minimumContribution)
            .send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        }
        catch (err) {
            this.setState({errorMessage: err.message});

        }

        this.setState({loading: false});
    };

    render() {
        return(
            <Layout>
                <h3>Create a new Campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Name</label>
                        <Input
                            value={this.state.name}
                            onChange={event => this.setState({name:event.target.value})}
                        />
                        
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({description:event.target.value})}
                        />
                        
                        
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei" labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({minimumContribution:event.target.value})}
                        />
                    </Form.Field>
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <br/>
                    <Button loading={this.state.loading}
                        primary>Create
                    
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;