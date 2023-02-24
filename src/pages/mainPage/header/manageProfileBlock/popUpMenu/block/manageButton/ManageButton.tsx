import { FC } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAppSelector } from '../../../../../../../hooks/redux';
import Server from '../../../../../../../services/server/Server';
import './manageButton.scss';

interface IManageButton {
    type: string;
}

const ManageButton: FC<IManageButton> = ({ type }) => {
    const routes = useAppSelector((state) => state.storeRoutes.value);
    const navigate: NavigateFunction = useNavigate();

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
        gsap.set('.shadow-block', {
            zIndex: 100
        });
        gsap.to('.shadow-block', {
            opacity: 1,
            duration: .5
        });
        setTimeout(() => {
            return navigate(routes.login.path);
        }, 500);
    }

    function routeToSettingsPage():void {

    }

    return(
        <button
            className={`manage-button`}
            onClick={onClickRoute}
        >
            {type}
        </button>
    );
}

export default ManageButton;