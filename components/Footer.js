import React from 'react';
import { Message, Sticky } from 'semantic-ui-react';

const FooterBar = () => (
    <Sticky
        style={{
            backgroundColor: "#F8F8F8",
            borderTop: "1px solid #E7E7E7",
            textAlign: "center",
            margin: "0px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "60px",
            width: "100%",

        }} >
        <Message color='black' visible>
            Designed and Developed by Team9 &copy;
            <a href='https://mangosoft.ml' target="_blank">
                <b> Mangosoft</b>
            </a>

        </Message>
    </Sticky >
)

export default FooterBar;