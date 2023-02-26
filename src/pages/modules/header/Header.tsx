import { FC } from 'react';
import SearchIcon from './searchIcon/SearchIcon';
import ManageProfileBlock from './manageProfileBlock/ManageProfileBlock';
import HeaderLogo from './headerLogo/HeaderLogo';

import './header.scss';

interface IHeader {}

const Header: FC<IHeader> = () => {
    return(
        <div className='main-page-header'>
            <HeaderLogo/>
            <form 
                className="input-serach-wrapper"
            >
                <SearchIcon/>
                <input className='serach-content-input'/>
            </form>
            <ManageProfileBlock/>
        </div>
    );
}

export default Header;