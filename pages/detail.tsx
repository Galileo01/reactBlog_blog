import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, BackTop, notification } from 'antd';
import marked from 'marked';
import highlight from 'highlight.js';
import moment from 'moment';
import 'highlight.js/styles/dracula.css';

import MyHead from '../components/MyHead';
import Header from '../components/GlobalHeader';
import Footer from '../components/Footer';
import Tocify from '../components/tocify';
import PostWapper from '../components/PostWapper'; //组件懒加载

import { postTypeText } from '../commonJs/global';
import { postItem } from '../commonJs/types';
import { getPostByPid, increCount } from '../network/post';
interface DetailProps {
    postData: postItem;
    page_from: string;
    Pid: number;
}
function format(dateStr) {
    const time = moment(dateStr);
    return time.format('YYYY/MM/DD');
}
const Detail: React.FC<DetailProps> = ({ postData, page_from, Pid }) => {
    //渲染 html
    const renderer = new marked.Renderer();
    const tocify = new Tocify();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    marked.setOptions({
        renderer,
        // gfm:true,//github 风格
        pedantic: false, //容错 并尝试修正
        sanitize: false, //忽略html
        breaks: false, //github 换行符
        smartLists: true, //列表渲染
        highlight: (code) => {
            //添加 hljs 的类名  使用 主题样式
            return `<div class="hljs"> 

            ${highlight.highlightAuto(code).value}
            </div>`;
        },
    });
    const contentHtml = marked(postData.content);

    //获取 之前的页面名称
    const find = postTypeText.find((item) => '/' + item.name === page_from);
    const prePage = find ? find.text : '首页';

    //设置 进入5s之后发送 阅读次数递增 请求
    useEffect(() => {
        let timer = setTimeout(async () => {
            const { data, status } = await increCount(Pid);
            if (!data.ok)
                notification.error({
                    message: '网络错误',
                });
            clearTimeout(timer);
            timer = null;
        }, 5000);
        //组件卸载时  取消定时器
        return () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        };
    }, []);
    return (
        <>
            <MyHead title="帖子详情" />
            <Header />
            <BackTop />
            <main className="detail">
                <Row className="comm_main" justify="center">
                    <Col
                        className="comm_right"
                        xs={0}
                        sm={0}
                        md={6}
                        lg={4}
                        xl={4}
                    >
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href={page_from}>{prePage}</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>帖子详情</Breadcrumb.Item>
                        </Breadcrumb>
                        <section className="navbar">
                            <div className="title">文章导航</div>
                            <div className="post_nav anchor_nav">
                                <tocify.Tocify />
                            </div>
                        </section>
                    </Col>
                    <Col
                        className="comm_left"
                        xs={23}
                        sm={23}
                        md={16}
                        lg={18}
                        xl={14}
                    >
                        <section className="post">
                            <div className="post_title">{postData.title}</div>
                            <div className="other-info">
                                <div className="small update-time">
                                    更新时间 :{format(postData.updateTime)}
                                </div>
                                <div className="small read-count">
                                    阅读:
                                    <span>{postData.readCount}</span>
                                </div>
                            </div>
                            <div className="content">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: contentHtml,
                                    }}
                                ></div>
                            </div>
                        </section>
                        <PostWapper Pid={Pid} />
                    </Col>
                </Row>
            </main>

            <Footer />
        </>
    );
};
export default Detail;

//服务端渲染 之前 请求数据
export async function getServerSideProps({ query: { Pid, page_from } }) {
    // console.log(Pid);
    const { data, status } = await getPostByPid(Pid);
    return {
        props: {
            postData: data.data,
            page_from,
            Pid,
        },
    };
}
