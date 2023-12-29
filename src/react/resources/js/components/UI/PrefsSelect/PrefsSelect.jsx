import './PrefsSelect.scss';

function getStringifyValue(value) {
    if (typeof value === 'number') {
        if (value === 0) {
            return 'нет';
        }
        if (value === 1) {
            return 'да';
        }
    }

    if (typeof value === 'string') {
        if (value.length === 0) {
            return 'Не указывать'
        } else {
            return value;
        }
    }

    return 'Неизвесное значение';
}

function PrefsSelect({ label, name, prefs, value, onChange }) {
    return (
        <label className="prefs-select">
            <span className="prefs-select__title">{label}:</span>
            <select
                className="prefs-select__value"
                name={name}
                value={value}
                onChange={onChange}
            >
                {prefs
                    && prefs.map((value) =>
                        <option
                            key={value}
                            value={value}
                        >{getStringifyValue(value)}</option>)
                }
            </select>
        </label>
    )
}

export default PrefsSelect;
