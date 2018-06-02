import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth.reducer';
import profile from './profile.reducer';
import search from './search.reducer';
import layout from './layout.reducer';
import messages from './messages.reducer';
import notebook from './notebook.reducer';
import global from './global.reducer';

const Coglite = combineReducers({
    auth,
    profile,
    search,
    layout,
    messages,
    notebook,
    global,
    routing: routerReducer
});

export default Coglite;
