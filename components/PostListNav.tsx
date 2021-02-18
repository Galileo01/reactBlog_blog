import React from 'react';
import { Anchor } from 'antd';
const { Link } = Anchor;
interface PostListNavProps {
    titleList: string[]
}
const PostListNav: React.FC<PostListNavProps> = ({ titleList }) => {

    return (
        <section className="list_nav">
            <div className="title">文章导航</div>
            <Anchor affix offsetTop={50} className="anchor_nav">
                {
                    titleList.map((title, index) => {
                        return (
                            <Link href={'#' + title} title={title} key={index} />
                        )
                    })
                }

            </Anchor>
        </section>
    )
}


export default PostListNav;
