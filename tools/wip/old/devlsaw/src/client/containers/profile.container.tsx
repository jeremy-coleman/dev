import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import ProfileComponent from '../components/profile/profile.component';
import * as profileAction from '../actions/profile.actions';



class ProfileContainer extends React.Component<any, any> {

    static propTypes = {
        ProfileEmptyAction: PropTypes.func.isRequired,
    };

    componentWillMount(){
        this.props.ProfileEmptyAction();
    }


    render() {
        return (
            <ProfileComponent profileData={this.props.profile.profileData}  user={this.props.user}/>
        );
    }


}

const mapStateToProps = (state) => ({
    profile: state.profile,
    user: state.auth.userData,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({...profileAction}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileContainer);


