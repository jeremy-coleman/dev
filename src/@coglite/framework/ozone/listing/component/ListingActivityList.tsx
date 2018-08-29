import * as React from "react";
import { observer } from "mobx-react";
import { IListingActivityListModel } from "../model/IListingActivityListModel";
import { IListingActivity, IListingChange } from "../IListingActivity";
import { Sync } from "@coglite/framework/common/component/Sync";
import { getClassNames, IListingActivityListClassNames } from "./ListingActivityList.classNames";
import { IListingActivityListStyles, getStyles } from "./ListingActivityList.styles";
import { ActivityItem } from "office-ui-fabric-react/lib/ActivityItem";
import { timestampIO } from "@coglite/framework/common/MomentDataUtils";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ListingActivityAction } from "../ListingActivityAction";
import { split  } from "@coglite/framework/common/StringUtils";
import { isWhitespace } from "@coglite/framework/common/StringFilters";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { UserInfo } from "../../user/component/UserProfile";
import { Link } from "office-ui-fabric-react/lib/Link";

interface IListingActivityListProps {
    activityList: IListingActivityListModel;
    className?: string;
    styles?: IListingActivityListStyles;
}

interface IListingActivityProps {
    activity: IListingActivity;
    className?: string;
}

const getActivityName = (activity : IListingActivity) : string => {
    return activity.author ? activity.author.display_name : "";
};

const getActivityInitials = (activity : IListingActivity) : string => {
    if(activity.author && activity.author.display_name) {
        const items = split(activity.author.display_name, isWhitespace);
        const letters = items.map(e => {
            return e.charAt(0).toUpperCase();
        });
        return letters.join("");
    }
    return "";
};

class ListingActivityUser extends React.Component<IListingActivityProps, any> {
    private _onRenderContent = () => {
        return <UserInfo userProfile={this.props.activity.author} />;
    }
    private _onClickUser = () => {

    }
    render() {
        return (
            <TooltipHost tooltipProps={{ onRenderContent: this._onRenderContent }} calloutProps={{ gapSpace: 0 }}>
                <Link onClick={this._onClickUser}>{getActivityName(this.props.activity)}</Link>
            </TooltipHost>
        );
    }
}

class ListingActivity extends React.Component<IListingActivityProps, any> {
    render() {
        const { activity } = this.props;
        return (
            <ActivityItem className={this.props.className} activityDescription={
                <div><strong>{activity.action}</strong> by <ListingActivityUser {...this.props} /></div>
            }
            activityPersonas={[
                {
                    text: getActivityName(activity),
                    imageInitials: getActivityInitials(activity)
                }
            ]}
            timeStamp={timestampIO(activity.activity_date)} />
        );
    }
}

interface IListingActivityChangeProps extends IListingActivityProps {
    change: IListingChange;
}

class ListingActivityChange extends React.Component<IListingActivityChangeProps, any> {
    render() {
        const { change } = this.props;
        return (
            <div>
                <strong>{change.field_name}</strong> changed from <strong>{change.old_value}</strong> to <strong>{change.new_value}</strong>
            </div>
        );
    }
}

class ListingActivityChanges extends React.Component<IListingActivityProps, any> {
    render() {
        if(this.props.activity.change_details && this.props.activity.change_details.length > 0) {
            const changes = this.props.activity.change_details.map((change, idx) => {
                return <ListingActivityChange key={idx} activity={this.props.activity} change={change} />;
            });
            return (
                <div>
                    {changes}
                </div>
            )
        }
        return null;
    }
}

class ListingModifiedActivity extends React.Component<IListingActivityProps, any> {
    render() {
        const { activity } = this.props;
        const activityDescription = [];
        activityDescription.push(
            <div key="user"><strong>{activity.action}</strong> by <ListingActivityUser {...this.props} /></div>
        );
        if(activity.change_details && activity.change_details.length > 0) {
            activityDescription.push(
                <ListingActivityChanges key="changes" {...this.props} />
            );
        }
        return (
            <ActivityItem className={this.props.className}
            activityDescription={activityDescription}
            activityPersonas={[
                {
                    text: activity.author.display_name,
                    imageInitials: getActivityInitials(activity)
                }
            ]}
            timeStamp={timestampIO(activity.activity_date)} />
        );
    }
}

@observer
class ListingActivityListItems extends React.Component<IListingActivityListProps, any> {
    private _classNames : IListingActivityListClassNames;
    private _onRenderActivity = (item : IListingActivity, idx : number) => {
        if(item.action === ListingActivityAction.MODIFIED) {
            return <ListingModifiedActivity className={this._classNames.activity} key={idx} activity={item} />;
        }
        return <ListingActivity className={this._classNames.activity} key={idx} activity={item} />;
    }
    render() {
        this._classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        let content;
        const activityViews = this.props.activityList.itemsView.map(this._onRenderActivity);
        if(activityViews.length > 0) {
            content = activityViews;
        } else {
            content = (
                <MessageBar messageBarType={MessageBarType.info}>
                    No Activities available
                </MessageBar>
            );
        }
        return (
            <div className={this._classNames.activities}>
                {content}
            </div>
        );
    }
}

class ListingActivityList extends React.Component<IListingActivityListProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                <ListingActivityListItems {...this.props} />
            </div>
        );
    }
}

class ListingActivityListContainer extends React.Component<IListingActivityListProps, any> {
    private _onRenderDone = () => {
        return <ListingActivityList {...this.props} />
    }
    componentWillMount() {
        this.props.activityList.load();
    }
    render() {
        return <Sync sync={this.props.activityList.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Activity..." />
    }
}

export { IListingActivityListProps, ListingActivityListContainer, ListingActivityList }