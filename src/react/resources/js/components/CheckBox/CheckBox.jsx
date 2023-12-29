import {useState} from "react";

const CheckBox = ({   id,
                      name,
                      field,
                      handleChange,
                      ...props}) => {

    const [checked, setChecked] = useState(false);

    const handleChangeWrapper = () => {
        console.log('checked: ' + checked);
        setChecked(!checked);
        console.log('checked after: ' + checked);
        handleChange(props.userId, field, checked);
    }

    return (
        <input id={id} name={name} type="checkbox" onChange={handleChangeWrapper}></input>
    )

}

export default CheckBox;