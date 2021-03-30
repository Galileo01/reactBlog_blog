import { ins } from './index';

import { CommentItem, submitCommentItem ,nestedCommentItem} from '../commonJs/types';
interface commentRes {
    data: CommentItem[];
    ok: number;
}
interface addRes {
    data: CommentItem;
    ok: number;
}


// 获取 某个帖子的 评论  并 构造为 嵌套结构
export async function getByPid(Pid: number) {
    const { data } = await ins.get<commentRes>('/comment/getByPid', {
        params: {
            Pid,
        },
    });
    const commentList = data.data;
    // console.log(commentList);
    
    //第一层的评论
    const firstLevel = commentList.filter((item) => item.replyCid === null);
    const secondLevel = commentList.filter((item) => item.replyCid !== null);
    const result: nestedCommentItem[] = firstLevel.map((item) => {
        const { Cid } = item;
        const children = secondLevel.filter((item2) => item2.replyCid === Cid); //找到回复item 的评论
        return {
            ...item,
            children,
        };
    });
    return result;
}
export function addComment(info: submitCommentItem) {
    return ins.post<addRes>('/comment/add', info);
}
