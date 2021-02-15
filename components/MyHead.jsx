import Head from 'next/head';
import PropTypes from 'prop-types';
export default function MyHead({ title }) {
    return (
        <>
            <Head>
                <title>MARK 的博客|{title}</title>
                <meta name="keywords" content="个人博客 前端 前端开发 React Next" />
            </Head>
        </>
    )
}
MyHead.propTypes = {
    title: PropTypes.string
}