import type { NextPage } from 'next';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Link from 'next/link';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { connect } from 'react-redux';
import { actions } from '../store/actions';

interface Props {
    setUserInfo: any
}

const Login: NextPage<Props> = (props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let authErr = false;
        setError("");

        if (!emailRef.current?.value && !passwordRef.current?.value)
            return setError("Enter your Email and Password");
        if (!emailRef.current?.value)
            return setError("Enter your Email");
        if (!passwordRef.current?.value)
            return setError("Enter your Password");
        await signInWithEmailAndPassword(auth, emailRef.current?.value, passwordRef.current?.value)
            .then((userCredential) => {
                setUser(userCredential.user);
                props.setUserInfo({
                    email: userCredential.user.email,
                    id: userCredential.user.uid
                });
            })
            .catch((error) => {
                setError(error.message);
                authErr = true;
            });
        if (authErr) return;
        router.push('/your-profile');
    }

    return (
        <Layout>
            <div className="login">
                <h1>Login</h1>
                <h2 className="error" style={{ opacity: error ? 1 : 0 }}>{error}.</h2>
                <form onSubmit={handleSubmit}>
                    <span>Your Email</span>
                    <input type="text" ref={emailRef} />
                    <span>Your Password</span>
                    <input type="password" ref={passwordRef} />
                    <button type="submit" disabled={loading}>Login</button>
                </form>
                <p>Don&apos;t have an account? Create one <Link href="/signup">here</Link>.</p>
            </div>
        </Layout>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUserInfo: (value: any) => dispatch({ type: actions.setUserInfo, value: value })
    }
}

export default connect(null, mapDispatchToProps)(Login);