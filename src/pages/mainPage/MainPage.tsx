import { FC } from 'react';
import ContentWrapper from './contentWrapper/ContentWrapper';
import Footer from './footer/Footer';
import Header from '../modules/header/Header';

import './mainPage.scss';

interface IMainPage {}

const MainPage: FC<IMainPage> = () => {
    return(
        <div className="main-page">
            <Header/>
            <ContentWrapper/>
            <Footer/>
        </div>
    );
}

export default MainPage;