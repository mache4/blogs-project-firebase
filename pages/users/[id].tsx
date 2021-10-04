import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { child, get } from "firebase/database";
import { dbRef } from '../../firebase/firebase';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

interface Props {
    userInfo: any
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
        if (props.userInfo) {
            if (id === props.userInfo.id) {
                router.push('/your-profile');
            } else {
                get(child(dbRef, 'users/' + id)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUser(snapshot.val());
                    }
                });
            }
        } else {
            get(child(dbRef, 'users/' + id)).then((snapshot) => {
                if (snapshot.exists()) {
                    setUser(snapshot.val());
                }
            });
        }
    }, [id, props.userInfo, router]);
    return (
        <Layout>
            <div className="user-page">
                <h1>{user.email}</h1>
            </div>
        </Layout>
    );
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, null)(UserId);