import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import AuthComponet from '../components/auth/auth.component';
import * as authAction from '../actions/auth.actions';
import AuthService  from '../services/auth.service';

class AuthContainer extends React.Component<any, any> {

    static propTypes = {
        RegisterAction: PropTypes.func.isRequired,
        GuestModeAction: PropTypes.func.isRequired,
    };

    componentWillMount() {
        if (this.props.auth.isLoggedIn) {
            this.props.history.push('/dashboard')
        }
    }
    responseGoogle = (response) => {
        let user_info = {
            auth_code: response.code
        };
        this.props.RegisterAction(user_info);
    };

    errorGoogle = (response) => {
        console.log(response);
    };


    guestMode = () => {
        const guestData = {
            uid: null,
            displayName: 'Guest',
            photoURL: 'styles/icons/no-image.png',
            email: 'guest@coglite.shool',
            providerId: null,
        };
        this.props.GuestModeAction(guestData);
        new AuthService().setGuestMode(guestData);
    };

    render() {
        return (
            <AuthComponet
                guestMode={this.guestMode}
                responseGoogle={this.responseGoogle}
                errorGoogle={this.errorGoogle}
            />
        );
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({...authAction}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthContainer);
