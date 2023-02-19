import { FC } from 'react';
import { gsap } from 'gsap';
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

const Inputs: FC<IInputs> =  ({ types, title, routeButton }) => {
    const regex: RegExp = /^[A-Za-z0-9_-]{3,16}$/;

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
            duration:0.5
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
                const data: boolean | null = await Server.login(loginValue, passwordValue);
                if(data) {
                    //if(loginInput || passwordInput || ) {
                    //    loginInput.value = '';
                    //}
                }
            }
        }
        if(!loginValue || !regex.test(loginValue)) {
            gsap.to('.login-input', {
                borderColor: 'red',
                duration: 0.08,
                repeat: 5,
                yoyo: true
            });
            if(loginInput) {
                loginInput.value = '';
            }
        }
        if(!passwordValue || !regex.test(passwordValue)) {
            gsap.to('.password-input', {
                borderColor: 'red',
                duration: 0.08,
                repeat: 5,
                yoyo: true
            });
            if(passwordInput) {
                passwordInput.value = '';
            }
        }
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
                if(data.data) {
                    if(nameInput) {
                        nameInput.value = '';
                    }
                    if(loginInput) {
                        loginInput.value = '';
                    }
                    if(passwordInput) {
                        passwordInput.value = '';
                    }
                    setTimeout(() => {
                        const button: HTMLButtonElement | null = document.querySelector('.route-to-sign-in');
                        button?.click();
                    }, 300)
                } else {
                    //добавить сообщение хз
                }
            }
        }
        if(!nameValue || !regex.test(nameValue)) {
            gsap.to('.name-input', {
                borderColor: 'red',
                duration: 0.08,
                repeat: 5,
                yoyo: true
            });
            if(nameInput) {
                nameInput.value = '';
            }
        }
        if(!loginValue || !regex.test(loginValue)) {
            gsap.to('.login-input', {
                borderColor: 'red',
                duration: 0.08,
                repeat: 5,
                yoyo: true
            });
            if(loginInput) {
                loginInput.value = '';
            }
        }
        if(!passwordValue || !regex.test(passwordValue)) {
            gsap.to('.password-input', {
                borderColor: 'red',
                duration: 0.08,
                repeat: 5,
                yoyo: true
            });
            if(passwordInput) {
                passwordInput.value = '';
            }
        }
    }

    return(
        <div className='info-submit-block'>
            <div className='inputs-form'>
                {types.map(type => {
                    return (
                        <div key={type} className={`input-wrapper ${type}-input`}>
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