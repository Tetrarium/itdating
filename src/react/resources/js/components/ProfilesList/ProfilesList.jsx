import { useEffect, useState } from "react";
import { fetchFilter } from "../../fetchingAPI/users";
import { useSelector } from "react-redux";

import './ProfilesList.scss'

import ProfileCard from "../ProfileCard/ProfileCard";

function ProfilesList({profileClicked = (profile, userId) => { }}) {
    const [ users, setUsers ] = useState([]);
    // const [ clicked, setClicked ] = useState(false);
    // const [ userId, setUserId ] = useState(-1);
    const [ page, setPage ] = useState(1);
    const [ lastPage, setLastPage ] = useState(1);

    const [ meta, setMeta ] = useState({});

    const filter = useSelector(state => state.filterReducer);
    
    useEffect(() => {
        // console.log('useEffect filter');
        // console.log(filter);
        // console.log(page);
        loadStartContent();
    }, [filter]);

    const loadContent = async (page, users) => {
        const result =  await fetchFilter({ page, filter });
        // console.log(result);

        if (result.ok) {
            setUsers([ ...users, ...result.users ]);
            setMeta(result.meta);
        }
    }

    const loadStartContent = async () => {
        loadContent(1, []);
    };

    const addContent = async (nextPage) => {
        loadContent(nextPage, users);
    };

    useEffect(() => {
        loadStartContent();
    }, [])

    const handleLoadNextPage = (evt) => {
        evt.preventDefault();
        // console.log(meta);

        const currentPage = meta.current_page;
        const lastPage = meta.last_page;

        // console.log(currentPage);

        if (currentPage < lastPage) {
            addContent(currentPage + 1);
        }
    };

    if (users.length === 0) {
        return (
            <div className="profiles-list">Пользователи не найдены</div>
        )
    }

    return (
        <div className="profiles-list">
            <div className="profiles-list__main">
                {users.map(
                    (user) => (
                        <ProfileCard
                            key={user.id}
                            user={user}
                        />
                    ))
                }
            </div>

            {meta.current_page < meta.last_page &&
                <div className="profiles-list__control">
                    <button
                        type="button"
                        onClick={handleLoadNextPage}
                        className="profiles-list__btn"
                    >Загрузить еще</button>
                </div>
            }
        </div>
    )
}

export default ProfilesList;