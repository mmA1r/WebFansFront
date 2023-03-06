import { FC } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAppSelector } from '../../../../../../../hooks/redux';
import Server from '../../../../../../../services/server/Server';
import GearIcon from './gearIcon/GearIcon';
import './manageButton.scss';
import LogoutIcon from './logoutIcon/LogoutIcon';

interface IManageButton {
    type: string;
}

const ManageButton: FC<IManageButton> = ({ type }) => {
    const routes = useAppSelector((state) => state.storeRoutes.value);
    const navigate: NavigateFunction = useNavigate();
    const gearTimeLine: gsap.core.Timeline = gsap.timeline();
    const logoutTimeLine: gsap.core.Timeline = gsap.timeline();

    const label = function() {
        switch(type) {
            case 'logout' :
                return 'Sign Out';
            case 'settings' :
                return 'Settings';
            default : return null;
        }
    }

    function onClickRoute():any {
        switch(type) {
            case 'logout' :
                return logout();
            case 'settings' :
                return routeToSettingsPage();
            default : return null;
        }
    }

    async function logout() {
        const response = await Server.logout();
        if(response) {
            return routeToLoginPage();
        }
    }

    function routeToLoginPage():void {
        showShadowBlock();
        setTimeout(() => {
            return navigate(routes.login.path);
        }, 500);
    }

    function routeToSettingsPage():void {
        setTimeout(() => {
            return navigate(routes.settingsProfile.path);
        }, 500);
    }

    function onMouseEnterHandlerAnimation() {
        if(type === 'settings') {
            gearTimeLine.progress(1)
            gearTimeLine.from('.gear', {
                rotateZ: 180,
                duration: 0.5,
            }, '>');
        } else if(type === 'logout') {
            logoutTimeLine.progress(1);
            logoutTimeLine.to('.logout-arrow', {
                x: 3,
                repeat: 1,
                duration: 0.2,
                yoyo: true
            }, '>');
        }
    }

    function showShadowBlock():void {
        gsap.set('.shadow-block', {
            zIndex: 100
        });
        gsap.to('.shadow-block', {
            opacity: 1,
            duration: .5
        });
    }

    return(
        <button
            className={`manage-button`}
            onClick={onClickRoute}
            onMouseEnter={onMouseEnterHandlerAnimation}
        >
            {
                type === 'settings' ? 
                    <GearIcon/> : 
                type === 'logout' ? 
                    <LogoutIcon/> : 
                ''
            }
            {label()}
        </button>
    );
}

export default ManageButton;