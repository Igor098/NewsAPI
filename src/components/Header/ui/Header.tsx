import style from './style.module.scss';
import { Link } from 'react-router-dom';
import {SearchForm} from "../../SearchForm";
import {Dropdown} from "../../Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuthenticated, selectUsername} from "../../../store/slices/auth/authSelectors.ts";
import { RootDispatch } from "../../../store/store.ts";
import {logoutUser, userLogoutRequest} from "../../../store/slices/auth/authSlice.ts";

export const Header = () => {
    const isAuthorized = useSelector(selectIsAuthenticated);
    const username = useSelector(selectUsername);

    const dispatch: RootDispatch = useDispatch();

    const logout = () => {
        dispatch(userLogoutRequest());
        dispatch(logoutUser());
    }

    const categories = [
        "Все",
        "Мировые",
        "Страна",
        "Бизнес",
        "Технологии",
        "Развлечения",
        "Спорт",
        "Наука",
        "Здоровье",
    ]
    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.headerWrapper}>
                    <nav>
                        <ul className={`${style.navigationList} ${style.listReset}`}>
                            <li className={style.navigationItem}>
                                <Link to='/'>Все новости</Link>
                            </li>

                            <li className={style.navigationItem}>
                                <Link to='/favourites'>Избранное</Link>
                            </li>
                        </ul>
                    </nav>
                    <SearchForm />
                    <Dropdown mainText={"Выбрать категорию"} elementsList={categories} />
                    {
                        !isAuthorized && (
                            <nav>
                                <ul className={`${style.navigationList} ${style.listReset}`}>
                                    <li className={style.navigationItem}>
                                        <Link to={"/register"}>Регистрация</Link>
                                    </li>

                                    <li className={style.navigationItem}>
                                        <Link to={"/login"}>Вход</Link>
                                    </li>
                                </ul>
                            </nav>
                        )
                    }

                    {
                        isAuthorized && (
                            <div className={style.navigationList}>
                                <p className={style.username}>{username}</p>
                                <button className={style.btnLogout} onClick={logout}>Выйти</button>
                            </div>
                        )
                    }

                </div>
            </div>
        </header>
    )
}