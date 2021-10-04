import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from './navbar';

interface Props {
    children: JSX.Element,
    bgc?: string
};

const Layout: NextPage<Props> = (props) => {
    backgroundColor: ;
    return (
        <div className="layout">
            <Head>
                <title>Blogs</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
                    integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" />
                <style>{`
                    body {
                        background-color: ${props.bgc ? `#${props.bgc}` : '#B2DBFF'};
                    }
                `}</style>
            </Head>
            <Navbar theme={true} />
            <div className="content">
                {props.children}
            </div>
        </div>
    );
};

export default Layout;