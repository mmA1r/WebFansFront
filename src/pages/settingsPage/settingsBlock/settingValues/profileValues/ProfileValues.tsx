import { FC } from 'react';
import './profileValues.scss';

interface IProfileValues {};

const ProfileValues: FC<IProfileValues> = () => {
    return(
        <div className="setting-value-type profile-settings-type-values"></div>
    );
}

export default ProfileValues;