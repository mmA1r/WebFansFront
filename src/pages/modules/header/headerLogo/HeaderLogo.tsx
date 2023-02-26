import { FC } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux';
import './headerLogo.scss';

interface IHeaderLogo {}

const HeaderLogo: FC<IHeaderLogo> = () => {
    const navigate: NavigateFunction = useNavigate();
    const routes = useAppSelector(state => state.storeRoutes.value);

    function routeToMainPage() {
        return navigate(routes.content.path);
    }
    return(
        <div 
            className='header-logo'
            onClick={routeToMainPage}
        >
            Здесь должно быть ваше лого
        </div>
    );
}

export default HeaderLogo;