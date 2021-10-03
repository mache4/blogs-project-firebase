import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from './navbar';

interface Props {
    children: JSX.Element
};

const Layout: NextPage<Props> = (props) => {
    return (
        <div className="layout">
            <Head>
                <title>Blogs</title>
            </Head>
            <Navbar theme={true} />
            <div className="content">
                {props.children}
            </div>
        </div>
    );
};

export default Layout;