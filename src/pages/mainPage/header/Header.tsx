import { FC } from 'react';
import gsap from 'gsap';
import SearchIcon from './searchIcon/SearchIcon';

import './header.scss';

interface IHeader {}

const Header: FC<IHeader> = () => {

    //console.log(window.getComputedStyle(document.documentElement).getPropertyValue('--theme-border-color'))

    //function onMouseEnterHandler() {
    //    gsap.to('.serach-content-input', {
    //        border: '2px solid',
    //        duration: 1
    //    });
    //}

    //function onMouseLeaveHandler() {
    //    gsap.to('.serach-content-input', {
    //        borderColor: 'transparent',
    //        duration: 1
    //    });
    //}

    return(
        <div className='main-page-header'>
            <form 
                className="input-serach-wrapper"
            >
                <SearchIcon/>
                <input className='serach-content-input'/>
            </form>
        </div>
    );
}

export default Header;