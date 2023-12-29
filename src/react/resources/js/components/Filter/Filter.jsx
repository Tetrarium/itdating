import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, clearFilter } from '../../store/reducers/FilterSlice';

import './Filter.scss';

const renderOptions = (from, to) => {
    const elems = [];

    for (let i = from; i <= to; i++) {
        elems.push(<option key={i} value={i} >{i}</option>)
    }

    return elems;
}


function Filter() {
    const { name, gender, city, country, age_min, age_max } = useSelector(state => state.filterReducer);
    const dispatch = useDispatch();

    const minAge = 18;
    const maxAge = 70;

    const changeFilterHandler = (evt) => {
        evt.preventDefault();

        const { name, value } = evt.target;

        dispatch(changeFilter({
            key: name,
            value: value,
        }));
    }

    const [numShowedTags, setNumShowedTags] = useState(3);

    const renderTags = () => {
        // return tags.slice(0, numShowedTags).map(
        //     (tag) => <div key={tag} className='tags__tag'>{tag}</div>
        // )
    }

    const addShowedTags = () => {
        const numAdd = tags.length - numShowedTags;

        setNumShowedTags(numShowedTags + numAdd < 5 ? numAdd : 5);
    }

    const handleClear = (evt) => {
        evt.preventDefault();

        dispatch(clearFilter());
    }

    const defaultValue = "";

    return (
        <div className="filter">
            <div className="container filter__container">
                Я ищу: 
                <input
                    className='filter__search filter__input'
                    name='name'
                    value={name}
                    placeholder='Введите имя'
                    onChange={changeFilterHandler}
                />
          
                <div className="filter__gender">
                    <select
                        name="gender"
                        className="filter__input"
                        value={gender}
                        onChange={changeFilterHandler}
                    >
                        <option value="">Любого пола</option>
                        <option value="мужчина">Мужчину</option>
                        <option value="женщина">Женщину</option>
                    </select>
                </div>
                <div className="filter__age">
                    <span className="filter__hint">Возрастом от
                        <select
                            className='filter__age-select'
                            name='age_min'
                            value={age_min}
                            onChange={changeFilterHandler}
                        >
                            {renderOptions(minAge, age_max)}
                        </select>
                        до
                        <select
                            className='filter__age-select'
                            name='age_max'
                            value={age_max}
                            onChange={changeFilterHandler}
                        >
                            {renderOptions(age_min, maxAge)}
                        </select>
                    </span>
                </div>
                <div className="filter__city">
                    <span className="filter__hint">из: </span>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        className="filter__input"
                        onChange={changeFilterHandler}
                        placeholder='Город'
                    />
                </div>
                <div className="filter__city">
                    <span className="filter__hint">из: </span>
                    <input
                        type="text"
                        name="country"
                        value={country}
                        className="filter__input"
                        onChange={changeFilterHandler}
                        placeholder='Страна'
                    />
                </div>
                <div className="filter__tags tags">
                    <span className="tags__title">Теги:</span>
                    <div className="tags__items">
                        <button className="tags__tag">+</button>
                        {renderTags()}
                        {/* {numShowedTags < tags.length
                            && <button
                                className="tags__tag"
                                onClick={addShowedTags}
                            >еще {tags.length - numShowedTags}..</button>
                        } */}
                        
                    </div>
                </div>
                <button
                    className="filter__opn-all filter__input"
                    onClick={handleClear}
                >Очистить</button>
                <button
                    className="filter__opn-all filter__input"
                >Все фильтры</button>
            </div>
        </div>
    );
};


export default Filter;
