//帖子类型 枚举
export enum postType {
    ARTICLE,
    NOTE,
    OTHER,
}

export interface postBaseInfo {
    title: string;
    desc: string;
    type: postType;
    Pid: number;
    keywords: string;
    updateTime: string;
}
export interface postItem extends postBaseInfo {
    content: string;
}

//搜索结果项
export interface suggestItem {
    title: string;
    Pid: number;
}

export interface CommentItem {
    Cid: number;
    Pid: number;
    replyCid: number;
    content: string;
    username: string;
    commentTime: string;
}
//嵌套的评论 item
export interface nestedCommentItem extends CommentItem {
    children: CommentItem[];
}


//提交 评论项 类型
export interface submitCommentItem {
    Pid: number;
    replyCid: number | null;
    content: string;
    username: string;
}

//列表泛型
export interface resListData<T> {
    data: T[];
    ok: number;
}