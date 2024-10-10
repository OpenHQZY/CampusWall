import request from '@/utils/request.js';

export const notice = () => {
    return request.get("/notice")
}