import {FavouritesList} from "../../../features/FavouritesList";
import style from "./style.module.scss";

export const FavouritesPage = () => {
    return (
        <div className={style.newsContainer}>
            <FavouritesList />
        </div>
    )
}