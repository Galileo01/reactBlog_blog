import React from 'react';
import MyHead from '../components/MyHead';
import Header from '../components/GlobalHeader';
import PostList from '../components/PostList';
import Footer from '../components/Footer';
import PostListNav from '../components/PostListNav';
import { Row, Col, BackTop } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { getAllPost } from '../network/post';
import { postBaseInfo } from '../commonJs/types';
interface HomeProps {
    itemList: postBaseInfo[]
}
const Home: React.FC<HomeProps> = ({ itemList }) => {
    const itemTitle = itemList.map(item => item.title);
    return (
        <>
            <MyHead title="首页" />
            <Header />
            <BackTop />
            <main className="index">
                <Row className="comm_main" justify="center">
                    <Col
                        className="comm_right"
                        xs={0}
                        sm={0}
                        md={6}
                        lg={4}
                        xl={4}
                    >
                        <section className="index_introduce introduce" >
                            <div className="item">
                                <div className="title">
                                    个人博客
                            </div>
                                <div className="text">记录知识和学习心得</div>
                            </div>
                            <div className="item">
                                <div className="title">
                                    Next 搭建
                            </div>
                                <div className="text">基于Next 进行服务端渲染,React 结合antd 渲染页面</div>
                            </div>
                            <div className="item">
                                <div className="title">
                                    前端萌新
                            </div>
                                <div className="text">计算机科学与技术 本科在读</div>
                            </div>
                            <div className="item">
                                <div className="title">
                                    Github
                            </div>
                                <div className="text">
                                    <a href="https://github.com/Galileo01">
                                        仓库主页 : <GithubOutlined />
                                    </a>
                                </div>
                            </div>
                        </section>
                        <PostListNav titleList={itemTitle} />
                    </Col>
                    <Col
                        className="comm_left"
                        xs={23}
                        sm={23}
                        md={16}
                        lg={18}
                        xl={14}
                    >

                        <PostList itemList={itemList} headerText="所有帖子" />
                    </Col>
                </Row>
            </main>

            <Footer />
        </>
    );
}

export default Home;
//服务端渲染 之前 请求数据
export async function getServerSideProps() {
    //获取 所有类别的 文章列表
    const { data, status } = await getAllPost();
    // console.log('data', data);
    return { props: { itemList: data.data } };
}