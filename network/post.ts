import { ins } from './index';
import {
    postBaseInfo,
    postItem,
    postType,
    resListData,
} from '../commonJs/types';
//基础信息 数组
type basePostListRes = resListData<postBaseInfo>;

//完整信息 数组
type postListRes = resListData<postItem>;

export function getAllPost() {
    return ins.get<basePostListRes>('/post/getAll');
}

export function getPostByPid(Pid: number) {
    return ins.get<postListRes>('/post/getByPid', {
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
