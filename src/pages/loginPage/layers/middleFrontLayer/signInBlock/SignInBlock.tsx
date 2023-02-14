import { FC, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

import './signInBlock.scss';
import ThemeChangerButton from '../modules/themeChangeButton/ThemeChangeButton';

interface ISignInBlock {
}

const SignInBlock: FC<ISignInBlock> = () => {

    const types: string[] = ['login', 'password'];

    useLayoutEffect(() => {
        const gsapContext: gsap.Context = gsap.context(() => {
            gsap.to('.login-title', {
                textShadow: '0px 0px 2px',
                delay: 0.5,
                ease: 'none'
            });
        });

        return () => {
            gsapContext.revert();
        }
    });


    return(
        <div className='sign-in-block'>
            <span className='login-title'>SIGN IN</span>
            <ThemeChangerButton/>
        </div>
    );
}

export default SignInBlock;