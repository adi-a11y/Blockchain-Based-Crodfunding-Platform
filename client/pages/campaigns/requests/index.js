import React,{Component} from "react";
import Layout from "../../../components/Layout";
import { Button , Grid, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Campaign from "../../../../campaign";
import RequestsRow from "../../../components/RequestsRow";


class RequestIndex extends Component {
    static async getInitialProps(props){
        const {address} = props.query;
        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.getRequestsCount().call();
        let request;
        let requests= [];
        const countOfApprovers = await campaign.methods.countOfApprovers().call();
        
        for(let i=0;i<requestsCount;i++){
            request =  await campaign.methods.requests(i).call();
            requests.push(request);
        } 
        
        return{address,requestsCount,requests,countOfApprovers};
    }
    
    renderRows(){
        const {
            address,
            requestsCount,
            request
        } = this.props;

        return this.props.requests.map((request,index) => {
            return(
                <RequestsRow 
                    key = {index}
                    id = {index}
                    request = {request}
                    address={this.props.address}
                    countOfApprovers = {this.props.countOfApprovers}
                />
            );
        });
    }

    render(){
        const {Header,Row,HeaderCell,Body} = Table;

        return(
            <Layout>
                
                
                <Link route={`${this.props.address}/requests/newRequest`}>
                    <a>
                        <Button primary floated="right">Add Request<br/>(Only manager)</Button>
                    </a>
                </Link>
                <h1>Requests</h1>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Descriprion</HeaderCell>
                            <HeaderCell>Amount(in Ether)</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>

                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
            </Layout>
            
        );
    }
}

export default RequestIndex;