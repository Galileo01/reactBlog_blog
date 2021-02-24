import { notification, Button } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { postBaseInfo } from '../commonJs/types';
export default function useRecentUpdate(recendPost: postBaseInfo) {
    const router = useRouter();
    const recent = moment(recendPost.updateTime);
    //计算 时间相差的天数
    const diff = moment().diff(recent, 'days');
    function clickHandler() {
        notification.close('recent');
        router.push(
            '/detail?Pid=' + recendPost.Pid + `&page_from=${router.pathname}`
        );
    }

    if (diff < 5) {
        const btn = (
            <Button type="primary" size="small" onClick={clickHandler}>
                立即查看
            </Button>
        );
        notification.info({
            message: '最近更新',
            placement: 'bottomRight',
            description: recendPost.title,
            btn,
            key: 'recent',
        });
    }
}
