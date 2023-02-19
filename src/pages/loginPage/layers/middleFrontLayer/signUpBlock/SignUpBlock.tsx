import { FC, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import ThemeChangerButton from '../modules/themeChangeButton/ThemeChangeButton';
import Inputs from '../modules/inputs/Inputs';

import './signUpBlock.scss';


interface ISignUpBlock {
}

const SignUpBlock: FC<ISignUpBlock> = () => {

    const types: string[] = ['name', 'login', 'password'];

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
        <div className="sign-up-block">
            <span className='login-title'>SIGN UP</span>
            <ThemeChangerButton/>
            <Inputs types={types} title={'sign up'} routeButton={{class: 'route-to-sign-in', title: 'Sign In'}}/>
        </div>
    );
}

export default SignUpBlock;