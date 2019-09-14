  
import React, { Component } from 'react';
import { Pane, Menu, Position, Heading, Button, Avatar, Popover, Icon } from 'evergreen-ui';

export default class Header extends Component {
    render() {
        // console.log(this.props.user)
        return (
            <Pane className="header">
                <Pane>
                    <Popover
                    position={Position.BOTTOM_RIGHT}
                    content={
                        <Menu>
                        <Menu.Group>
                            <Menu.Item icon="log-out" onSelect={() => this.props.handleLogout()}>Logout</Menu.Item>
                        </Menu.Group>
                        </Menu>
                    }
                    > 
                    <Button className="profileButton" marginRight={28} appearance="minimal" iconAfter="chevron-down" height={42}>
                        <Avatar className="user-avatar" src={this.props.user.photoURL} padding={0} float="right" marginLeft={-10} marginRight={20} name={this.props.user.displayName} size={29}/>
                        <Heading className="user__name-text" size={400}>{this.props.user.displayName}</Heading>
                    </Button>
                    </Popover>
                </Pane>
            </Pane>
        )
    }
}