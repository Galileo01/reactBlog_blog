import React from 'react';
import { List, Tag } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { postTypes } from '../commonJs/global';
import { postBaseInfo } from '../commonJs/types';
import { EyeOutlined } from '@ant-design/icons';
interface Props {
    itemList: postBaseInfo[];
    headerText: string;
}
function format(dateStr) {
    const time = moment(dateStr);
    return time.format('YYYY/MM/DD');
}

const PostList: React.FC<Props> = ({ itemList, headerText }) => {
    const router = useRouter();
    return (
        <List
            header={<h1 className="list_title">{headerText}</h1>}
            itemLayout="vertical"
            dataSource={itemList}
            className="posts_list"
            renderItem={(item) => (
                <List.Item className="post_item" key={item.Pid}>
                    <div className="item_title">
                        <span className="jin" id={item.title}>
                            #
                        </span>
                        -
                        <a
                            href={
                                '/detail?Pid=' +
                                item.Pid +
                                `&page_from=${router.pathname}`
                            }
                        >
                            {item.title}{' '}
                        </a>
                    </div>
                    <div className="item_icon small">
                        分类：
                        {postTypes[item.type].icon}
                        <span className="text">
                            {postTypes[item.type].text}
                        </span>
                    </div>

                    <div className="item_desc ">{item.desc}</div>
                    <div className="item_keyword small">
                        关键词：
                        {item.keywords.split(' ').map((word, index) => (
                            <Tag key={'key' + index}>{word}</Tag>
                        ))}
                    </div>
                    <div className="bottom">
                        <div className="small update-time">
                            更新时间 :{format(item.updateTime)}
                        </div>
                        <div className="small read-count">
                            阅读
                            <span>{item.readCount}</span>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    );
};
export default PostList;
