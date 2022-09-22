import React from "react";
import { Menu } from 'semantic-ui-react';
import {Link,Router} from '../routes';

const Header = (props) => {
    return(
        <Menu position="centre" style={{marginTop:'10px'}}>
            <Link route="/">
                <a className="item">
                <h2>Crowdfunding platform</h2>
                </a>
            </Link>
            
            <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">
                    <h3>Campaigns</h3>
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}

export default Header;