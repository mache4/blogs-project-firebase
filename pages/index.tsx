import type { NextPage } from 'next';
import Layout from '../components/layout';
import { connect } from 'react-redux';
import { child, get } from "firebase/database";
import { dbRef } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import Post from '../components/post';
import { useRouter } from 'next/router';

interface Props {
    // userInfo: any
}

interface Post {
    date: number,
    name: string,
    content: string,
    author: {
        email: string,
        id: string,
        date: number
    }
}

const Home: NextPage<Props> = (props) => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        get(child(dbRef, 'posts/')).then((snapshot) => {
            if (snapshot.exists()) {
                setPosts(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, []);

    let postCards = null;
    if (posts) {
        const postArray = Object.keys(posts).reverse();
        postCards = Object.values(posts).reverse().map((post: Post, index: number) => {
            console.log(post.author.id)
            return <Post
                key={postArray[index]}
                name={post.name}
                content={post.content}
                author={post.author}
                date={post.date}
                user={() => router.push(`/users/${post.author.id}`)}
                post={() => router.push(`/posts/${postArray[index]}`)} />
        });
    }

    return (
        <Layout>
            <div className="app">
                {postCards}
            </div>
        </Layout>
    );
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, null)(Home);
