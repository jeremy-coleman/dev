import * as React from 'react';
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {LogoutCompleteAction} from '../actions/auth.actions';
import {GetSearchListAction} from '../actions/searchActions';


import { Layout } from  '../components/core/Layout'


class AppContainer extends React.Component<any,any> {


    search = (event) => {
        this.props.GetSearchListAction(event);
    };

    searchPage = () => {
        this.props.history.push('/search')
    };

    logout = () => {
        localStorage.removeItem('user_data');
        localStorage.removeItem('JWT');
        this.props.LogoutCompleteAction();
    };

    render() {
        let isUserLoggedIn;
        if(this.props.auth.isLoggedIn){
            isUserLoggedIn = <Layout
                                logout={this.logout}
                                search={this.search}
                                searchPage={this.searchPage}
                            />
        }
        return (
                <div>
                    {isUserLoggedIn}
                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => bindActionCreators({GetSearchListAction, LogoutCompleteAction}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppContainer));
