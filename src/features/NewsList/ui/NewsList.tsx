import {useEffect} from "react";
import {INewsItemState} from "../../../types/types.ts";
import {NewsItem} from "../../NewsItem/ui/NewsItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "../../../store/store.ts";
import {loadNews} from "../../../store/slices/newsSlice.ts";
import style from "./style.module.scss";
import {userInfoRequest} from "../../../store/slices/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {loadSavedNews} from "../../../store/slices/favouritesSlice.ts";


export const NewsList = () => {
    const {newsArticles, searchResults, loading, newsError} = useSelector((state: RootState) => state.news);
    const {articles} = useSelector((state: RootState) => state.favourites)
    const {error} = useSelector((state:RootState) => state.auth);
    const dispatch: RootDispatch = useDispatch();
    const navigate = useNavigate();

    const displayedArticles = searchResults.length > 0 ? searchResults : newsArticles;

    useEffect(() => {
        dispatch(loadNews("general"))
        dispatch(loadSavedNews())
        dispatch(userInfoRequest())
    }, [dispatch]);

    useEffect(() => {
        if (error === "ERR_BAD_REQUEST") {
            navigate("/login")
        }
    }, [error, navigate]);

    if (loading) return <div className={style.loader}></div>;
    if (newsError) return <p>Error: {newsError}</p>;

    const updatedArticles = articles && displayedArticles.map((article: INewsItemState) => {
        const favArticle = articles.find(fav => fav.url === article.url);
        if (favArticle) {
            return { ...article, id: favArticle.id };
        }
        return article;
    });

    return (
        <>
            {
                updatedArticles.map((item: INewsItemState) => {
                    return (
                        <NewsItem key={item.id} id={item.id} title={item.title} description={item.content} url={item.url}
                                  content={item.content} image={item.image} source={item.source}
                                  publishedAt={item.publishedAt}/>
                    )
                })
            }
        </>
    )
}