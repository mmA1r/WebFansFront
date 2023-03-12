import { FC, useEffect, useState } from "react";
import server from "../../../../services/server/Server";
import './profileImage.scss';

interface IProfileImage {}

const ProfileImage: FC<IProfileImage> = () => {
    const [userName, setUserName]:any = useState('');
    const [userImagePath, setUserImagePath]:any = useState(null);
    const [userCoverPath, setUserCoverPath]:any = useState(null);

    useEffect(() => {
        getUserData();
    });

    async function getUserData() {
        const user:any = await server.getUser();
        const imageName:any = await server.getImage('avatar');
        const coverName:any = await server.getImage('cover');
        if(user) {
            setUserName(user.name);
        }
        if(imageName) {
            setUserImagePath(`http://localhost:3001/assets/usersAvatar/${imageName}`);
        }
        if(coverName) {
            setUserCoverPath(`http://localhost:3001/assets/usersCover/${coverName}`);
        }
        return;
    }

    function createImage(image: any) {
        const imageEl = document.createElement('img');
        imageEl.src = URL.createObjectURL(image)
        console.log(imageEl)
        document.querySelector('.settings-profile-image-wrapper')?.append(imageEl)
        URL.revokeObjectURL(imageEl.src);
    }

    return(
        <div className="profile-image">
            <div className="settings-profile-image-wrapper">
                {userImagePath ? <img className="user-options-mini-avatar-image" src={userImagePath} alt="" /> : <div className="sceleton-settings-page-image"></div>}
            </div>
            <div className="settings-profile-name">SETTINGS</div>
            <div className="settings-user-name">{userName}</div>
        </div>
    );
}

export default ProfileImage;