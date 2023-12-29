import { useState } from "react";
import { debounce } from "../../../assets/utility";

import './DebouncingInput.scss';

function DebouncingInput(props) {
    const debouncingChange = debounce(props.onChange, 1000);

    // const handleChange = (data) => {
    //     debouncingChange(data);
    // }
    // console.log(props.reference);

    switch (props.type) {
        case 'checkbox':
            return <ControlledCheckbox
                {...props}
                onChange={debouncingChange}
            />;

        default:
            return <ControlledTextInput
                {...props}
                onChange={debouncingChange}
            />
    }


}

function ControlledTextInput(props) {
    const [state, setState] = useState({
        [props.name]: props.value
    });

    const handleChange = (evt) => {
        evt.preventDefault();

        const { name, value } = evt.target;
        setState({
            ...state,
            [name]: value,
        });

        props.onChange({
            name,
            value,
        });
    }

    return <input
        {...props}
        ref={props.reference}

        type="text"
        value={state[props.name]}
        onChange={handleChange}
    />
}

function ControlledCheckbox(props) {
    const [ checked, setChecked ] = useState(props.checked === 1);

    const handleChange = () => {
        const currentChecked = !checked;

        setChecked(currentChecked);

        props.onChange({
            name: props.name,
            value: currentChecked ? 1 : 0,
        });

    }

    return <input
        {...props}

        name={props.name}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
    />
}

export default DebouncingInput;
