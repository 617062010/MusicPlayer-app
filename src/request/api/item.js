import service from "..";

// 获取歌单详情页
export function getMusicItem(data){
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${data}`
    })
}
// 获取音乐url,传入音乐id
export function getSongUrl(data){
    return service({
        method: 'GET',
        url: `/song/url?id=${data}`
    })
}


// 获取音乐
export function getMusicDetail(data){
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${data}`
    })
}


// 输入音乐id，获取音乐信息
export function getSongDetail(data){
    return service({
        method: 'GET',
        url: `/song/detail?ids=${data}`
    })
}

// 获取歌词
export function getSongLyric(data){
    return service({
        method: 'GET',
        url: `/lyric?id=${data}`
    })
}