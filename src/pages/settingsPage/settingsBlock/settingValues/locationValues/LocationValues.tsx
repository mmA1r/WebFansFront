import { FC } from "react";
import './locationValues.scss';

interface ILocationValues {};

const LocationValues: FC<ILocationValues> = () => {
    return(
        <div className="setting-value-type location-settings-type-values"></div>
    );
}

export default LocationValues;