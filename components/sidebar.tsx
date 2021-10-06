import type { NextPage } from 'next';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

interface Props {
    userInfo: any,
    sidebar: boolean
}

const Sidebar: NextPage<Props> = (props) => {
    return (
        <div className="sidebar" style={{
            transform: props.sidebar ? 'translateX(0)' : 'translateX(250%)'
        }}>
            <div className="sidebar__links">
                <Link href="/create-post">Create Post</Link>
                {props.userInfo ?
                    <Link href="/your-profile">Your Profile</Link> :
                    <Link href="/login"><a className="login-btn">Login</a></Link>
                }
            </div>
        </div>
    );
}

export default Sidebar;