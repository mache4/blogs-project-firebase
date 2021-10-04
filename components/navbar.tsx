import Link from 'next/link';
import type { NextPage } from 'next';
import { connect } from 'react-redux';

interface Props {
    theme: boolean,
    userInfo?: any
}

const Navbar: NextPage<Props> = (props) => {
    return (
        <nav className="navbar">
            <Link href="/"><a className="logo">Blogs</a></Link>
            <div className="links">
                <Link href="/create-post">Create Post</Link>
                {props.userInfo ?
                    <Link href="/your-profile">Your Profile</Link> :
                    <Link href="/login"><a className="login-btn">Login</a></Link>
                }
            </div>
        </nav>
    );
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, null)(Navbar);