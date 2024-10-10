import request from '@/utils/request.js';

export const post = (model) => {
    return request.post("/post", {
        postContent: model.postContent,
        postPictures: model.postPictures,
        postTime: model.postTime,
        postClassificationId: model.postclassificationId
    })
}
export const postClassification = () => {
    return request.get("/postClassification")
}
