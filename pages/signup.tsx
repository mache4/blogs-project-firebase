import type { NextPage } from 'next';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Link from 'next/link';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { connect } from 'react-redux';
import { actions } from '../store/actions';
import { ref, set } from "firebase/database";
import { database } from '../firebase/firebase';

interface Props {
    setUserInfo: any
}

const SignUp: NextPage<Props> = (props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePassword = (password: string) => {
        const re = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
        return re.test(String(password).toLowerCase());
    }

    const randomId = (length: number) => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        if (!length)
            length = Math.floor(Math.random() * chars.length);
        let str = '';
        for (let i = 0; i < length; i++)
            str += chars[Math.floor(Math.random() * chars.length)];
        return str;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");

        if (!emailRef.current?.value && !passwordRef.current?.value)
            return setError("Enter Email and Password");
        if (!emailRef.current?.value)
            return setError("Enter Email");
        if (!validateEmail(emailRef.current?.value))
            return setError("Unvalid Email");
        if (!passwordRef.current?.value)
            return setError("Enter Password");
        if (!validatePassword(passwordRef.current?.value))
            return setError("Unvalid Password. Enter at least 7 characters, only letters and numbers");
        if (!passwordConfirmRef.current?.value)
            return setError("Confirm your Password");

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value)
            return setError("Passwords do not match");

        await createUserWithEmailAndPassword(auth, emailRef.current?.value, passwordRef.current?.value)
            .then((userCredential) => {
                const id = userCredential.user.uid;
                const data = {
                    email: userCredential.user.email,
                    id: id,
                    date: Date.now()
                };
                props.setUserInfo(data);
                set(ref(database, 'users/' + id), data);
            })
            .catch((err) => {
                setError(err.message);
            });
        router.push('/your-profile');
    }

    return (
        <Layout>
            <div className="signup">
                <h1>Signup</h1>
                <h2 className="error" style={{ opacity: error ? 1 : 0 }}>{error}.</h2>
                <form onSubmit={handleSubmit}>
                    <span>Your Email</span>
                    <input type="text"
                        id="email"
                        ref={emailRef} />
                    <span>Your Password</span>
                    <input type="password"
                        id="passowrd"
                        ref={passwordRef} />
                    <span>Confirm Password</span>
                    <input type="password"
                        id="passowrd-confirmed"
                        ref={passwordConfirmRef} />

                    <button type="submit" disabled={loading}>Signup</button>
                </form>
                <p>Already have an account? Click <Link href="/login">here</Link>.</p>
            </div>
        </Layout>
    );
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUserInfo: (value: any) => dispatch({ type: actions.setUserInfo, value: value })
    }
}

export default connect(null, mapDispatchToProps)(SignUp);