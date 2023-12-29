import React, {useEffect, useState} from "react";

import './Editable.scss'

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
                      field,
                      handleClick,
                      childRef,
                      text,
                      type,
                      placeholder,
                      children,
                      ...props
                  }) => {
    // Manage the state whether to show the label or the input box. By default, label will be shown.
// Exercise: It can be made dynamic by accepting initial state as props outside the component
    const [isEditing, setEditing] = useState(false);

    const [userId, setUserId] = useState(props.userId);

    /*
    using use effect, when isEditing state is changing, check whether it is set to true, if true, then focus on the reference element
    */
    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
        }
    }, [isEditing, childRef]);


// Event handler while pressing any key while editing
    const handleKeyDown = (event, type) => {
        // Handle when key is pressed
    };

    /*
    - It will display a label is `isEditing` is false
    - It will display the children (input or textarea) if `isEditing` is true
    - when input `onBlur`, we will set the default non edit mode
    Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
    */
    return (
        <span className="editable">
            {isEditing ? (
                <span
                    onBlur={() => {
                        setEditing(false);
                        handleClick(props.userId, field, { text })
                        // handleClick(props.userId, {text})
                    }}
                    onKeyDown={e => handleKeyDown(e, type)}
                >
                    {children}
                </span>
            ) : (
                <span
                    onClick={() => setEditing(true)}
                >
                    {text || placeholder || "Edit content"}
                </span>
            )}
        </span>
    );
};

export default Editable;