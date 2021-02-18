import MyHead from '../components/MyHead';
import Header from '../components/GlobalHeader';
import Footer from '../components/Footer';

export default function About() {
    return (
        <>
            <MyHead title="关于" />
            <Header />
            <main className="about ">
                <section className="introduce">
                    <div className="item">
                        <div className="title">
                            关于我
                    </div>
                        <div className="text">
                            <p>
                                计算机科学与技术 专业 2018级本科在读
                        </p>
                            <p>专研于 前端开发</p>
                            <p>校内前端实验室主要成员</p>
                            <p>对Vue 较为熟悉，初学React</p>
                            <p>技术栈：原生JS、JQuery、Vue、Wepy、React</p>
                            <p><a href="https://github.com/Galileo01">Github</a></p>
                            <p><a href="https://gitee.com/ego-git">Gitee 码云</a></p>
                            <p><a href="https://juejin.cn/user/325111174668062">掘金</a></p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            主要项目
                    </div>
                        <div className="text">
                            <p><a href="https://github.com/Galileo01/reactBlog">React 博客系统(本博客)</a></p>
                            <p>
                                <a href="https://github.com/Galileo01/Risk_management_system_byVue">重大风险隐患排除与治理系统</a>
                            </p>
                            <p><a href="https://github.com/Galileo01/School_life_management_Vue">校园宝后台管理界面</a></p>
                            <p><a href="https://github.com/Galileo01/chrome_extends">chrome 扩展仓库</a></p>
                            <p><a href="https://github.com/Galileo01/campus_cat_book">小程序-校园猫猫图鉴/全栈开发</a></p>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
