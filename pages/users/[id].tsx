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
    await get(child(dbRef, 'users/')).then((snapshot) => {
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
        fallback: false
    };
}

export const getStaticProps = () => ({ props: {} });

const UserId: NextPage<Props> = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState({
        name: '',
        email: '',
        content: '',
        data: ''
    });

    useEffect(() => {
        get(child(dbRef, 'users/' + id)).then((snapshot) => {
            if (snapshot.exists()) {
                setUser(snapshot.val());
            }
        });
    }, [id]);
    return (
        <Layout>
            <div className="user-page">
                <h1>{user.email}</h1>
            </div>
        </Layout>
    );
}

export default UserId;