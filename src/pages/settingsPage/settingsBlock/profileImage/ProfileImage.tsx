import { FC } from "react";
import './profileImage.scss';

interface IProfileImage {}

const ProfileImage: FC<IProfileImage> = () => {
    return(
        <div className="profile-image">
            <div className="settings-profile-image-wrapper"></div>
            <div className="settings-profile-name">SETTINGS</div>
            <div className="settings-user-name">mmAir</div>
        </div>
    );
}

export default ProfileImage;