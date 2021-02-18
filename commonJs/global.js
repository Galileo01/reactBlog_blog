import { BookOutlined, EditOutlined, TagOutlined } from '@ant-design/icons';
import { postType } from './types';
//帖子类型

export const postTypes = [
    {
        icon: <BookOutlined />,
        text: '文章',
        typeCode: postType.ARTICLE,
        name: 'article',
    },
    {
        icon: <EditOutlined />,
        text: '笔记',
        typeCode: postType.NOTE,
        name: 'note',
    },
    {
        icon: <TagOutlined />,
        text: '其他',
        typeCode: postType.OTHER,
        name: 'other',
    },
];

export const postTypeText = postTypes.map((item) => ({
    typeCode: item.typeCode,
    name: item.name,
    text:item.text
}));
