import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {DashboardComponent} from '../components/dashboard/dashboard.component'


class DashboardContainer extends React.Component<any, any> {


    render() {
        return (
           <DashboardComponent/>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashboardContainer);
