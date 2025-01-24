import {INewsItemState} from "../../../types/types.ts";
import {NewsItem} from "../../NewsItem/ui/NewsItem.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";


export const FavouritesList = () => {
    const {articles} = useSelector((state: RootState) => state.favourites);

    if (articles.length === 0) return <p>Not Items</p>;

    return (
        articles.map((item: INewsItemState) => {
                return (
                    <NewsItem key={item.title} title={item.title} description={item.content} url={item.url} content={item.content} image={item.image} source={item.source} publishedAt={item.publishedAt} />
                )
            })
    )
}