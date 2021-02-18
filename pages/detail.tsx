import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, BackTop } from 'antd';
import marked from 'marked';
import highlight from 'highlight.js';

import 'highlight.js/styles/dracula.css';
import dynamic from 'next/dynamic'
import MyHead from '../components/MyHead';
import Header from '../components/GlobalHeader';
import Footer from '../components/Footer';
import Tocify from '../components/tocify';
// import PostComment from '../components/PostComment';
const PostComment = dynamic(() => import('../components/PostComment'));//组件懒加载
import { postTypeText } from '../commonJs/global'
import { postItem } from '../commonJs/types';
import { getPostByPid } from '../network/post';
interface DetailProps {
    postData: postItem,
    page_from: string,
    Pid: number
}
const Detail: React.FC<DetailProps> = ({ postData, page_from, Pid }) => {

    //渲染 html
    const renderer = new marked.Renderer();
    const tocify = new Tocify();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    marked.setOptions(
        {
            renderer,
            // gfm:true,//github 风格
            pedantic: false,//容错 并尝试修正
            sanitize: false,//忽略html
            breaks: false,//github 换行符
            smartLists: true,//列表渲染
            highlight: (code) => {
                //添加 hljs 的类名  使用 主题样式
                return `<div class="hljs"> 

            ${highlight.highlightAuto(code).value}
            </div>`;

            }
        }
    );
    const contentHtml = marked(postData.content);

    //获取 之前的页面名称
    const find = postTypeText.find(item => '/' + item.name === page_from);
    const prePage = find ? find.text : '首页';

    //懒加载评论
    const [commentVisible, setVisible] = useState(false);
    useEffect(() => {
        const target = document.querySelector('.global_footer');
        const observer = new IntersectionObserver((entries) => {
            const { intersectionRatio } = entries[0];
            //footer 可见
            if (intersectionRatio > 0) {
                observer.unobserve(target);//取消观察
                console.log('show comment');
                setVisible(true);
                observer.disconnect();//关闭观察器
            }

        });
        //观察 title
        observer.observe(target)
    }, [])

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
                        <Breadcrumb ><Breadcrumb.Item>
                            <a href={page_from}>{prePage}</a></Breadcrumb.Item>
                            <Breadcrumb.Item>
                                帖子详情
                            </Breadcrumb.Item></Breadcrumb>
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

                            <div className="post_title">
                                {postData.title}
                            </div>
                            <div className="content" >
                                <div dangerouslySetInnerHTML={{
                                    __html: contentHtml
                                }}>
                                </div>
                            </div>
                        </section>
                        {
                            commentVisible && <PostComment Pid={Pid} />
                        }
                    </Col>
                </Row>
            </main>

            <Footer />
        </>
    );
}
export default Detail;

//服务端渲染 之前 请求数据
export async function getServerSideProps({ query: { Pid, page_from } }) {
    // console.log(Pid);
    const { data, status } = await getPostByPid(Pid);
    return {
        props: {
            postData: data.data[0], page_from, Pid
        }
    };
}