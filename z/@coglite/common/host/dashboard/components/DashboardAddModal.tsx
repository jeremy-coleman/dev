import { Modal } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { BoundTextField } from '../../components';

// this is the modal that asks for new dashboard/workspace name and if from existing

let dashboardAddStyles = stylesheet({
        root: {},
        editor: {
            padding: 8
        },
        actions: {},
        action: {
            marginRight: 8
        }
})


interface CreateNewDashboardProps {
    add?: IDashboardAdd;
    className?: string;
    actionClassName?: string;
    dashboard?: IDashboard;
}


let DashboardAddModal = observer((props: CreateNewDashboardProps) => 
    <Modal 
        className={dashboardAddStyles.root}
        showModal={props.add.active}
        handleClose={() => props.add.cancel()}
    >
        {
                props.add.active && 

                <div>
                    <div>Add Dashboard</div>
                    <div>
                    <label>New Dashboard Name:</label>
                        <div className="dashboard-property-editor">
                            <BoundTextField 
                                placeholder="Title"
                                binding={{ target: props.add.dashboard, key: "title", setter: "setTitle" }}
                            />
                        </div>

                <div>
                    <label htmlFor='dashboard-add-dropdown-select'>Copy Existing Dashboard</label>

                <ul>
                {
                props.add.dashboardList.dashboards.map(dashboard => (
                    <li
                    key={dashboard.id}
                    role={undefined}
                    onClick={this._onChange}
                    >
                    <input
                        type="checkbox"
                        onChange={() => void 0}
                        checked={props.add.makeActive}
                    />
                    <div>{`${dashboard.title}`}</div>
                    </li>
                ))}
                </ul>

            </div>

            </div>
                    <button onClick={() => props.add.cancel()}>Cancel</button>
                    <button  onClick={() => props.add.save()} disabled={!props.add.saveEnabled}>OK</button>
                </div>
            
        }
    </Modal>
)


export { DashboardAddModal }

                    
                    // <Label 
                    //     placeholder="Set Dashboard Active"
                    //     style={{ marginTop: 8 }}
                    //     value={this.props.add.existing ? this.props.add.existing.id : ""} 
                    // >
                    // <MenuList>
                    //     <MenuItem>
                    // <Checkbox
                    //     onChange={this._onMakeActiveChange}
                    //     checked={this.props.add.makeActive}
                    // />
                    // </MenuItem>
                    // </MenuList>
                    // </Select>


                    // const _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
//         if(e.key === 'enter' && props.add.saveEnabled) {
//             props.add.save();
//         }
//     }
// const _onMakeActiveChange = (e, checked) => props.add.setMakeActive(checked)


//     private _onChange = (option) => {
//         const dashboard = this.props.add.dashboardList.dashboards.find(db => db.id === option.key);
//         this.props.add.setExisting(dashboard);
//     }

//      _onMakeActiveChange = (e) => {
//         this.props.add.setMakeActive(e.currentTarget.value);
//     } 

//   render() {
    
// if(this.props.add.dashboardList.dashboardCount > 0) {
//     const options : any[] = this.props.add.dashboardList.dashboards.map(db => {
//         return  {key: db.id,text: db.title};
//     });
//     options.unshift({key: "",text: ""})
// }