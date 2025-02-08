import { INewsItemState } from "../../../types/types.ts";
import { NewsItem } from "../../NewsItem/ui/NewsItem.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch } from "../../../store/store.ts";
import { useEffect } from "react";
import { loadSavedNews } from "../../../store/slices/favourites/favouritesSlice.ts";
import { userInfoRequest } from "../../../store/slices/auth/authSlice.ts";
import { Loader } from "../../../components/Loader";
import { selectArticles, selectLoading, selectError } from "../../../store/slices/favourites/favouritesSelector.ts";



export const FavouritesList = () => {
    const articles = useSelector(selectArticles);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const dispatch: RootDispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSavedNews())
    }, [dispatch]);

    useEffect(() => {
        dispatch(userInfoRequest())
    }, [dispatch]);

    if (articles.length === 0) return <p>У вас нет сохраненных новостей</p>;
    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {
                articles.map((item: INewsItemState) => {
                        return (
                            <NewsItem key={item.title} id={item.id} title={item.title} description={item.content} url={item.url} content={item.content} image={item.image} source={item.source} publishedAt={item.publishedAt} />
                        )
                    })
            }
        </>
    )
}