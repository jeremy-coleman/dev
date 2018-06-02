import * as React from 'react';

export const PeopleList = ({searchList,connectRequest}) => (
             <li className="clearfix">
                <div className="message-data">
                    <span className="message-data-name">{searchList.displayName }</span>
                    {
                        searchList.friend ? <button type="button" onClick={() => {connectRequest(searchList._id)}}>Connect Request</button> : ''
                    }
                    <div className="message-data-image" style={{backgroundImage: 'url(' + searchList.photoURL + ')'}}></div>
                </div>
              </li>

);




