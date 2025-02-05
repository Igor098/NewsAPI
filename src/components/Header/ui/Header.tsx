import style from './style.module.scss';
import { Link } from 'react-router-dom';
import {SearchForm} from "../../SearchForm";
import {Dropdown} from "../../Dropdown";

export const Header = () => {
    return (
        <header>
            <div className={style.container}>
                <div className={style.headerWrapper}>
                    <nav>
                        <ul className={`${style.navigationList} ${style.listReset}`}>
                            <li>
                                <Link to='/'>Все новости</Link>
                            </li>

                            <li>
                                <Link to='/favourites'>Избранное</Link>
                            </li>

                            <li>
                                <Link to='/register'>Регистрация</Link>
                            </li>
                        </ul>
                    </nav>
                    <SearchForm/>
                    <Dropdown />
                </div>
            </div>
        </header>
    )
}