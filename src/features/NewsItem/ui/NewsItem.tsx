import {INewsItemState} from "../../../types/types.ts";
import {addNews} from "../../../store/slices/favouritesSlice.ts";
import {RootDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";
import style from "./style.module.scss";

export const NewsItem = ({title, description, url, content, source, image, publishedAt}: INewsItemState) => {
    const dispatch: RootDispatch = useDispatch();
    const onClick = () => {
        dispatch(addNews({title, description, url, content, source, image, publishedAt}));
    }

    return (
        <div className={style.newsCard}>
            <div className={style.image}>
                <img src={image} alt={title}/>
            </div>

            <div>
                <h3 className={style.title}>{title}</h3>
                {description && <p className={style.description}>{description}</p>}
                <button className={style.addFavourite} onClick={onClick}>Добавить</button>
            </div>
            <a className={style.sourceLink} href={url}></a>
        </div>
            )
            }