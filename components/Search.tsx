import React, { useState, useMemo } from 'react'
import { Input, Select } from 'antd';
import { suggestItem } from '../commonJs/types'

export default function Search() {
    //建议列表
    const [suggestList, setList] = useState<suggestItem[]>([]);
    //计算属性  推荐的个数
    const count = useMemo(() => {
        return suggestList.length;
    }, [suggestList])
    function searchHandler(value: string) {
        console.log(value);
        setList([
            {
                title: 'test 666',
                Pid: 0
            },
            {
                title: 'test',
                Pid: 2
            },
            {
                title: 'test 777',
                Pid: 3
            }
        ])
    }



    return (
        <div className="header_search" >


            <Input.Search placeholder="输入关键词" style={{ width: 200 }} onSearch={searchHandler} />
            {/* <Select showSearch style={{ width: 200 }}  >
                {
                    suggestList.map(item => {
                        return (
                            <Select.Option value={item.Pid} key={item.Pid}>
                                {item.title}
                            </Select.Option>
                        )
                    })
                }
            </Select> */}
        </div>
    )
}
