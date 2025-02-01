import {INewsItemState} from "../../../types/types.ts";
import {NewsItem} from "../../NewsItem/ui/NewsItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "../../../store/store.ts";
import {useEffect} from "react";
import {loadSavedNews} from "../../../store/slices/favouritesSlice.ts";
import style from "./style.module.scss";


export const FavouritesList = () => {
    const {articles, loading, error} = useSelector((state: RootState) => state.favourites);
    const dispatch: RootDispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSavedNews())
    }, [dispatch]);

    if (loading) return <div className={style.loader}></div>;
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