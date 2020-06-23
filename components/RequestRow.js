import React, { Component } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
  state ={
    errorMessage: ''
  };

  onApprove = async () => {
    try{
      
      this.setState({ errorMessage: ''});
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }catch(err){
      this.setState({errorMessage: "Either you haven't contributed to the campaign or You have already approved this request"});
  }
  };

  onFinalize = async () => {
    try{
      this.setState({errorMessage: ''});
      const campaign = Campaign(this.props.address);

      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }catch(err){
      this.setState({errorMessage: "Only the owner of the request can Finalize this request"});
  }
  };

  getErrorMessage(){
    return this.state.errorMessage;x
  }

  render() {
    let errorMes = this.state.errorMessage;
    console.log(errorMes);
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
     
      
    );
  }
  
}



export default RequestRow;
