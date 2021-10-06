import type { NextPage } from 'next';
import Layout from '../components/layout';
import { auth } from '../firebase/firebase';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
    userInfo: any,
    setUserInfo: any
}

const YourProfile: NextPage<Props> = (props) => {
    const router = useRouter();
    const [modal, setModal] = useState(false);

    const logoutHandler = async () => {
        await auth.signOut();
        props.setUserInfo(null);
        router.push('/login');
    }

    const showModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    return (
        <Layout>
            <div className="your-profile">
                <p>{props.userInfo ? props.userInfo.email : null}</p>
                <button onClick={showModal}>Logout</button>

                <div className="modal" style={{
                    transform: modal ? 'translate(-50%, 0)' : 'translate(-50%, -250%)'
                }}>
                    <p>Are you sure you want to log out?</p>
                    <button onClick={logoutHandler}>YES</button>
                    <button onClick={closeModal}>NO</button>
                </div>
            </div>
        </Layout >
    );
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfo
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUserInfo: (value: object) => dispatch({ type: actions.setUserInfo, value: value })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(YourProfile);