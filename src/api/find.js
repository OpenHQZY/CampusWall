import request from '@/utils/request.js';

export const post_getPostHeatRank = () => {
    // 发现页面热门帖子
    return request.get("/post/getPostHeatRank")
}
export const post_page = (pageNum, pageSize, postContent, userId) => {
    // 搜索帖子
    return request.get("/post/page", {
        params: {
            pageNum: pageNum,
            pageSize: pageSize,
            postContent: postContent,
            userId: userId,
        }
    })
}