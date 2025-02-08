import {INewsItemState} from "../../../types/types";
import {deleteNews, saveNews} from "../../../store/slices/favourites/favouritesSlice.ts";
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
                <button className={
                    `${style.addFavourite}
                     ${style.btnReset}`
                } onClick={saveOrDeleteNews}>
                    {/*{localLoading ? 'Обработка...' : (isSaved ? 'Удалить' : 'Добавить')}*/}
                    <svg className={
                        `${style.addFavouriteImage}
                         ${localLoading ? style.loading : isSaved ? style.active : style.notAdded}
                         `
                    } width="24px" height="800px" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.9244 9.07557L20.8931 9.10687L16.8321 13.1679C16.3185 13.6815 16.1238 14.4331 16.3233 15.1315L17.9462 20.8117C17.9646 20.8761 17.8928 20.9285 17.837 20.8913L17.8186 20.879L13.1094 17.7396C12.4376 17.2917 11.5624 17.2917 10.8906 17.7396L6.17083 20.8861C6.1124 20.9251 6.03711 20.8701 6.0564 20.8026L6.06393 20.7762L7.67671 15.1315C7.87625 14.4331 7.68147 13.6815 7.16787 13.1679L3.13547 9.13547L3.09579 9.09579C3.06044 9.06044 3.08548 9 3.13547 9H8.16667C8.97407 9 9.70228 8.51452 10.0128 7.76923L11.9369 3.15144C11.9603 3.09535 12.0397 3.09535 12.0631 3.15144L13.9872 7.76923C14.2977 8.51452 15.0259 9 15.8333 9H20.8931C20.9326 9 20.9523 9.04768 20.9244 9.07557Z"/>
                        <path
                            d="M20.9244 9.07557L20.8931 9.10687L16.8321 13.1679C16.3185 13.6815 16.1238 14.4331 16.3233 15.1315L17.9462 20.8117C17.9646 20.8761 17.8928 20.9285 17.837 20.8913L17.8186 20.879L13.1094 17.7396C12.4376 17.2917 11.5624 17.2917 10.8906 17.7396L6.17083 20.8861C6.1124 20.9251 6.03711 20.8701 6.0564 20.8026L6.06393 20.7762L7.67671 15.1315C7.87625 14.4331 7.68147 13.6815 7.16787 13.1679L3.13547 9.13547L3.09579 9.09579C3.06044 9.06044 3.08548 9 3.13547 9H8.16667C8.97407 9 9.70228 8.51452 10.0128 7.76923L11.9369 3.15144C11.9603 3.09535 12.0397 3.09535 12.0631 3.15144L13.9872 7.76923C14.2977 8.51452 15.0259 9 15.8333 9H20.8931C20.9326 9 20.9523 9.04768 20.9244 9.07557Z"/>
                    </svg>
                </button>
            </div>
            <a className={style.sourceLink} href={article.url}></a>
        </div>
    )
}