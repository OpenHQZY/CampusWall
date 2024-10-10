import request from '@/utils/request.js';

export const post_getPost_postId_userId = (postId, userId) => {
    // 帖子信息获取
    // return request.get("/post/getPost" + "/" + postId + "/" + userId)
    return request.get("/post/getPost", {
        params: {
            postId: postId,
            userId: userId
        }
    })
}
export const postComment_getPostComment = (postId, userId, sort) => {
    console.log(sort)
    // 评论信息获取
    // return request.get("/postComment/getPostComment" + "/" + postId + "/" + userId + "/" + type)
    return request.get("/postComment/getPostComment", {
        params: {
            postId: postId,
            userId: userId,
            sort: sort
        }
    })
}

export const postComment = (postCommentContent, postCommentPicture, postCommentTime, postParentCommentId, postId, userId) => {
    // 添加评论
    return request.post("/postComment", {
        postCommentContent: postCommentContent,
        postCommentPicture: postCommentPicture,
        postCommentTime: postCommentTime,
        postParentCommentId: postParentCommentId,
        postId: postId,
        userId: userId,
    })
}

export const add_postCommentLike = (postCommentId, userId) => {
    // 评论添加点赞
    return request.post("/postCommentLike", {
        postCommentId: postCommentId,
        userId: userId,
    })
}

export const del_postCommentLike = (postCommentId) => {
    // 评论取消点赞
    return request.delete("/postCommentLike" + "/" + postCommentId)
}

export const add_postCollect = (postCollectTime, postId, userId) => {
    // 帖子添加收藏
    return request.post("/postCollect", {
        postCollectTime: postCollectTime,
        postId: postId,
        userId: userId,
    })
}

export const del_postCollect = (postId) => {
    // 帖子取消收藏
    return request.delete("/postCollect" + "/" + postId)
}

export const add_postReport = (postReportContent, postReportTime, postId) => {
    // 帖子添加举报
    return request.post("/postReport", {
        postReportContent: postReportContent,
        postReportTime: postReportTime,
        postId: postId,
    })
}

export const del_postComment = (postCommentId) => {
    // 帖子删除
    return request.delete("/postComment" + "/" + postCommentId)
}
