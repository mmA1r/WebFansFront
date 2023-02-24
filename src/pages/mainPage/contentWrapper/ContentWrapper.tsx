import { FC } from "react";
import './contentWrapper.scss';

interface IContentWrapper {}

const ContentWrapper: FC<IContentWrapper> = () => {
    return(
        <div className="content-wrapper">
            <div className="shadow-block"/>
        </div>
    );
}

export default ContentWrapper;