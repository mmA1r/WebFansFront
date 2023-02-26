import { FC } from "react";
import './userImage.scss';

interface IUserImage {}

const UserImage: FC<IUserImage> = () => {
    return(
        <div className="user-image-mini"></div>
    );
}

export default UserImage;