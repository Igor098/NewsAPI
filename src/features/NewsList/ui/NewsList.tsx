import {useEffect, useState} from "react";
import {INewsItemSource, INewsItemState} from "../../../types/types.ts";
import axios from "axios";
import {NewsItem} from "../../NewsItem/ui/NewsItem.tsx";

export const NewsList = () => {
    const [news, setNews] = useState<Array<INewsItemState>>([]);
    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get<INewsItemSource>('https://newsapi.org/v2/everything?q="Нижний Новгород"&language=ru&pageSize=20&apiKey=5f777462f83a476d90fc7548ea004ff3');
            return response.data;
        }
        fetchNews().then((data: INewsItemSource) => {
            data.articles.forEach((article: INewsItemState) => {
                setNews((oldNews) => [...oldNews, article])
            })
        })
    }, [])

    return (
            news && news.map((item: INewsItemState) => {
                return (
                    <NewsItem key={item.title} title={item.title} description={item.description} url={item.url}/>
                )
            })
    )
}