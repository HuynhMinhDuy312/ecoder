import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Link,
    useNavigate,
    useOutletContext,
} from 'react-router-dom';
import './Navigation.scss';
import { UserContext } from '@components/context';
import logo from '@assets/image/logo.jpg';

import controllers from '@controllers/controller-factory';

function Navigation({ setUser }) {
    const user = React.useContext(UserContext);
    const navigate = useNavigate();

    const onSignOutClick = (e) => {
        controllers.user.signOut(setUser);
    };

    React.useEffect(() => {
        const closeNavUser = (e) => {
            setOpen(false);
        };

        document.addEventListener('click', closeNavUser);

        return () => {
            document.removeEventListener('click', closeNavUser);
        };
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleOpen = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };

    const [searchText, setSearchText] = React.useState('');
    const handleSearchClick = () => {
        if (searchText) {
            navigate(`/courses/search?q=${searchText}`);
        }
    };

    return (
        <div className="nav">
            <Link to="/">
                <img
                    src={logo}
                    alt="ECoder logo"
                    className="nav__logo"
                />
            </Link>
            <div className="nav__search">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="nav__search-icon"
                    onClick={handleSearchClick}
                />
                <input
                    placeholder="Tìm kiếm khóa học"
                    className="nav__search-input"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchClick();
                        }
                    }}
                />
            </div>
            {/* {controllers.user.getCurrentUser() == null ? (
                <Link to="/authentication" className="nav__signin">
                    Đăng nhập
                </Link>
            ) : (
            )} */}
            {!user.token ? (
                <Link to="/authentication" className="nav__signin">
                    Đăng nhập
                </Link>
            ) : (
                <React.Fragment>
                    <div className="nav__avatar">
                        <img
                            alt="avt"
                            src={require('./img/avatar.jpg')}
                            className="nav__avatar-img"
                            onClick={handleOpen}
                        />
                        {open && (
                            <div className="nav__box">
                                <div className="nav__box-triangle" />
                                <div className="nav__box-header">
                                    <img
                                        alt="avt"
                                        src={require('./img/avatar.jpg')}
                                        className="nav__box-img"
                                    />
                                    <div className="nav__box-info">
                                        <div className="nav__box-name">
                                            {user.displayName}
                                        </div>
                                        <div className="nav__box-id">
                                            {user.username}
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to="/user"
                                    className="nav__box-user"
                                >
                                    Trang cá nhân
                                </Link>
                                <div
                                    onClick={onSignOutClick}
                                    className="nav__box-signout"
                                >
                                    Đăng xuất
                                </div>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default Navigation;
