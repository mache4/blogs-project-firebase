import type { NextPage } from 'next';
import Layout from '../components/layout';
import { auth } from '../firebase/firebase';
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { useRouter } from 'next/router';

interface Props {
    userInfo: any,
    setUserInfo: any
}

const YourProfile: NextPage<Props> = (props) => {
    const router = useRouter();

    const logoutHandler = async () => {
        await auth.signOut();
        props.setUserInfo(null);
        router.push('/login');
    }

    return (
        <Layout>
            <div className="your-profile">
                <p>{props.userInfo ? props.userInfo.email : null}</p>
                <button onClick={logoutHandler}>Logout</button>
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