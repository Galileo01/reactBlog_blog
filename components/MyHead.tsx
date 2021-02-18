import React from 'react';
import Head from 'next/head';
interface MyHeadProps {
    title: string
}
const MyHead: React.FC<MyHeadProps> = ({
    title
}) => {
    return (
        <>
            <Head>
                <title>MARK 的博客|{title}</title>
                <meta name="keywords" content="个人博客 前端 前端开发 React Next" />
            </Head>
        </>
    )
}
export default MyHead;
