import { action } from 'mobx';
import { HSplitModel, VSplitModel } from '../models/Split';
import { ComponentRemoveModel } from '../models';



const ComponentRemoveStore = new ComponentRemoveModel();

//--------------layout split actions----------------------//

const splitHorizontal = action((replace , left , right ) => {
    const split = new HSplitModel();
    if(replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setLeft(left);
    split.setRight(right);
});

const splitVertical = action((replace , top , bottom) => {
    const split = new VSplitModel();
    if(replace.parent) {
        replace.parent.replace(split, replace);
    }
    split.setTop(top);
    split.setBottom(bottom);
});


//--------component actions----------------------//

const removeComponent = action((opts : IComponentRemoveOptions) => ComponentRemoveStore.init(opts))


//--------dashboard actions----------------------//


//const remove = (d) => WorkspaceStorage.remove(d)

export {
    ComponentRemoveStore,
    removeComponent,
    splitHorizontal,
    splitVertical
} 