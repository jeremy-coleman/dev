import * as React from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import AuthService from '../services/auth.service'

export default function(ComposedComponent) {

    class Authenticate extends React.Component<any, any> {
        status = false;
        permissions = {
            '/': ['isLoggedIn'],
            '/dashboard': ['isLoggedIn'],
            '/notebook': ['isLoggedIn'],
            '/messaging': ['isLoggedIn',],
            '/profile': ['isLoggedIn',],
            '/search': ['isLoggedIn'],
        };

          /*
            '/messaging': ['isLoggedIn', 'isNotGuest'],
            '/profile': ['isLoggedIn', 'isNotGuest'],
            '/search': ['isLoggedIn', 'isNotGuest'],
            
            */

        componentWillMount() {
            this.status = false;
            const permissions = this.permissions[this.props.location.pathname];
            let pass = [];
            for (let i = permissions.length - 1; i >= 0; i--) {
                pass.push(new AuthService()[permissions[i]]());
            }

            if(Object.keys(pass).every(function(k){ return pass[k] })) {
                this.status = true;
            } else {
                this.props.history.push('/');
                this.status = false;
            }

        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isLoggedIn) {
                this.props.history.push('/')
            }
        }

        render() {
            if(this.status){
                return (
                    <ComposedComponent />
                );
            }else {
                return (
                    <div/>
                );

            }
        }
    }

    function mapStateToProps(state) {
        return {
            isLoggedIn: state.auth.isLoggedIn
        };
    }

    return withRouter(connect(mapStateToProps)(Authenticate));
}
