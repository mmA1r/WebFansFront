import { FC, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import ThemeChangerButton from '../../../../modules/themeChangeButton/ThemeChangeButton';
import Inputs from '../inputs/Inputs';

import './signInBlock.scss';

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
            <Inputs types={types} title={'sign in'} routeButton={{class: 'route-to-sign-up', title: 'Sign Up'}}/>
        </div>
    );
}

export default SignInBlock;