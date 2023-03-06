import { FC, useEffect, useState } from "react";
import server from "../../../../services/server/Server";
import './profileImage.scss';

interface IProfileImage {}

const ProfileImage: FC<IProfileImage> = () => {
    const [userName, setUserName]:any = useState('');

    useEffect(() => {
        getUser();
    });

    async function getUser() {
        const user:any = await server.getUser();
        return setUserName(user.name);
    }

    return(
        <div className="profile-image">
            <div className="settings-profile-image-wrapper"></div>
            <div className="settings-profile-name">SETTINGS</div>
            <div className="settings-user-name">{userName}</div>
        </div>
    );
}

export default ProfileImage;