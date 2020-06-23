import React, { Component } from 'react';
import { Card, Grid, Button, Progress } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      title: summary[0],
      description: summary[1],
      minimumContribution: summary[2],
      balance: summary[3],
      requestsCount: summary[4],
      approversCount: summary[5],
      manager: summary[6]
    };
  }

  renderCards() {
    const {
      title,
      description,
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: title,
        meta: 'Title of the campaign'
      },
      {
        header: description,
        meta: 'Description of the campaign',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: manager,
        meta: 'Address of Campaign Creator',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)'
      }//,
      //{
      //  description: <Progress value={approversCount} total={5} progress='ratio' />
     // }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Link route={`/`}>
          <a>Back</a>
        </Link>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
