import React, { Component } from 'react';
import { Card, Button, Dimmer, Loader } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

const colorList = ['red', 'orange', 'yellow', 'olive']

class CampaignIndex extends Component {



  static async getInitialProps() {


    const campaignsAddress = await factory.methods.getDeployedCampaigns().call();
    const count = await factory.methods.countDeployedCampaigns().call();
    //this.setState({ loading: true });

    let campaigns = [];

    var i = 0;
    while (count > i) {
      campaigns[i] = await factory.methods.getDeployedCampaign(campaignsAddress[i]).call();
      // console.log(factory);

      i++;
    }
    //   this.setState({ loading: false });
    return { count, campaignsAddress, campaigns };

  }

  renderCampaigns() {


    let items = [];

    for (var _key in this.props.campaigns) {

      let address = this.props.campaigns[_key]['0'];

      items.push(
        {
          //image: '/images/test.jpeg',
          href: (`/campaigns/${address}`),
          header: <p style={{ fontSize: 18 }}> {this.props.campaigns[_key]['1']}   </p> /*  (
            <Link route={`/campaigns/${address}`}>
              <a>{this.props.campaigns[_key]['1']}</a>
            </Link>
          ) */,
          description: this.props.campaigns[_key]['2'],
          extra: address,
          color: 'green',
          style: { overflowWrap: 'break-word' }
        });
    }

    return <Card.Group items={items} />;


  }



  render() {

    return (


      <Layout>
        <div>
          <h3>Open Campaigns: {this.props.count}</h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          <div>{this.renderCampaigns()}</div>
        </div>
      </Layout>

    );
  }
}

export default CampaignIndex;
