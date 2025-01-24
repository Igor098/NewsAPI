// @ts-ignore

import {useEffect} from "react";
import {INewsItemState} from "../../../types/types.ts";
import {NewsItem} from "../../NewsItem/ui/NewsItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {loadNews} from "../../../store/slices/newsSlice.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const NewsList = () => {
    const {articles, loading, error} = useSelector((state: RootState) => state.news);
    const dispatch = useDispatch();

    // const [news, setNews] = useState<Array<INewsItemState>>([]);
    // useEffect(() => {
    //     const fetchNews = async () => {
    //         const response = await axios.get<INewsItemSource>('https://newsapi.org/v2/everything?q="Нижний Новгород"&language=ru&pageSize=20&apiKey=5f777462f83a476d90fc7548ea004ff3');
    //         return response.data;
    //     }
    //     fetchNews().then((data: INewsItemSource) => {
    //         data.articles.forEach((article: INewsItemState) => {
    //             setNews((oldNews) => [...oldNews, article])
    //         })
    //     })
    // }, [])

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(loadNews("Нижний Новгород"))
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        articles.articles && articles.articles.map((item: INewsItemState) => {
                return (
                    <NewsItem key={item.title} title={item.title} description={item.description} url={item.url}/>
                )
            })
    )
}