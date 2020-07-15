import qs from 'qs';
import axios from 'axios';
import Cookies from 'js-cookie';

const { originUrl='//icity-dev.cloud.cityworks.cn', loginParams = {
    client_id: 'a1c7b4a4ade84e888009dcdad83909a1', // 应用id
    client_secret: '8d28a7aef4af477a8da685a3afaa75d8', // 应用私钥
    response_type: 'code', // code
    state: '_oAuth',
} } = window.ENV;
/**
 * 跳转到登录
 */
export const jumpToLogin = ()=> {
    Cookies.remove('token');
    const params = {
        redirect_uri: window.location.href.replace(window.location.search, ''),
        ...loginParams,
        random: Date.now(),
    };
    window.location = `${originUrl}/api/reception-center/oauth/authorize?${qs.stringify(params)}`
}
export const parseUrlParams = (search)=> {
    if (search.indexOf('?') === 0) {
        search = search.substring(1);
    }
    return qs.parse(search);
}
export const  getToken = async(searchParams)=> {
    // 调用获取token接口
    const params = {
        ...loginParams,
        ...searchParams,
        grant_type: 'authorization_code',
        redirect_uri: window.location.href.replace(window.location.search, ''),
    };
    const res = await axios.post(
        `${originUrl}/api/reception-center/oauth/token`,
        qs.stringify(params),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    return res.data;
}
export const beforeRoute = async ()=>{
    const searchParams = parseUrlParams(window.location.search);
    const saveToken = Cookies.get('token');
    if (!saveToken) {
        if (searchParams.code && searchParams.state === loginParams.state) {
            const { access_token, expires_in } = await getToken(searchParams);
            Cookies.set('token', access_token, { expires: expires_in / 60 / 60 / 24 });
        } else {
            jumpToLogin();
        }
    }
}

