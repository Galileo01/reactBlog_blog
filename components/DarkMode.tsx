import React, { useEffect, useState } from 'react';
import { notification, Tooltip } from 'antd';
type modeEnmu = 'day' | 'night';
export default function DarkMode() {
    const [mode, setMode] = useState<modeEnmu>('day');
    //组件挂载  查看 系统的 主题模式
    useEffect(() => {
        const colorSchemeQuery = matchMedia('(prefers-color-scheme: dark)');
        const storageMode = sessionStorage.getItem('mode');
        if (storageMode) {
            switchMode(storageMode as modeEnmu); //
        }
        // 进入页面,判断 浏览器是否支持 媒体查询'(prefers-color-scheme: dark)'
        else if (colorSchemeQuery.media === '(prefers-color-scheme: dark)') {
            if (colorSchemeQuery.matches) {
                switchMode('night');
                notification.info({
                    message: '跟随系统 切换到夜间模式',
                    placement: 'bottomRight',
                });
            }
        } else {
            console.log('当前浏览器不支持跟随系统暗黑模式');
        }
    }, []);
    //颜色变量
    const vars = {
        '--bgc-body': {
            night: '#202124',
            day: '#f6f6f6',
        },
        '--bgc': {
            night: '#252a2f',
            day: '#fff',
        },
        '--text-color': {
            night: '#fff',
            day: 'rgba(0, 0, 0, 0.85)',
        },
        '--post_list-item-desc-color': {
            night: '#f6f6f6',
            day: '#777',
        },
        '--post_list-small-color': {
            night: '#f6f6f6',
            day: '#aaa',
        },
        '--global_footer-color': {
            night: '#f6f6f6',
            day: '#4e6e8e',
        },
        '--introduce-text-color': {
            night: '#f6f6f6',
            day: '#4e6e8e',
        },
        '--detail-content-color': {
            night: '#f6f6f6',
            day: '#555454',
        },
    };
    const imgSrc = {
        night:
            'https://cdn.jsdelivr.net/gh/Galileo01/imgCloud@master/night.png',
        day: 'https://cdn.jsdelivr.net/gh/Galileo01/imgCloud@master/day.png',
    };
    //设置颜色
    function switchMode(mode: modeEnmu) {
        for (let prop in vars) {
            document.documentElement.style.setProperty(prop, vars[prop][mode]);
        }
        setMode(mode);
        sessionStorage.setItem('mode', mode);
    }
    return (
        <Tooltip
            title={'切换到' + (mode === 'day' ? '夜间模式' : '日间模式')}
            placement="bottom"
        >
            <span
                className="darkmode"
                onClick={() => switchMode(mode === 'day' ? 'night' : 'day')}
            >
                <img src={imgSrc[mode]} alt="模式 图片" />
            </span>
        </Tooltip>
    );
}
