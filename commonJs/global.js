import {
    BookOutlined,
    EditOutlined,
    TagOutlined,
} from '@ant-design/icons';
//帖子类型
export const postTypes = [
    {
        icon: <BookOutlined />,
        text: '文章',
        typeCode: 0,
        name: 'article',
    },
    {
        icon: <EditOutlined />,
        text: '笔记',
        typeCode: 1,
        name: 'note',
    },
    {
        icon: <TagOutlined />,
        text: '其他',
        typeCode: 2,
        name: 'other',
    },
];
