import type { NextPage } from 'next';
import { useState, useRef } from 'react';
import Layout from '../components/layout';
import { actions } from '../store/actions';
import { connect } from 'react-redux';
import { ref, set } from "firebase/database";
import { useRouter } from 'next/router';
import { database } from '../firebase/firebase';

interface Props {
    setPostInfo: any,
    clearPostInfo: any,
    userInfo: any
}

const CreatePost: NextPage<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const [error, setError] = useState('');

    const randomId = (length: number) => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        if (!length)
            length = Math.floor(Math.random() * chars.length);
        let str = '';
        for (let i = 0; i < length; i++)
            str += chars[Math.floor(Math.random() * chars.length)];
        return str;
    }

    const submitPost = (e: any) => {
        e.preventDefault();
        setError('');

        if (!props.userInfo)
            return setError('Login to create a post');
        if (!nameRef.current?.value && !contentRef.current?.value)
            return setError('Enter name and content of your post');
        if (!nameRef.current?.value)
            return setError('Enter name of your post');
        if (!contentRef.current?.value)
            return setError('Enter content of your post');

        if (nameRef.current?.value.length > 50)
            return setError('Your name can\'t be longer than 50 characters');
        if (contentRef.current?.value.length > 2500)
            return setError('Content of your post can\'t be longer than 2500 characters');

        const data = {
            author: {
                email: props.userInfo.email,
                id: props.userInfo.id
            },
            name: nameRef.current?.value,
            content: contentRef.current?.value,
            date: Date.now()
        };

        props.setPostInfo(data);

        set(ref(database, 'posts/' + Date.now() + '_' + randomId(10)), data);
        router.push('/');
    };

    return (
        <Layout bgc="B2DBFF">
            <div className="create-post">
                <h1>Create Your Post</h1>
                <h2 className="error" style={{ opacity: error ? 1 : 0 }}>{error}.</h2>
                <form onSubmit={submitPost}>
                    <input type="text" ref={nameRef} placeholder="Post Name" />
                    <textarea ref={contentRef} placeholder="Post Content"></textarea>
                    <button type="submit" onClick={submitPost}>CREATE POST</button>
                </form>
            </div>
        </Layout>
    );
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setPostInfo: (value: any) => dispatch({ type: actions.setPostInfo, value: value }),
        clearPostInfo: () => dispatch({ type: actions.clearPostInfo })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);