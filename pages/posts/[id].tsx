import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { child, get } from "firebase/database";
import { dbRef } from '../../firebase/firebase';
import { useRouter } from 'next/router';

interface Props {

};


export const getStaticPaths = async () => {
    let paths: object = [];
    await get(child(dbRef, 'posts/')).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const keys = Object.keys(data);
            paths = keys.map(key => {
                return {
                    params: { id: key.toString() }
                }
            });
        }
    });

    return {
        paths,
        fallback: true
    };
}

export const getStaticProps = () => ({ props: {} });

const PostId: NextPage<Props> = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState({
        name: '',
        author: {
            email: '',
            id: ''
        },
        content: '',
        data: ''
    });

    useEffect(() => {
        get(child(dbRef, 'posts/' + id)).then((snapshot) => {
            if (snapshot.exists()) {
                setPost(snapshot.val());
            }
        });
    }, [id]);
    return (
        <Layout>
            <div className="post-page">
                <h1>{post.author.email}</h1>
                <h1>{post.name}</h1>
                <h1>{post.content}</h1>
            </div>
        </Layout>
    );
}

export default PostId;