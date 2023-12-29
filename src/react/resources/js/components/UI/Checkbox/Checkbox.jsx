import { useState } from "react";

import './Checkbox.scss';

function Checkbox({ label, checked, ...props }) {
    const defaultChecked = checked ? checked : false;
    const [ isChecked, setIsChecked ] = useState(defaultChecked);

    const baseClass = 'checkbox';
    const checkedModificator = '_checked';

    const getFullClass = (elemName) => {
        const fullElemClass = baseClass + elemName;

        if (isChecked) {
            return fullElemClass + ' ' + fullElemClass + checkedModificator;
        }

        return fullElemClass;
    }

    return (
        <div className="checkbox">
            <label>
                <input
                    type="checkbox"
                    className={getFullClass('__input')}
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                    {...props}
                />
                <span className="checkbox__label">{label}</span>
                <p>{isChecked ? 'Selected' : 'Unselected'}</p>
            </label>
        </div>
    );
}

export default Checkbox;
