import axios from 'axios';
const baseURL = 'http://localhost:5000';
const ins = axios.create({
    baseURL,
    timeout: 5000,
});


//请求出错时 catch 的处理函数
const errHandler = (err) => {
    // window.$message.error('数据请求失败，请检查网络或重试');//全局输出
    console.log(err);
    return {
        status: err.response.status,
        msg: err,
    };
};

export { ins, errHandler };