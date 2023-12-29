import { useState } from 'react';

import './PrefEnums.scss';

import DebouncingInput from '../UI/DebouncingInput/DebouncingInput';

function PrefEnums({ info, onChange, features }) {

    const [isEdit, setIsEdit] = useState(false);

    const isShowFeature = (feature) => {
        if (typeof feature === 'string') {
            return feature.length > 0;
        }

        return feature === 1;
    }

    const getFeature = ({ key, info, map }) => {
        if (typeof info[key] === 'number') {
            return map[key];
        }

        return info[key];
    }

    const handleOpenEditor = (evt) => {
        evt.preventDefault();
        setIsEdit(true);
    }

    const handleCloseEditor = (evt) => {
        evt.preventDefault();
        setIsEdit(false);
    }

    return (
        <div className="pref-enums">
            {isEdit
                ?
                <div className="pref-enums__items pref-enums__items_edit">
                    {Object.keys(features).map((key) => {
                        if (typeof info[key] === 'string') {
                            return (
                                <label className="pref-enums__item" key={key}>
                                    <span>Другое: </span>
                                    <DebouncingInput
                                        type='text'
                                        name={key}
                                        value={info[key]}
                                        onChange={onChange}
                                    />
                                </label>
                            )
                        }

                        return (
                            <label className="pref-enums__item" key={key}>
                                <DebouncingInput
                                    type='checkbox'
                                    name={key}
                                    checked={info[key]}
                                    onChange={onChange}
                                />
                                <span>{getFeature({ key, info, map: features })}</span>
                            </label>
                        )
                    })}
                    <button className="pref-enums__btn btn" onClick={handleCloseEditor}>
                        <span className="material-symbols-outlined">
                            done
                        </span>
                    </button>
                </div>
                :
                <div className="pref-enums__items">
                    {Object.entries(features).map(([key, value]) => {
                        if (isShowFeature(info[key])) {
                            return <div key={key} className="pref-enums__item">{getFeature({ key, info, map: features })}</div>
                        }
                    })}
                    <button className="pref-enums__btn" onClick={handleOpenEditor}>
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                </div>
            }
        </div>
    )
}

export default PrefEnums;
