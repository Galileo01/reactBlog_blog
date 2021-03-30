import { ins } from './index';

import {
    postBaseInfo,
    postItem,
    postType,
    resListData,
    resData,
} from '../commonJs/types';
//基础信息 数组
type basePostListRes = resListData<postBaseInfo>;

//完整信息 数组
type postListRes = resListData<postItem>;

export function getAllPost() {
    return ins.get<basePostListRes>('/post/getAll');
}

export function getPostByPid(Pid: number) {
    return ins.get<resData<postItem>>('/post/getByPid', {
        params: {
            Pid,
        },
    });
}

export function getPostByType(type: postType) {
    return ins.get<basePostListRes>('/post/getByType', {
        params: {
            type,
        },
    });
}
//递增 帖子的 阅读次数
export function increCount(Pid: number) {
    return ins.post<resData<string | number>>('/post/increCount', {
        Pid,
    });
}
