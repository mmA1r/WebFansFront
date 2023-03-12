import { FC, useState, useEffect } from "react";
import server from "../../../../../services/server/Server";
import './userImage.scss';

interface IUserImage {}

const UserImage: FC<IUserImage> = () => {

    const [userImagePath, setUserImagePath]:any = useState(null);
    const [userCoverPath, setUserCoverPath]:any = useState(null);

    useEffect(() => {
        getUserData();
    });

    async function getUserData() {
        const imageName:any = await server.getImage('avatar');
        if(imageName) {
            setUserImagePath(`http://localhost:3001/assets/usersAvatar/${imageName}`);
        }
        return;
    }

    return(
        <div className="user-image-mini">
            {userImagePath ? <img className="user-header-mini-avatar-image" src={userImagePath} alt="" /> : <div className="sceleton-image-block"></div>}
        </div>
    );
}

export default UserImage;