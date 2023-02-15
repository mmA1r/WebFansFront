import { useEffect, FC } from 'react';
import { gsap } from 'gsap';
import RouteButton from './routeButton/RouteButton';
import { useAppSelector } from '../../../../../../hooks/redux';

import './inputs.scss';

type IRouteButton = {
    class: string, title: string
}
interface IInputs {
    types: string[], title: string, routeButton: IRouteButton 
}
type DivElem = HTMLDivElement | null;

const Inputs: FC<IInputs> =  ({ types, title, routeButton }) => {
    const currentSlide = useAppSelector((state) => state.currentSlide.value);

    useEffect(() => {
        if(currentSlide === 0 && types.length === 3) {

        }
    });

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

    return(
        <div className='info-submit-block'>
            <div className='inputs-form'>
                {types.map(type => {
                    return (
                        <input
                            onKeyUp={send}
                            className={`user-input ${type}-input-${types.length === 2 ? 'login-page' : 'registration-page'}`} 
                            key={type} name={type} 
                            type={type}
                            placeholder={type}
                        />
                    );
                })}
            </div>
            <div className='login-buttons-block'>
                <button
                    className="login-button"
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
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