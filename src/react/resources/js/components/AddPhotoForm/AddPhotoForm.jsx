import { useState } from 'react';
import './AddPhotoForm.scss';

function AddPhotoForm({ name, onClose, onSubmit }) {
    const getClassName = (name = '') => {
        return 'form-add-photo' + name;
    }

    const [state, setState] = useState({
        photo_url: '',
    });

    const handleChange = (evt) => {
        console.log(evt);
        evt.preventDefault();

        const { name, value } = evt.target;

        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(evt);

        onSubmit({
            name,
            value: state[name],
        })

        onClose();

        console.log(state);
    }

    return (
        <form action="" className={getClassName()} onSubmit={handleSubmit}>
            <div className={getClassName('__main')}>
                <div className={getClassName("__description")}>
                    Укажите адрес фото:
                </div>
                <div className={getClassName("__row")}>
                    <input
                        type="text"
                        className={getClassName('__input')}
                        name={name}
                        value={state[name]}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className={getClassName('__controls')}>
                <button type='submit' className={getClassName('__button')}>Добавить</button>
            </div>
        </form>
    );
}

export default AddPhotoForm;
