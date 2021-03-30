import React, { useState, useEffect } from 'react';
import {
    Comment,
    Input,
    Row,
    Col,
    Button,
    notification,
    Spin,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import filterXSS from 'xss';
import moment from 'moment';
import { getByPid, addComment } from '../network/comment';
import { nestedCommentItem } from '../commonJs/types';
interface Props {
    Pid: number;
}

const PostComment: React.FC<Props> = ({ Pid }) => {
    // 加载评论列表
    const [commentList, setList] = useState<nestedCommentItem[]>([]);
    const [spinning, setSpinning] = useState(true);
    async function getComment() {
        const data = await getByPid(Pid);
        console.log(data);

        setList(data);
        setSpinning(false);
    }
    //开始渲染时  获取评论列表
    useEffect(() => {
        getComment();
    }, []);

    // 新增评论
    const [content, setContent] = useState('');
    const [username, setName] = useState('匿名用户');
    //提交评论
    async function submitComment() {
        console.log(content, username);
        if (content.length === 0)
            return notification.info({
                message: '请填写排评论内容',
                placement: 'bottomRight',
            });
        const { data } = await addComment({
            Pid,
            replyCid: null,
            content: filterXSS(content), //过滤字符串
            username,
        });
        console.log(data.data);
        if (data.ok) {
            notification.success({
                message: '评论成功',
                placement: 'bottomRight',
            });
            //添加 到评论列表
            setList([{ ...data.data, children: [] }, ...commentList]);
            // 清空输入
            setContent('');
        } else {
            notification.error({
                message: '评论失败',
                placement: 'bottomRight',
            });
        }
    }

    //新增 回复
    const [replyCid, setCid] = useState(0);
    const [replyContent, setReply] = useState('');
    const [replyUsername, setReplyName] = useState('匿名用户');
    async function submitReply() {
        const { data } = await addComment({
            Pid,
            replyCid,
            content: filterXSS(replyContent), //过滤字符串
            username: replyUsername,
        });
        const newReply = data.data;
        console.log(newReply);
        if (data.ok) {
            notification.success({
                message: '评论成功',
                placement: 'bottomRight',
            });
            //添加 到评论列表
            //创建新的列表
            const newList = commentList.map((item) => {
                if (item.Cid === replyCid) {
                    return {
                        ...item,
                        children: [newReply, ...item.children], //添加到对饮评论的 children 中
                    };
                } else return item;
            });
            setList(newList);
            //清空输入
            removeReplayInput();
        } else {
            notification.error({
                message: '评论失败',
                placement: 'bottomRight',
            });
        }
    }
    //移除 回复 输入框 的同时 清空数据
    function removeReplayInput() {
        setCid(0);
        setReply('');
        setReplyName('');
    }
    //高级函数 返回一个函数  点击回复时
    function clickHander(Cid: number) {
        return () => {
            setCid(Cid);
            // setContent
        };
    }

    return (
        <div className="post_comment comment">
            <section className="make_comment">
                <div className="title">添加评论</div>
                <Input.TextArea
                    rows={4}
                    onChange={(e) => setContent(e.target.value)}
                    allowClear
                />
                <Row justify="space-between" className="bottom">
                    <Col xs={17} sm={15} md={10} lg={10} xl={10}>
                        <Input
                            addonBefore={<UserOutlined />}
                            placeholder="输入你的昵称,默认值:匿名用户"
                            onChange={(e) => setName(e.target.value)}
                            allowClear
                        />
                    </Col>
                    <Col xs={6} sm={8} md={10} lg={10} xl={10}>
                        <Button
                            type="primary"
                            size="middle"
                            onClick={submitComment}
                        >
                            提交评论
                        </Button>
                    </Col>
                </Row>
            </section>
            <section className="comment_list">
                <div className="title">最新评论</div>
                <Spin spinning={spinning}>
                    {commentList.map((item) => {
                        return (
                            <div key={item.Cid}>
                                <Comment
                                    author={<span>{item.username}</span>}
                                    content={item.content}
                                    actions={[
                                        <span
                                            className="actions"
                                            onClick={clickHander(item.Cid)}
                                        >
                                            回复
                                        </span>,
                                    ]}
                                    datetime={
                                        <span>
                                            {moment(item.commentTime).format(
                                                'YYYY-MM-DD HH:mm:ss'
                                            )}
                                        </span>
                                    }
                                >
                                    {/* 嵌套的 二级评论 */}
                                    {item.children.map((item2) => {
                                        return (
                                            <Comment
                                                author={
                                                    <span>
                                                        {item2.username}
                                                    </span>
                                                }
                                                content={item2.content}
                                                datetime={
                                                    <span>
                                                        {moment(
                                                            item2.commentTime
                                                        ).format(
                                                            'YYYY-MM-DD HH:mm:ss'
                                                        )}
                                                    </span>
                                                }
                                                key={item2.Cid}
                                                className="nested"
                                            />
                                        );
                                    })}
                                </Comment>
                                {/* 评论 回复的 输入框 ，只有在 replyCid为当前Cid 时才渲染 */}
                                {replyCid === item.Cid && (
                                    <section className="replay_comment">
                                        <Input.TextArea
                                            rows={2}
                                            onChange={(e) =>
                                                setReply(e.target.value)
                                            }
                                            allowClear
                                        />
                                        <Row
                                            justify="space-between"
                                            className="bottom"
                                        >
                                            <Col
                                                xs={16}
                                                sm={15}
                                                md={10}
                                                lg={10}
                                                xl={10}
                                            >
                                                <Input
                                                    addonBefore={
                                                        <UserOutlined />
                                                    }
                                                    placeholder="输入你的昵称,默认值:匿名用户"
                                                    onChange={(e) =>
                                                        setReplyName(
                                                            e.target.value
                                                        )
                                                    }
                                                    allowClear
                                                />
                                            </Col>
                                            <Col
                                                xs={7}
                                                sm={8}
                                                md={10}
                                                lg={10}
                                                xl={10}
                                                className="btns"
                                            >
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    onClick={submitReply}
                                                >
                                                    回复
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    danger
                                                    size="small"
                                                    onClick={removeReplayInput}
                                                >
                                                    取消
                                                </Button>
                                            </Col>
                                        </Row>
                                    </section>
                                )}
                            </div>
                        );
                    })}
                </Spin>
            </section>
        </div>
    );
};
export default PostComment;
