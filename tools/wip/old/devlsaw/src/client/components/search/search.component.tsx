import * as React from 'react';
import { connect } from 'react-redux';
import {PeopleList} from "./peoplelist.component";
import {GroupList} from "./grouplist.component";


class SearchComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.searchData,
            searchType: 'people'
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    peopleChange(type){
        this.setState({searchType: type});
        this.props.onChangeTab(this.state.value, type);
    }


    render() {
        return(
        <div>
            <div className="flex">
                <div className="search-input flex-basis-full">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.props.onGlobalSearch(this.state.value)
                    }}>
                        <input type="text" value={this.state.value}
                               onChange={(e) => {this.handleChange(e)}} placeholder="Search"/>
                        <i className="fa fa-search" />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>

            <ul className="tabs-wrapper">
                <li onClick={(e) => {this.peopleChange('people')}}><a>People</a></li>
                <li onClick={(e) => {this.peopleChange('group')}}><a>Groups</a></li>
            </ul>
            <ul>
                {this.props.searchType === 'people' ?
                    <div>
                        {this.props.searchList.map((item) => (
                            <PeopleList searchList={item} key={item._id} connectRequest={this.props.connectRequest}/>
                        ))}
                    </div>
                     :
                    <div>
                        {this.props.groupList.map((item) => (
                            <GroupList groupList = {item} />
                        ))}
                    </div>
                }
            </ul>

            <div className={this.props.loading ? 'loading chat-loading' : 'chat-loading'} />
        </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchData: state.search.searchData
    };
};

export default connect(mapStateToProps)(SearchComponent);



