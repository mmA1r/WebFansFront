import { gsap } from "gsap";
import { useLayoutEffect, useState, FC } from "react";
import MoonIcon from "./moonIcon/MoonIcon";
import SunIcon from "./sunIcon/SunIcon";

import './themeChangerButton.scss';

interface IThemeChangerButton{

}

interface colors {
    border: string,
    particle: string,
    header: string,
    layerBack: string,
    layerFront: string,
    routeColor: string,
    textColor: string
}

const ThemeChangerButton: FC<IThemeChangerButton> = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useLayoutEffect(() => {
        const gsapContext: gsap.Context = gsap.context(() => {
            if(theme === 'dark') {
                gsap.to('.sun-icon', {
                    zIndex: -1
                });
            } else {
                gsap.to('.moon-icon', {
                    zIndex: -1
                });
            }
        });

        return () => {
            gsapContext.revert();
        }
    }, [theme]);

    function changerThemeHandler() {
        const style = getComputedStyle(document.documentElement);

        const lightStyleColors: colors = {
            border: style.getPropertyValue('--light-border'),
            particle: style.getPropertyValue('--light-particle'),
            header: style.getPropertyValue('--light-header'),
            layerBack: style.getPropertyValue('--light-back-layer'),
            layerFront: style.getPropertyValue('--light-front-layer'),
            routeColor: style.getPropertyValue('--light-route-color'),
            textColor: style.getPropertyValue('--light-text-color'),
        }
        const darkStyleColors: colors = {
            border: style.getPropertyValue('--dark-border'),
            particle: style.getPropertyValue('--dark-particle'),
            header: style.getPropertyValue('--dark-header'),
            layerBack: style.getPropertyValue('--dark-back-layer'),
            layerFront: style.getPropertyValue('--dark-front-layer'),
            routeColor: style.getPropertyValue('--dark-route-color'),
            textColor: style.getPropertyValue('--dark-text-color'),
        }
        if(theme === 'dark') {
            localStorage.setItem('theme', 'light');
            setTheme('light');
            gsap.to('body', {
                '--theme-border-color': `${lightStyleColors.border}`,
                '--theme-border-particle': `${lightStyleColors.particle}`,
                '--theme-footer-header-color': `${lightStyleColors.header}`,
                '--theme-layer-back-color': `${lightStyleColors.layerBack}`,
                '--theme-layer-front-color': `${lightStyleColors.layerFront}`,
                '--theme-route-color': `${lightStyleColors.routeColor}`,
                '--theme-text-color': `${lightStyleColors.textColor}`,
                duration: 1,
                ease: "sine.inOut"
            });
            gsap.to('.moon-icon', {
                x: '-120%',
                duration: 0.5,
                opacity: 0,
            });
            gsap.fromTo('.sun-icon', {
                x: '120%',
                opacity: 0,
            } ,{
                x: 0,
                opacity: 1
            });
            gsap.delayedCall(1, () => {
                document.body.setAttribute('class', 'light');
            })
        } else {
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
            gsap.to('.sun-icon', {
                x: '-120%',
                duration: 0.5,
                opacity: 0,
            });
            gsap.fromTo('.moon-icon', {
                x: '120%',
                opacity: 0,
            } ,{
                x: 0,
                opacity: 1
            });
            gsap.to('body', {
                '--theme-border-color': `${darkStyleColors.border}`,
                '--theme-border-particle': `${darkStyleColors.particle}`,
                '--theme-footer-header-color': `${darkStyleColors.header}`,
                '--theme-layer-back-color': `${darkStyleColors.layerBack}`,
                '--theme-layer-front-color': `${darkStyleColors.layerFront}`,
                '--theme-route-color': `${darkStyleColors.routeColor}`,
                '--theme-text-color': `${darkStyleColors.textColor}`,
                duration: 1,
                ease: "sine.inOut"
            });
            gsap.delayedCall(1, () => {
                document.body.setAttribute('class', 'dark');
            })
        }
    }

    return(
        <button 
            className="theme-changer-button"
            onClick={changerThemeHandler}
        >
            <SunIcon/>
            <MoonIcon/>
        </button>
    );
}

export default ThemeChangerButton;