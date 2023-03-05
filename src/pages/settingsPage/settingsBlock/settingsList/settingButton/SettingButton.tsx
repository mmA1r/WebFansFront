import { FC } from 'react';
import { gsap } from 'gsap';
import './settingButton.scss';

interface ISettingButton {
    buttonType: number;
}

const SettingButton: FC<ISettingButton> = ({buttonType}) => {
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

    function onMouseEnterHandler() {
        gsap.to(`.${coverClassName}`, {
            width: '100%',
            borderLeft: '1px solid',
            duration: 0.3,
            ease: 'Power3.easeIn'
        });
    }

    function onMouseLeaveHandler() {
        gsap.to(`.${coverClassName}`, {
            width: '0',
            border: 'none',
            duration: 0.3,
            ease: 'Power3.easeOut'
        });
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
            >
                {/** some svg **/}
                {ButtonTitle}
            </button>
        </div>
    );
}

export default SettingButton;