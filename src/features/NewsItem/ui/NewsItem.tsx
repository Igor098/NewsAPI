import {INewsItemState} from "../../../types/types";
import {deleteNews, saveNews} from "../../../store/slices/favouritesSlice";
import {RootDispatch, RootState} from "../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import style from "./style.module.scss";
import {useState} from "react";

export const NewsItem = (article: INewsItemState) => {
    const {articles} = useSelector((state: RootState) => state.favourites);
    const dispatch: RootDispatch = useDispatch();
    const [localLoading, setLocalLoading] = useState<boolean>(false);
    const isSaved = articles.some(item => item.url === article.url);

    const saveOrDeleteNews = async () => {
        setLocalLoading(true);
        if (!isSaved) {
            try {
                await dispatch(saveNews(article)).unwrap();
            } catch (error) {
                console.error('Ошибка при сохранении новости', error);
            } finally {
                setLocalLoading(false);
            }
        } else {
            try {
                await dispatch(deleteNews(article.id)).unwrap();
            } catch (error) {
                console.error('Ошибка при удалении новости', error);
            }
            finally {
                setLocalLoading(false);
            }
        }
    }

    return (
        <div className={style.newsCard}>
            <div className={style.image}>
                <img src={article.image} alt={article.title}/>
            </div>

            <div className={style.newsWrapper}>
                <h3 className={style.title}>{article.title}</h3>
                {article.description && <p className={style.description}>{article.description}</p>}
                <button className={`${style.addFavourite} ${style.btnReset}`} onClick={saveOrDeleteNews}>{localLoading ? 'Обработка...' : (isSaved ? 'Удалить' : 'Добавить')}</button>
            </div>
            <a className={style.sourceLink} href={article.url}></a>
        </div>
    )
}