import {NewsList} from "../../../features/NewsList";
import style from "./style.module.scss";

export const MainPage = () => {

    return (
        <div className={style.newsContainer}>
            <NewsList />
        </div>
    )
}