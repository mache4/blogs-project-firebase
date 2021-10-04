import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface Props {
    name: string,
    content: string,
    author: {
        email: string,
        id: string,
        date: number
    },
    date: number,
    post: () => void,
    user?: () => void
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

const Post: NextPage<Props> = (props) => {
    const [numberOfLetters, setNumberOfLetters] = useState(150);
    const size = useWindowSize();

    useEffect(() => {
        if (size.width > 425) {
            setNumberOfLetters(150);
        }
        else if (size.width < 425 && size.width > 350) {
            setNumberOfLetters(125);
        }
        else if (size.width < 350) {
            setNumberOfLetters(100);
        }
    }, [size.width]);

    const fun = (number: number | string) => {
        if (number < 10)
            number = '0' + number;
        return number;
    }

    let date = new Date(props.date);
    let seconds = fun(date.getSeconds());
    let minutes = fun(date.getMinutes());
    let hours = fun(date.getHours());
    let day = fun(date.getDate());
    let month = fun(date.getMonth() + 1);
    let year = fun(date.getFullYear());

    return (
        <div className="post">
            <div className="post__info">
                <p className="post__author" onClick={props.user}>{props.author.email}</p>
                <p className="post__name" onClick={props.post}>{props.name}</p>
                <p className="post__date">{day}.{month}.{year}<span>{hours}:{minutes}:{seconds}</span></p>
            </div>
            <p className="post__content">{props.content.length < numberOfLetters ? props.content : props.content.slice(0, numberOfLetters) + '...'}</p>
        </div>
    );
}

export default Post;