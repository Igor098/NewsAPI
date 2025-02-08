import style from './style.module.scss';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { SearchForm } from "../../SearchForm";
import { Dropdown } from "../../Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectUsername } from "../../../store/slices/auth/authSelectors.ts";
import { RootDispatch } from "../../../store/store.ts";
import {logoutUser, userLogoutRequest} from "../../../store/slices/auth/authSlice.ts";
import { selectCategory } from "../../../store/slices/news/newsSelector.ts";
import { MouseEvent } from "react";
import {loadNews, setCategory, setSearchResults} from "../../../store/slices/news/newsSlice.ts";
import { categories } from "../../../utils/categories.ts";

export const Header = () => {
    const isAuthorized: boolean = useSelector(selectIsAuthenticated);
    const username: string | null = useSelector(selectUsername);
    const category: string = useSelector(selectCategory);
    const dispatch: RootDispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const activeCategory: string = categories.filter((element) => element.state === category).map((element) => element.name)[0]

    const logout = () => {
        dispatch(userLogoutRequest());
        dispatch(logoutUser());
        navigate("/login");
    }

    const updateSearch = () => {
        dispatch(setSearchResults([]))
    }

    const loadNewsByCategory = (e: MouseEvent<HTMLButtonElement>) => {
        const text = e.currentTarget.textContent ?? '';
        const category = e.currentTarget.textContent
            ?
            categories
                .filter((element) => element.name.includes(text))
                .map((element) => element.state)[0]
            :
            "general";
        dispatch(setCategory(category))
        dispatch(loadNews(category))
    }

    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.headerWrapper}>
                    <nav>
                        <ul className={`${style.navigationList} ${style.listReset}`}>
                            <li className={style.navigationItem} onClick={updateSearch}>
                                <Link to='/'>Все новости</Link>
                            </li>

                            <li className={style.navigationItem}>
                                <Link to='/favourites'>Избранное</Link>
                            </li>
                        </ul>
                    </nav>

                    {
                        location.pathname === "/" && (
                            <>
                                <SearchForm />
                                <Dropdown mainText={"Выбрать категорию"} elementsList={categories} activeElement={activeCategory} onClickElement={loadNewsByCategory} />
                            </>

                        )
                    }

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