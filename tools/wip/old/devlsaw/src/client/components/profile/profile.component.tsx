import * as React from 'react';






const ProfileComponent = ({profileData, user}) => (
    <div className="d-flex justify-content-center">
        <div className="thumbnail profile">
            <figure>
                <div className="overlay"></div>
                <figcaption><img src={user.photoURL}/></figcaption>
            </figure>
            <div className="caption">
                <h2 className="name">{user.displayName}</h2>
                <ul>
                    <li><i className="fa fa-envelope-o" /> {user.email}</li>
                    <li><i className="fa fa-map-marker" /> {profileData.user.location}</li>
                    <li><i className="fa fa-clock-o" /> {profileData.user.timezone}</li>
                    <li><i className="fa fa-users" />
                        {
                            profileData.groups.map((group) => <p>{group.name}</p>)
                        }
                    </li>
            </ul>
        </div>
    </div>
</div>

);

export default ProfileComponent;
