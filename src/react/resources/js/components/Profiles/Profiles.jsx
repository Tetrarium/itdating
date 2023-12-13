import axios from "axios";
import {useEffect, useState} from "react";
import './Profiles.scss'

function Profiles(props) {
    const [ users, setUsers ] = useState([]);

    const getUsers = async () => {
        let result = [];
        await axios({
            method: 'get',
            url: '/users',
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        }).then((response) => {
            console.log('getUsers resp');
            console.log(response);
            const { data } = response;
            result = {data}

        })
            .catch((err) => {
                console.log('Ошибка получения данных');
                console.log(err);
            })
        return result;
        /*return () => {

        }*/
    }

    const fillContent = async () => {
        const users =  await getUsers();
        console.log('users: ' + JSON.stringify(users.data.data));
        //setImagesList(users.data.data);
        setUsers(users.data.data);

    }

    useEffect(() => {

    }, []);

    useEffect(() => {
        fillContent();
    }, []);

    return (
        <div className="main__profiles">
        {users.map(((user, index) => {
                if (index % 5 === 0 && index < 15)
                    return (
                        <div className="profiles__row">
                            <div className="profiles__card">
                                <div className="card__photo">
                                    <img loading="lazy" src={users[index].photo_url} alt={users[index].name}></img>
                                    {/*<img loading="eager" src={users[index].photo_url} alt={users[index].name}></img>*/}
                                </div>
                                <div className="card__info">
                                    <div className="info__nickname">
                                        {users[index].name}, {users[index].info.age}
                                        <div className="info__online">

                                        </div>
                                    </div>
                                    <div className="info__location">
                                        {users[index].info.city}
                                    </div>
                                    <div className="info__last-visit">
                                        Была сегодня в 09:15
                                    </div>

                                </div>
                            </div>

                            <div className="profiles__card">
                                <div className="card__photo">
                                    <img loading="lazy" src={users[index + 1].photo_url} alt={users[index + 1].name}></img>
                                </div>
                                <div className="card__info">
                                    <div className="info__nickname">
                                        {users[index + 1].name}, {users[index + 1].info.age}
                                        <div className="info__online">

                                        </div>
                                    </div>
                                    <div className="info__location">
                                        {users[index + 1].info.city}
                                    </div>
                                    <div className="info__last-visit">
                                        Была сегодня в 09:15
                                    </div>

                                </div>
                            </div>

                            <div className="profiles__card">
                                <div className="card__photo">
                                    <img loading="lazy" src={users[index + 2].photo_url} alt={users[index + 2].name}></img>
                                </div>
                                <div className="card__info">
                                    <div className="info__nickname">
                                        {users[index + 2].name}, {users[index + 2].info.age}
                                        <div className="info__online">

                                        </div>
                                    </div>
                                    <div className="info__location">
                                        {users[index + 2].info.city}
                                    </div>
                                    <div className="info__last-visit">
                                        Была сегодня в 09:15
                                    </div>

                                </div>
                            </div>

                            <div className="profiles__card">
                                <div className="card__photo">
                                    <img loading="lazy" src={users[index + 3].photo_url} alt={users[index + 3].name}></img>
                                </div>
                                <div className="card__info">
                                    <div className="info__nickname">
                                        {users[index + 3].name}, {users[index + 3].info.age}
                                        <div className="info__online">

                                        </div>
                                    </div>
                                    <div className="info__location">
                                        {users[index + 3].info.city}
                                    </div>
                                    <div className="info__last-visit">
                                        Была сегодня в 09:15
                                    </div>

                                </div>
                            </div>

                            <div className="profiles__card">
                                <div className="card__photo">
                                    <img loading="lazy" src={users[index + 4].photo_url} alt={users[index + 4].name}></img>
                                </div>
                                <div className="card__info">
                                    <div className="info__nickname">
                                        {users[index + 4].name}, {users[index + 4].info.age}
                                        <div className="info__online">

                                        </div>
                                    </div>
                                    <div className="info__location">
                                        {users[index + 4].info.city}
                                    </div>
                                    <div className="info__last-visit">
                                        Была сегодня в 09:15
                                    </div>

                                </div>
                            </div>

                        </div>


                    )
            }))
        }
        </div>
    )
}

export default Profiles;