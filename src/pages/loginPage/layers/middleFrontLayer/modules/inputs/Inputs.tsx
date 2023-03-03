import { FC, useState } from 'react';
import { gsap } from 'gsap';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../../hooks/redux';
import RouteButton from './routeButton/RouteButton';
import Server from '../../../../../../services/server/Server';

import './inputs.scss';

type IRouteButton = {
    class: string, title: string
}
interface IInputs {
    types: string[], title: string, routeButton: IRouteButton 
}
type DivElem = HTMLDivElement | null;
type Input = HTMLInputElement | null;
type InputValue = string | undefined;
type CheckInputObj = {
    wrapper: DivElem,
    input: Input
}

const Inputs: FC<IInputs> =  ({ types, title, routeButton }) => {
    const regex: RegExp = /^[A-Za-z0-9_-]{3,16}$/;
    const [message, setMessage] = useState('Login is already in use');
    const routes: any = useAppSelector((state) => state.storeRoutes.value);
    const navigate: NavigateFunction = useNavigate();

    function mouseEnterHandler() {
        const button: DivElem = document.querySelector('.login-button');
        gsap.to('.login-button-back', {
            width: button?.getBoundingClientRect().width,
            duration: 0.5
        });
        gsap.to('.border-top, .border-bottom', {
            rotateY: 180,
            duration: 0
        });
        gsap.to('.border-top, .border-bottom', {
            width: button?.getBoundingClientRect().width,
            duration: 0.5
        });
        gsap.to('.border-left, .border-right', {
            opacity: 0,
            duration:0.5
        });
    }

    function mouseLeaveHandler() {
        gsap.to('.login-button-back', {
            width: 0,
            duration: 0.5
        });
        gsap.to('.border-top, .border-bottom', {
            rotateY: -180,
            duration: 0
        });
        gsap.to('.border-top, .border-bottom', {
            width: 0,
            duration: 0.5
        });
        gsap.to('.border-left, .border-right', {
            opacity: 1,
            duration: 0.5
        });
    }

    function send(e: any):void {
        if(e.keyCode === 13) {
            const loginButton: DivElem = document.querySelector('.login-button');
            return loginButton?.click();
        }
    }

    async function signIn() {
        const loginInput: Input = document.querySelector('.login-input-login-page');
        const passwordInput: Input = document.querySelector('.password-input-login-page');
        const loginValue: InputValue = loginInput?.value;
        const passwordValue: InputValue = passwordInput?.value;

        if(loginValue && passwordValue) {
            if(regex.test(loginValue) && regex.test(passwordValue)) {
                const data: any = await Server.login(loginValue, passwordValue);
                if(data) {
                    showSuccessMessage();
                    coverInputs('login');
                    const tl1: NodeJS.Timeout = setTimeout(() => {
                        clearInputs([loginInput, passwordInput]);
                        clearTimeout(tl1);
                    }, 300);
                    const tl2: NodeJS.Timeout = setTimeout(() => {
                        navigate(routes.content.path);
                        clearTimeout(tl2);
                    }, 1100);
                } else {
                    showErrorMessage(loginInput, passwordInput);
                }
            }
        }
        
        const loginInputCheck: CheckInputObj = { 
            wrapper: document.querySelector('.login-input-wrapper-login-page'), 
            input: loginInput 
        };
        const passwordInputWrapper: CheckInputObj = {
            wrapper: document.querySelector('.password-input-wrapper-login-page'), 
            input: passwordInput
        };
        checkInputs([loginInputCheck, passwordInputWrapper]);
    }

    async function signUp() {
        const nameInput: Input = document.querySelector('.name-input-registration-page');
        const loginInput: Input = document.querySelector('.login-input-registration-page');
        const passwordInput: Input = document.querySelector('.password-input-registration-page');
        const nameValue: InputValue = nameInput?.value;
        const loginValue: InputValue = loginInput?.value;
        const passwordValue: InputValue = passwordInput?.value;

        if(nameValue && loginValue && passwordValue) {
            if(regex.test(nameValue) && regex.test(loginValue) && regex.test(passwordValue)) {
                const data: { data: boolean } = await Server.registration(nameValue, loginValue, passwordValue);
                if(data?.data) {
                    coverInputs('registration');
                    showSuccessMessage();
                    const tl: NodeJS.Timeout = setTimeout(() => {
                        clearInputs([nameInput, loginInput, passwordInput]);
                        const button: HTMLButtonElement | null = document.querySelector('.route-to-sign-in');
                        button?.click();
                        clearTimeout(tl);
                    }, 500);
                } else {
                    showErrorMessage(loginInput);
                }
            }
        }

        const nameInputWrapper: CheckInputObj = {
            wrapper: document.querySelector('.name-input-wrapper-registration-page'), 
            input: nameInput
        };
        const loginInputWrapper: CheckInputObj = {
            wrapper: document.querySelector('.login-input-wrapper-registration-page'), 
            input: loginInput
        };
        const passwordInputWrapper: CheckInputObj = {
            wrapper: document.querySelector('.password-input-wrapper-registration-page'), 
            input: passwordInput
        };
        checkInputs([nameInputWrapper, loginInputWrapper, passwordInputWrapper]);
    }

    function showErrorMessage(loginInput: Input, passwordInput: Input = null): void {
        if(passwordInput) {
            setMessage('Invalid login or password');
        } else {
            setMessage('Login is already in use');
        }

        gsap.to('.info-message', {
            top: '0',
            duration: 0.8,
            ease: 'bounce.out'
        });
        const tl1: NodeJS.Timeout = setTimeout(() => {
            if(loginInput) {
                loginInput.value = '';
                loginInput.focus();
            }
            if(passwordInput) {
                passwordInput.value = '';
            }
            clearTimeout(tl1);
        }, 300);
        const tl2: NodeJS.Timeout = setTimeout(() => {
            gsap.to('.info-message', {
                top: '-100%',
                duration: 1,
                ease: 'power2.in'
            });
            clearTimeout(tl2);
        }, 1500);
    }

    function showSuccessMessage() {
        gsap.to('.succsess-message', {
            opacity: 1,
            textShadow: '0px 0px 1px 1px',
            repeat: 1,
            duration: 0.05,
            delay: 0,
            repeatDelay: 0.3,
            yoyo: true
        });
    }

    function checkInputs(inputsArr: CheckInputObj[]): void {
        inputsArr.forEach(inputCheck => {
            const inputValue: InputValue = inputCheck.input?.value;
            if(!inputValue || !regex.test(inputValue)) {
                gsap.to(inputCheck.wrapper, {
                    borderColor: 'red',
                    duration: 0.08,
                    repeat: 5,
                    yoyo: true
                });
                if(inputCheck.input) {
                    inputCheck.input.value = '';
                }
            }
        });
    }

    function clearInputs(inputsArr: Input[]): void {
        inputsArr.forEach(input => {
            if(input) {
                input.value = '';
            }
        });
    }

    function coverInputs(type: string): void {
        gsap.to(`.${type}-page-input-cover`, {
            width: '100%',
            duration: 0.5,
            repeat: 1,
            yoyo: true
        });
    }

    return(
        <div className='info-submit-block'>
            <div className='info-message'>{message}</div>
            <div className='inputs-form'>
                {types.map(type => {
                    return (
                        <div key={type} className={`input-wrapper ${type}-input-wrapper-${types.length === 2 ? 'login-page' : 'registration-page'}`}>
                            <div className={`input-cover ${types.length === 2 ? 'login-page-input-cover' : 'registration-page-input-cover'}`}/>
                            <input
                                onKeyUp={send}
                                className={`user-input ${type}-input-${types.length === 2 ? 'login-page' : 'registration-page'}`} 
                                key={type} 
                                name={type}
                                type={type}
                                placeholder={type}
                            />
                        </div>
                    );
                })}
            </div>
            <div className='login-buttons-block'>
                <button
                    className="login-button"
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                    onClick={ types.length === 2 ? signIn : signUp }
                >
                    <span className='login-button-title'>{title}</span>
                    <div className='login-button-border border-top'/>
                    <div className='login-button-border border-bottom'/>
                    <div className='login-button-border border-left'/>
                    <div className='login-button-border border-right'/>
                    <div className='login-button-back'/>
                </button>
                <RouteButton 
                    buttonClass={routeButton.class} 
                    title={routeButton.title}
                />
            </div>

        </div>
    );
}
export default Inputs;