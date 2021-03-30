import React from 'react';
import { Row, Col, Menu, Affix } from 'antd';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const { Item } = Menu;
import { postTypes } from '../commonJs/global';
import DarkMode from './DarkMode';

export default function Header() {
    const router = useRouter();
    console.log(router);
    //默认选中
    const keys = ['/', '/about', ...postTypes.map((item) => '/' + item.name)];
    const selectedKeys: string[] = [];
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
                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div className="avatar_wapper">
                            <div className="avatar" onClick={() => goto('/')}>
                                <img
                                    alt="头像"
                                    src="https://cdn.jsdelivr.net/gh/Galileo01/imgCloud@master/icon.jpg"
                                    height={40}
                                    width={40}
                                />
                            </div>
                            <div className="text">
                                <span className="name">MARK</span>
                                <span className="other">个人博客</span>
                            </div>
                        </div>
                    </Col>
                    {/* <Col xs={0} sm={5} md={{span:4,offset:2}} lg={{span:4,offset:3}} xl={{span:4,offset:3}}>  <Search /></Col> */}
                    <Col xs={2} sm={1} md={10} lg={10} xl={8}>
                        <div className="nav_wapper">
                            <Menu
                                mode="horizontal"
                                onClick={(p) => goto(p.key)}
                                selectedKeys={selectedKeys}
                            >
                                <Item icon={<HomeOutlined />} key="/">
                                    首页
                                </Item>
                                {postTypes.map((item) => {
                                    return (
                                        <Item
                                            icon={item.icon}
                                            key={'/' + item.name}
                                        >
                                            {item.text}
                                        </Item>
                                    );
                                })}
                                <Item
                                    icon={<InfoCircleOutlined />}
                                    key="/about"
                                >
                                    关于
                                </Item>
                            </Menu>
                        </div>
                    </Col>
                    <Col span={2} xs={{ offset: 1 }}>
                        <DarkMode />
                    </Col>
                </Row>
            </section>
        </Affix>
    );
}
