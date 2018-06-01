import * as React from 'react';
import {connect} from 'react-redux';

class Toolbar extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
        this.props.search(event.target.value);

    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.searchPage();
        }
    };

    handelSearch = () => {
        this.props.search(this.state.value);
    };

    render() {
        return (
            <div className="row toolbar d-flex justify-content-end">
                <div className="logo">
                    <h4>Coglite</h4>
                </div>
                <div>
                    <a onClick={this.props.toggleMenu} className="menuBtn">☰</a>
                </div>
                <div className="mr-auto searchBar">
                    <input type="text" value={this.state.value}
                           onKeyPress={(e) => {
                               this.handleKeyPress(e)
                           }}
                           onChange={(e) => {
                               this.handleChange(e)
                           }} placeholder="Find Your Friend or Group"/>
                    <a className="searchBtn" onClick={this.props.handelSearch}><i className="fa fa-search"/></a>
                </div>
                <a className="alerts pointer p-3 align-self-center">
                    <i className="fa fa-bell"/>
                    <span className="badgeCount">5</span>
                </a>
                <a className="newMessages pointer p-3 align-self-center">
                    <i className="fa fa-envelope"/>
                    <span className="badgeCount">8</span>
                </a>
                <a className="authUser p-4 align-self-center" href="/profile">
                    <img src={this.props.user.photoURL}/>
                </a>
                <a onClick={this.props.toggleRightbar} className="authUser p-2 align-self-center">
                    <i className="fa fa-comments"/>
                </a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.auth.userData};
};

export default connect(mapStateToProps)(Toolbar);