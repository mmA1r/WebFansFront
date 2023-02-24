import { FC, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import OpenManageBlockArrow from './openManageBlockArrow/OpenManageBlockArrow';
import UserImage from './userImage/UserImage';
import PopUpMenu from './popUpMenu/PopUpMenu';
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
        } else if(target !== document.querySelector('.pop-up-menu')) {
            return closePopUpMenu();
        }
    }

    function openPopUpMenu():void {
        gsap.to('.pop-up-menu', {
            height: 400,
            ease: 'power1.out',
        });
        gsap.to(arrowButton.current, {
            rotateZ: -180,
            duration: .4
        });
        setIsOpenMenu(1);
    }

    function closePopUpMenu(): void {
        gsap.to('.pop-up-menu', {
            height: 0,
            ease: 'power1.out'
        });
        gsap.to(arrowButton.current, {
            rotateZ: 0,
            duration: .4
        });
        arrowButton.current.blur();
        setIsOpenMenu(0);
    }

    function checkFocus():any {
        return isOpenMenu ? arrowButton.current.focus() : null;
    }

    return(
        <div
            className='manage-profile-block'
        >
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