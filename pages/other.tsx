import MyHead from '../components/MyHead';
import Header from '../components/GlobalHeader';
import PostList from '../components/PostList';
import Footer from '../components/Footer';
import PostListNav from '../components/PostListNav';
import { Row, Col, BackTop } from 'antd';
import { postType } from '../commonJs/types'
import { getPostByType } from '../network/post'
export default function Other({ itemList }) {
    const itemTitle: string[] = itemList.map(item => item.title);
    return (
        <>
            <MyHead title="其他" />
            <Header />
            <BackTop />
            <main>
                <Row className="comm_main" justify="center">
                    <Col
                        className="comm_right"
                        xs={0}
                        sm={0}
                        md={6}
                        lg={4}
                        xl={4}
                    >
                        <section className="other_introdue introduce">
                            <div className="item">
                                <div className="title">其他</div>
                                <div className="text">
                                    其他，记录除前端开发等技术文章之外的 生活、学习之类的文章
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

                        <PostList itemList={itemList} headerText="其他" />
                    </Col>
                </Row>
            </main>

            <Footer />
        </>
    );
}

//服务端渲染 之前 请求数据
export async function getServerSideProps() {
    //获取 所有类别的 文章列表
    const { data, status } = await getPostByType(postType.OTHER);
    return { props: { itemList: data.data } };
}