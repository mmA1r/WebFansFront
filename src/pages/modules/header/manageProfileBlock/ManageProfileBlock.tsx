import { FC, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import OpenManageBlockArrow from './openManageBlockArrow/OpenManageBlockArrow';
import UserImage from './userImage/UserImage';
import PopUpMenu from './popUpMenu/PopUpMenu';
import MessageButton from './messageButton/MessageButton';
import './manageProfileBlock.scss';

interface IManageProfileBlick {}

const ManageProfileBlock: FC<IManageProfileBlick> = () => {

    const [isOpenMenu, setIsOpenMenu] = useState(0);
    const arrowButton:any = useRef(null);

    useEffect(() => {
        document.addEventListener('click', onClickHandler);

        return function() {
            document.removeEventListener('click', onClickHandler);
        }
    });

    function onClickHandler(e:any) {
        const target:any = e.target;
        if(
            target === document.querySelector('.open-manage-block-arrow') || 
            target === document.querySelector('.manage-block-arrow-elem')
        ) {
            return isOpenMenu ? closePopUpMenu() : openPopUpMenu();
        } else if(
            target !== document.querySelector('.pop-up-menu') && 
            target !== document.querySelector('.settings-block') &&
            target !== document.querySelector('.profile-actions-block') &&
            target !== document.querySelector('.mini-profile-block')
        ) {
            return closePopUpMenu();
        }
    }

    function openPopUpMenu():void {
        setIsOpenMenu(1);
        const buttonsCount = document.querySelectorAll('.manage-button').length;
        const buttonHeight = 30;
        const menuHeight = 150 + buttonHeight * buttonsCount;
        const tl: gsap.core.Timeline = gsap.timeline();
        tl.set('.pop-up-menu', {
            display: 'flex'
        });
        tl.to('.pop-up-menu', {
            height: menuHeight,
            ease: 'power1.out',
        }, '>');
        tl.to(arrowButton.current, {
            rotateZ: -180,
            duration: .4
        }, '<');
        tl.to('.manage-button', {
            height: buttonHeight,
            opacity: 1,
            duration: .4
        }, '<');
        tl.to('.theme-changer-button, .sun-icon, .moon-icon', {
            height: 30,
            width: 30,
            duration: 0.4
        }, '<');
    }

    function closePopUpMenu(): void {
        arrowButton.current.blur();
        setIsOpenMenu(0);
        const tl: gsap.core.Timeline = gsap.timeline();
        tl.to('.pop-up-menu', {
            height: 0,
            ease: 'power1.out'
        }, '<');
        tl.to(arrowButton.current, {
            rotateZ: 0,
            duration: .4
        }, '<');
        tl.to('.manage-button', {
            height: 0,
            opacity: 0,
            duration: .4,
        }, '<');
        tl.to('.theme-changer-button, .sun-icon, .moon-icon', {
            height: 0,
            width: 0,
            duration: 0.4
        }, '<');
        tl.set('.pop-up-menu', {
            display: 'none'
        }, '>');
    }

    function checkFocus():any {
        return isOpenMenu ? arrowButton.current.focus() : arrowButton.current.blur();
    }

    return(
        <div
            className='manage-profile-block'
        >   
            <MessageButton/>
            <UserImage/>
            <button
                className='manage-arrow-button'
                ref={arrowButton}
                onBlur={checkFocus}
            >
                <OpenManageBlockArrow/>
            </button>
            <PopUpMenu/>
        </div>
    );
}

export default ManageProfileBlock;