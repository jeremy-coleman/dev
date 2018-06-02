import * as React from 'react';


const Tab = ({ name, setActiveTab, id, closeTab }) => {
  return (
    <li className="texteditor tab" onClick={setActiveTab.bind(null, id)}>
      <div className="title">{name}</div>
      <div className="close-icon" onClick={closeTab.bind(null, id)} />
    </li>
  );
};



const TabContainer = ({
  appState,
  setActiveTab,
  closeTab
}) => {
  const tabs = [];
    for (var i = 0; i < appState.openTabs.length; i++) {
      tabs.push(
        <Tab 
          key={i} 
          name={appState.openTabs[i].name} 
          setActiveTab={setActiveTab} 
          id={appState.openTabs[i].id} 
          closeTab={closeTab}
        />);
    }
    return (
      <ul className="list-inline tab-bar inset-panel tab-container">
        {tabs}
      </ul>
    )
}



