import { useRef, useState } from "react";
import Editable from "../Editable/Editable";
import DebouncingInput from "../DebouncingInput/DebouncingInput";

function EditableInput(props) {
    const inputRef = useRef(null);

    return (
        <>
            <Editable
                handleClick={ props.handleClick || (() => null)}
                childRef={inputRef}
                text={props.info && props.info[props.name] }
                placeholder={props.placeholder}
            >
                <DebouncingInput
                    reference={inputRef}
                    type={ props.type || "text"}
                    name={props.name || ''}
                    placeholder={props.placeholder || ''}
                    value={ props.info && props.info[props.name] || ''}
                    onChange={props.onChange || (() => null)}
                />
            </Editable>
        </>
    )
}

export default EditableInput;