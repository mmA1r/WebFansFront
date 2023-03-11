import { FC, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import OpenManageBlockArrow from './openManageBlockArrow/OpenManageBlockArrow';
import UserImage from './userImage/UserImage';
import PopUpMenu from './popUpMenu/PopUpMenu';
import MessageButton from './messageButton/MessageButton';
import './manageProfileBlock.scss';

interface IManageProfileBlick {}

const ManageProfileBlock: FC<IManageProfileBlick> = () => {

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const arrowButton:any = useRef(null);

    useEffect(() => {
        document.addEventListener('click', onDocumentClickHandler);

        return function() {
            document.removeEventListener('click', onDocumentClickHandler);
            return;
        }
    });

    function onDocumentClickHandler(e:any):void {
        const clickTarget: any = e.target;
        const isButtonClick = arrowButton.current.contains(clickTarget);
        const isPopUpMenuClick = checkClickTarget(clickTarget);

        if(isButtonClick) {
            isOpenMenu ? closePopUpMenu() : openPopUpMenu();
            return;
        }

        if(!isPopUpMenuClick && !isButtonClick) {
            closePopUpMenu();
            return;
        }
        return;
    }

    function checkClickTarget(clickTarget:any):boolean {
        const popUpMenu = document.querySelector('.pop-up-menu');
        if(popUpMenu?.contains(clickTarget)) {
            return true;
        }
        return false;
    }

    function openPopUpMenu():void {
        setIsOpenMenu(true);
        openAnimation();
        return;
    }

    function openAnimation():void {
        const buttonsCount = document.querySelectorAll('.manage-button').length;
        const buttonHeight = 30;
        const menuHeight = 150 + buttonHeight * buttonsCount;
        gsap.to('.pop-up-menu', {
            height: menuHeight,
            ease: 'power1.out',
            duration: .4
        });
        gsap.to(arrowButton.current, {
            rotateZ: -180,
            duration: .4
        });
        gsap.to('.manage-button', {
            height: buttonHeight,
            opacity: 1,
            duration: .4
        });
        gsap.to('.theme-changer-button, .sun-icon, .moon-icon', {
            height: 30,
            width: 30,
            duration: .4
        });
        return;
    }

    function closePopUpMenu():void {
        setIsOpenMenu(false);
        closeAnimation();
        return;
    }

    function closeAnimation():void {
        gsap.to('.pop-up-menu', {
            height: 0,
            ease: 'power1.out',
            duration: .4
        });
        gsap.to(arrowButton.current, {
            rotateZ: 0,
            duration: .4
        });
        gsap.to('.manage-button', {
            height: 0,
            opacity: 0,
            duration: .4,
        });
        gsap.to('.theme-changer-button, .sun-icon, .moon-icon', {
            height: 0,
            width: 0,
            duration: .4
        });
        return;
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
            >
                <OpenManageBlockArrow/>
            </button>
            <PopUpMenu/>
        </div>
    );
}

export default ManageProfileBlock;