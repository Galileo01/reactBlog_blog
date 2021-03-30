import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const PostComment = dynamic(() => import('../components/PostComment'));
interface Props {
    Pid: number;
}

//外层容器
const PostWapper: React.FC<Props> = ({ Pid }) => {
    //懒加载评论
    const [commentVisible, setVisible] = useState(false);
    useEffect(() => {
        const target = document.querySelector('.global_footer');
        console.log(target);

        const observer = new IntersectionObserver((entries) => {
            const { intersectionRatio } = entries[0];
            //footer 可见
            if (intersectionRatio > 0) {
                observer.unobserve(target); //取消观察
                console.log('show comment');
                setVisible(true);
                observer.disconnect(); //关闭观察器
            }
        });
        //观察 title
        observer.observe(target);
    }, []);
    return <>{commentVisible ? <PostComment Pid={Pid} /> : ''}</>;
};

export default PostWapper;
