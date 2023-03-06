import { FC } from 'react';
import { gsap } from 'gsap';
import { useAppSelector } from '../../../../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import './settingButton.scss';

interface ISettingButton {
    buttonType: number;
        // 1 - general progile settings
        // 2 - loaction setting
}

const SettingButton: FC<ISettingButton> = ({ buttonType }) => {
    const routes = useAppSelector(state => state.storeRoutes.value);
    const navigate = useNavigate();
    const buttonClassName: string = (
        buttonType === 1 ? 'general-setting-button' : 
        buttonType === 2 ? 'location-setting-button' : ''
    );
    const coverClassName: string = (
        buttonType === 1 ? 'general-setting-button-cover' : 
        buttonType === 2 ? 'location-setting-button-cover' : ''
    );
    const ButtonTitle: string = (
        buttonType === 1 ? 'Profile' : 
        buttonType === 2 ? 'Location' : ''
    );

    function onMouseEnterHandler():void {
        gsap.to(`.${coverClassName}`, {
            width: '100%',
            borderLeft: '1px solid',
            duration: 0.3,
            ease: 'Power3.easeIn'
        });
    }

    function onMouseLeaveHandler():void {
        gsap.to(`.${coverClassName}`, {
            width: '0',
            border: 'none',
            duration: 0.3,
            ease: 'Power3.easeOut'
        });
    }

    function routeToOtherSettingType():void {
        switch(buttonType) {
            case 1:
                return navigate(routes.settingsProfile.path);
            case 2: 
                return navigate(routes.settingsLocation.path);
            default: return;
        }
    }

    return(
        <div 
            className="setting-button-wrapper"
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            <div className={`setting-button-cover ${coverClassName}`}></div>
            <button
                className={`setting-button ${buttonClassName}`}
                onClick={routeToOtherSettingType}
            >
                {/** some svg **/}
                {ButtonTitle}
            </button>
        </div>
    );
}

export default SettingButton;