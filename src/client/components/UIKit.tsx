import * as React from "react";
import { Menu, Icon } from "antd";
const { Item } = Menu;

export class UIKit extends React.Component {
    public render() {
        return (
            <Menu mode="inline">
                <Item><Icon type="book" /><span>This</span></Item>
                <Item><Icon type="database" /><span>Is</span></Item>
                <Item><Icon type="retweet" /><span>A</span></Item>
                <Item><Icon type="schedule" /><span>Menu</span></Item>
            </Menu>
        );
    }
}
