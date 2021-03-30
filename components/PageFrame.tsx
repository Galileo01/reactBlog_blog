import React from 'react';
import { BackTop } from 'antd';
import MyHead from '../components/MyHead';
import Header from '../components/GlobalHeader';
import Footer from '../components/Footer';
interface Props {
    title: string; //document.title
}

//页面 框架组件   适用于服务端渲染 的静态页面
const PageFrame: React.FC<Props> = ({ title, children }) => {
    return (
        <>
            <MyHead title={title} />
            <Header />
            {children}
            <BackTop />
            <Footer />
        </>
    );
};

export default PageFrame;
