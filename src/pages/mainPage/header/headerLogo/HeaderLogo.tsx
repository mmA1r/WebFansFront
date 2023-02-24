import { FC } from 'react';
import './headerLogo.scss';

interface IHeaderLogo {}

const HeaderLogo: FC<IHeaderLogo> = () => {
    return(
        <div className='header-logo'></div>
    );
}

export default HeaderLogo;