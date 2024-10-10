import request from '@/utils/request.js';

export const post_page = (pageNum, pageSize, postClassificationId, userId) => {
    return request.get("/post/page", {
        params: {
            pageNum: pageNum,
            pageSize: pageSize,
            postClassificationId: postClassificationId,
            userId: userId,
        }
    })
}

export const add_postLikeStatistics = (postId) => {
    return request.post("/postLikeStatistics", {
        postId: postId,
    })
}

export const del_postLikeStatistics = (postId) => {
    return request.delete("/postLikeStatistics" + "/" + postId)
}
