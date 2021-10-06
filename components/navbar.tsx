import Link from 'next/link';
import type { NextPage } from 'next';
import { connect } from 'react-redux';
import { FaBars, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import Sidebar from './sidebar';
import Overlay from './overlay';

interface Props {
    theme: boolean,
    userInfo?: any
}

const Navbar: NextPage<Props> = (props) => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        setSidebar(true);
    }

    const hideSidebar = () => {
        setSidebar(false);
    }

    return (
        <nav className="navbar">
            <Link href="/"><a className="logo">Blogs</a></Link>
            <div className="links">
                <Link href="/create-post">Create Post</Link>
                {props.userInfo ?
                    <Link href="/your-profile" passHref={true}><FaUser className="user-icon" /></Link> :
                    <Link href="/login"><a className="login-btn">Login</a></Link>
                }
            </div>
            <FaBars className="bars-icon" onClick={showSidebar} />
            <Sidebar userInfo={props.userInfo} sidebar={sidebar} />
            <Overlay show={sidebar} clicked={hideSidebar} />
        </nav>
    );
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, null)(Navbar);