import {useEffect} from "react";
import {INewsItemState} from "../../../types/types.ts";
import {NewsItem} from "../../NewsItem/ui/NewsItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "../../../store/store.ts";
import {loadNews} from "../../../store/slices/newsSlice.ts";


export const NewsList = () => {
    const {articles, loading, error} = useSelector((state: RootState) => state.news);
    const dispatch: RootDispatch = useDispatch();

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
        dispatch(loadNews("general"))
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        articles.map((item: INewsItemState) => {
                return (
                    <NewsItem key={item.title} title={item.title} description={item.content} url={item.url} content={item.content} image={item.image} source={item.source} publishedAt={item.publishedAt} />
                )
            })
    )
}