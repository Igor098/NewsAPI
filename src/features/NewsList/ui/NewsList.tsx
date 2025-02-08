import { useEffect } from "react";
import { INewsItemState } from "../../../types/types.ts";
import { NewsItem } from "../../NewsItem/ui/NewsItem.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch } from "../../../store/store.ts";
import {loadNews, setSearchResults } from "../../../store/slices/news/newsSlice.ts";
import { userInfoRequest } from "../../../store/slices/auth/authSlice.ts";
import { useNavigate } from "react-router-dom";
import { loadSavedNews } from "../../../store/slices/favourites/favouritesSlice.ts";
import { selectError } from "../../../store/slices/auth/authSelectors.ts";
import {
    selectCategory,
    selectLoading,
    selectNewsArticles,
    selectNewsError,
    selectSearchResults
} from "../../../store/slices/news/newsSelector.ts";
import { Loader } from "../../../components/Loader";
import { selectArticles } from "../../../store/slices/favourites/favouritesSelector.ts";


export const NewsList = () => {
    const newsArticles = useSelector(selectNewsArticles);
    const searchResults = useSelector(selectSearchResults);
    const loading = useSelector(selectLoading);
    const newsError = useSelector(selectNewsError);
    const articles = useSelector(selectArticles)
    const error = useSelector(selectError);
    const category = useSelector(selectCategory)
    const dispatch: RootDispatch = useDispatch();
    const navigate = useNavigate();

    const displayedArticles = searchResults.length > 0 ? searchResults : newsArticles;

    useEffect(() => {
        dispatch(setSearchResults([]))
        dispatch(loadNews(category))
        dispatch(loadSavedNews())
        dispatch(userInfoRequest())
    }, [dispatch, category]);

    useEffect(() => {
        if (error) {
            navigate("/login")
        }
    }, [error, navigate]);

    if (loading) return <Loader />;
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