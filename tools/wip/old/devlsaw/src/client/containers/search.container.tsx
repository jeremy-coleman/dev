import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SearchComponent from '../components/search/search.component';
import * as searchActions from '../actions/searchActions';



class SearchContainer extends React.Component<any, any> {
    search: any;
    searchType: string;

    componentWillMount(){
        this.searchType = 'people';
    }


    onChangeTab = (val,type) => {
        this.searchType = type;
        this.globalSearch({search: val, eventType: true});
    };

    render() {
        return (
            <SearchComponent
                onGlobalSearch={this.onGlobalSearch}
                onChangeTab={this.onChangeTab}
                searchList = {this.props.search.searchList}
                searchType = {this.searchType}
                groupList = {this.props.search.groupList}
                loading = {this.props.search.loading}
                connectRequest = {this.connectRequest}

            />
        );
    }
    onGlobalSearch = (search) => {
        this.globalSearch({search: search, eventType: true});
    };

    globalSearch = (search) => {
        this.props.ChangeLoadingStatusAction(true);
        const data = {
            search: search.search,
            offset: 0
        };
        if (!search.eventType) {
            data.search = this.search;
            if (this.searchType === 'people') {
                    data.offset = this.props.search.searchList.length;
                this.getSearchedUsers(data);
            } else {
                    data.offset = this.props.search.groupList.length;
                    this.getSearchedGroups(data);
            }
        } else if (this.searchType === 'people') {
            this.props.ResetUsersListAction();
            this.getSearchedUsers(data);
        } else {
            this.props.ResetGroupsListAction();
            this.getSearchedGroups(data);
        }
    };

    getSearchedUsers = (data) => {
        this.props.GetUsersListAction(data);
    };

    getSearchedGroups = (data) => {
        this.props.GetGroupsListAction(data);
    };

    connectRequest = (id) => {
        this.props.ConnectRequestAction(id);
    };

    onScrollList = () => {
        this.globalSearch({search: '', eventType: false});
    };

}

const mapStateToProps = (state) => ({
    search: state.search,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({...searchActions}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchContainer);
