import { FC } from 'react';
import DragAndDropInput from './dragAndDropInput/DragAndDropInput';
import './profileValues.scss';
import UserInfoInput from './userInfoInput/UserInfoInput';

interface IProfileValues {};

const ProfileValues: FC<IProfileValues> = () => {


    return(
        <div className="setting-value-type profile-settings-type-values">
            {/*<UserInfoInput inputType={1}/>
            <UserInfoInput inputType={2}/>*/}
            <DragAndDropInput inputType={1}/>
            <DragAndDropInput inputType={2}/>
        </div>
    );
}

export default ProfileValues;