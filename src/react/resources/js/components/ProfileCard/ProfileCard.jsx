import { useNavigate } from 'react-router-dom';
import './ProfileCard.scss';

function ProfileCard({ user }) {
    const navigate = useNavigate()

    return (
        <div className="profile-card">
            <div className="profile-card__photo">
                <img
                    key={user.id}
                    loading="lazy"
                    src={user.photo_url}
                    alt={user.name}
                    className='profile-card__img'
                    onClick={() => {
                        navigate('/homepage/users/' + user.id);
                    }}
                />
            </div>
            <div className="profile-card__info">
                <div className="profile-card__nickname">
                    {user.name}, {user.info.age}
                    <div className="profile-card__online" />
                </div>
                <div className="profile-card__location">
                    {user.info.city}
                </div>
                <div className="profile-card__last-visit">
                    { user.last_active_at || 'Была сегодня в 09:15'}
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;
