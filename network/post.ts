import { ins } from './index';
import { postBaseInfo, postItem, postType } from '../commonJs/types';
type basePostListRes = {
    data: postBaseInfo[];
    ok: number;
};
type postListRes = {
    data: postItem[];
    ok: number;
};
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
