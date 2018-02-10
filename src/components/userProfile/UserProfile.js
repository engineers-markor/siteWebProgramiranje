import React from 'react';

const UserProfile = ({user}) => {
    return (
        <div>
            <h2>{user.username.toUpperCase()}</h2>
            <h3>Number of courses: {user.courses ? Object.keys(user.courses).length : 0}</h3>
        </div>
    );
};

export default UserProfile;