import React from 'react';
import { Menu, Button, Segment, Sticky, Message } from 'semantic-ui-react';
import { Link } from '../routes';

const colors = ['red', 'blue', 'orange']



export default () => {
  const { color } = colors;

  return (
    <Sticky>
      <Menu color='black' inverted /* style={{
      borderBottom: "1px solid #E7E7E7",
      textAlign: "center",
      padding: "10px",
      position: "sticky",
      left: "0",
      top: "0",
      height: "60px",
      width: "100%"
    }}   */>
        <Link route="/">
          <a className="item">
            <Button
              floated="right"
              content="CrowdCoin"
              color='green'
            />
          </a>
        </Link >

        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">
              <Button
                floated="right"
                content="Campaigns"
                color='green'
              />
            </a>
          </Link>

          <Link route="/campaigns/new">
            <a className="item">
              <Button
                floated="right"
                content="+"
                color='green'
              />
            </a>
          </Link>
        </Menu.Menu>
      </Menu >
    </Sticky>

  );
};
