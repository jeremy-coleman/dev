import * as React from 'react';
import {Link} from 'react-router-dom';
import {Offline} from 'react-detect-offline';
import Toolbar from './Toolbar'

export class Layout extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            showSidenav: false,
            showRightbar: false,
            rightbarTab: 'friends',
        };

    }

    rightBar = (type) => {
        this.setState({rightbarTab: type})
    };

    closeSidenav = () => {
        this.setState({showSidenav: false})
    };

    toggleSidenav = () => {
        this.setState({showSidenav: !this.state.showSidenav})
    };

    toggleRightbar = () => {
        this.setState({showRightbar: !this.state.showRightbar})
    };

    render() {

        let showSidenav = this.state.showSidenav ? 'sideNavOpen' : '';
        let showRightbar = this.state.showRightbar ? 'showRightbar' : '';
        let rightbarTabFriends = this.state.rightbarTab === 'friends' ? 'active' : '';
        let rightbarTabGroups = this.state.rightbarTab === 'groups' ? 'active' : '';
        return (
            <div>
                <Toolbar
                    toggleMenu={this.toggleSidenav}
                    toggleRightbar={this.toggleRightbar}
                    search={this.props.search}
                    searchPage={this.props.searchPage}
                />
                <div id="sidebar" className={"sidenav " + showSidenav}>
                    <Link to="/dashboard" onClick={this.closeSidenav}>
                        <div>
                            <i className="fa fa-home" />
                        </div>
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/profile" onClick={this.closeSidenav}>
                        <div>
                            <i className="fa fa-user" />
                        </div>
                        <span>Profile</span>
                    </Link>
                    <Link to="/messaging" onClick={this.closeSidenav}>
                        <div>
                            <i className="fa fa-comments" />
                        </div>
                        <span>Messages</span>
                    </Link>
                    <Link to="/notebook" onClick={this.closeSidenav}>
                        <div>
                            <i className="fa fa-book" />
                        </div>
                        <span>Notebook</span>
                    </Link>
                    <Link to="/" onClick={this.props.logout}>
                        <div>
                            <i className="fa fa-book" />
                        </div>
                        <span>Logout</span>
                    </Link>
                </div>
                <div id="rightbar" className={"rightbar " + showRightbar}>
                    <ul className="nav nav-tabs">
                        <li className={"nav-item " + rightbarTabFriends}>
                            <a className={"nav-item " + rightbarTabFriends} onClick={(e) => {
                                this.rightBar('friends')
                            }}>
                                <i className="fa fa-users" />
                            </a>
                        </li>
                        <li className={"nav-item " + rightbarTabGroups}>
                            <a className={"nav-item " + rightbarTabGroups} onClick={(e) => {
                                this.rightBar('groups')
                            }}>
                                <i className="fa fa-object-group" />
                            </a>
                        </li>
                    </ul>
                    <ul className="right-list">
                        <h4>FRIENDS</h4>
                        <li>
                            <div className="avatar">
                                <img
                                    src="http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0"
                                    alt=""/>
                            </div>
                            <div>
                                <span>John Doe</span>
                                <span>
                                    <i className="fa fa-map-marker" />
                                    Armenia
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <Offline>You are now offline...</Offline>
            </div>
        );
    }
}

