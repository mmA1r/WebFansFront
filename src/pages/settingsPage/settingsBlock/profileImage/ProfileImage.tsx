import { FC } from "react";
import './profileImage.scss';

interface IProfileImage {}

const ProfileImage: FC<IProfileImage> = () => {
    return(
        <div className="profile-image"></div>
    );
}

export default ProfileImage;