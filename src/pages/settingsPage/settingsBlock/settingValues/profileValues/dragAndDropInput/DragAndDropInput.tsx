import { FC, useRef } from "react";
import server from "../../../../../../services/server/Server";
import UploadIcon from "./uploadIcon/UploadIcon";
import axios from "axios";

import './dragAndDropInput.scss';

interface IDragAndDropInput {
    inputType: number;
        // 1 - drag`nDrop for avatar
        // 2 - drag`nDrop for cover
}

const DragAndDropInput: FC<IDragAndDropInput> = ({ inputType }) => {
    const className = (
        inputType === 1 ? '-avatar' :
        inputType === 2 ? '-cover' : ''
    );
    const label = (
        inputType === 1 ? 'Upload new avatar' :
        inputType === 2 ? 'Change cover' : ''
    );

    const fileInputRef: any = useRef(null);

    function dragStartHandler(e:React.DragEvent):void {
        e.preventDefault();
        return;
    }

    function dragEndHandler(e:React.DragEvent):void {
        e.preventDefault();
        return;
    }

    async function onDropHandler(e:React.DragEvent) {
        e.preventDefault();
        const file: File = e.dataTransfer.files[0];
        handleFile(file);
        return;
    }

    async function handleFile(file: File) {
        const type: string = file.type.replace(/\/.+/, '');
        if(type === 'image') {
            await server.uploadUserImage(file, 'avatar');
        }
        return;
    }

    function onClickHandler(e: any) {
        if(e.target !== fileInputRef.current) {
            fileInputRef.current.click();
        }
        return;
    }

    function onInputChangeHandler() {
        const file: File = fileInputRef.current.files[0];
        handleFile(file);
        return;
    }

    return(
        <div 
            className={`drag-and-drop-wrapper drag-and-drop${className}-wrapper`}
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragEndHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => onDropHandler(e)}
            onClick={e => onClickHandler(e)}
        >
            <input
                className={`drag-and-drop-input drag-and-drop${className}-input`} 
                type="file"
                ref={fileInputRef}
                onChange={onInputChangeHandler}
            />
            <div className="fake-input-file-button">
                <UploadIcon/>
                <label className='drag-and-drop-input-label' htmlFor="file">{label}</label>
            </div>
        </div>
    );
}

export default DragAndDropInput;