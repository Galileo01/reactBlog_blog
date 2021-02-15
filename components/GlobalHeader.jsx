import React from 'react';
import { Row, Col, Menu, Affix } from 'antd';
import { HomeOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons'
import Image from 'next/image';
import { useRouter } from 'next/router';
const { Item } = Menu;
import { postTypes } from '../commonJs/global';
export default function Header() {
    const router = useRouter();
    console.log(router);
    //默认选中
    const keys = ['/', '/about', ...postTypes.map(item => '/' + item.name)];
    const selectedKeys = [];
    for (let key of keys) {
        if (router.pathname === key) {
            selectedKeys.push(key);
            break;
        }
    }


    //导航跳转
    function goto(path) {
        if (path === '/search') return;
        console.log(router.pathname);
        //若当前就处于该 路径 不跳转
        router.pathname !== path && router.push(path);
    }
    return (
        <Affix offsetTop={0}>
            <section className="header_wapper">
                <Row justify="center" align="middle">
                    <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                        <div className="avatar_wapper">
                            <div className="avatar" onClick={() => goto('/')}>
                                <Image alt="头像" src="/icon.jpg" height={40} width={40} />
                            </div>
                            <div className="text">
                                <span className="name">
                                    MARK
                        </span>
                                <span className="other">个人博客</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={1} sm={1} md={10} lg={10} xl={10}>
                        <div className="nav_wapper">
                            <Menu mode="horizontal" onClick={(p) => goto(p.key)} selectedKeys={selectedKeys}>
                                <Item icon={<HomeOutlined />} key="/" >首页</Item>
                                {
                                    postTypes.map(item => {
                                        return (
                                            <Item icon={item.icon} key={'/' + item.name}>
                                                {item.text}
                                            </Item>
                                        )
                                    })
                                }
                                <Item icon={<InfoCircleOutlined />} key="/about">关于</Item>
                                <Item icon={<SearchOutlined />} key="/search"></Item>
                            </Menu>
                        </div>
                    </Col>
                </Row>
            </section>
        </Affix>
    )
}
