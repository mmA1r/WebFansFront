import { FC, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

import './signUpBlock.scss';
import ThemeChangerButton from '../modules/themeChangeButton/ThemeChangeButton';

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
        </div>
    );
}

export default SignUpBlock;