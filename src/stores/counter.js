// stores/counter.js
import {defineStore} from 'pinia';
import {ref, watch} from 'vue';

export const useCounterStore = defineStore('counter', () => {
    const oss_url = ref("http://1d905bee.r25.cpolar.top/file/OSSUpload");
    const get_user_id = () => {
        if (user.value) {
            return user.value.userId
        } else {
            return null
        }
    }

    function uuid() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        return s.join("");
    }

    // -----------------登入信息-----------------
    const user = ref()

    // 读取本地存储的用户信息
    const loadUser = () => {
        const storedUser = uni.getStorageSync('user');
        if (storedUser) {
            user.value = JSON.parse(storedUser);
        }
    };

    // 保存用户信息到本地存储
    const saveUser = () => {
        uni.setStorageSync('user', JSON.stringify(user.value));
    };

    // 当user值变化时，保存到本地存储
    watch(user, (newValue) => {
        saveUser();
    }, {deep: true});

    // 初始化时加载用户信息
    loadUser();

    // -----------------首页-----------------
    const index_link_options = ref([
        {
            link_id: 1,
            link_name: "湖汽课表",
            link_head: "/static/index/hqkb.png",
            link_type: "page",
            link_appid: "",
            link_page: "/pages/link_course/link_course",
        },
        {
            link_id: 2,
            link_name: "最新校历",
            link_head: "/static/index/zxxl.png",
            link_type: "page",
            link_appid: "",
            link_page: "/pages/link_calendar/link_calendar",
        },
        {
            link_id: 3,
            link_name: "卡博士",
            link_head: "/static/index/kbs.png",
            link_type: "miniProgram",
            link_appid: "wxf9569df45c91b366",
            link_page: ""
        },
        {
            link_id: 4,
            link_name: "久久折",
            link_head: "/static/index/jjz.png",
            link_type: "miniProgram",
            link_appid: "wxd2f16468474f61b8",
            link_page: ""
        },
        {
            link_id: 5,
            link_name: "小熊校园",
            link_head: "/static/index/xxxy.png",
            link_type: "miniProgram",
            link_appid: "wxaef7b4069cfeb888",
            link_page: ""
        },
    ]);
    const index_notice_text = ref([])
    const index_tabs = ref([]);
    const index_tab = ref('全部');
    const index_tab_data = ref([]);
    const index_glide_loading = ref(true);
    const index_glide_loading_desc = ref("努力加载中...");
    const index__glide_total_num = ref(5);
    // -----------------首页-----------------

    // -----------------详情-----------------
    const detail_card_data = ref([]);
    const detail_comment_data = ref([]);
    const detail_segmented_list = (['热度', '时间']);
    const detail_segmented_current = ref('热度');
    const detail_comment_show = ref(false);
    const detail_comment_inp = ref("");
    const detail_comment_reply_desc = ref([]);
    const detail_comment_reply_var = ref([]);
    const detail_collect = ref(false);
    const detail_report_show = ref(false);
    const detail_submit_postParentCommentId = ref();
    const detail_submit_postCommentPicture = ref("");
    const detail_report_inp = ref("");
    const detail_touchT = ref("")
    const detail_touchE = ref("")
    const detail_comment_show_status = ref(false);
    const detail_comment_touch_data = ref([]);
    const detail_send_detail_comment_data_type = ref(2);
    // -----------------详情-----------------

    // -----------------发现-----------------
    const find_search_inp = ref("");
    const find_search_data = ref([]);
    const find_search_status = ref(false);
    const find_search_index_data = ref([]);
    const find_hot_data = ref([]);
    const find_glide_loading = ref(true);
    const find_glide_loading_desc = ref("努力加载中...");
    const find__glide_total_num = ref(5);
    // -----------------发现-----------------

    // -----------------发帖-----------------
    const card_tabs = ref([]);
    const card_tabs_show = ref(false);
    const card_tabs_select = ref(1);
    const card_show_desc = ref("");
    // -----------------发帖-----------------


    // -----------------湖汽课表-----------------
    const link_course_or_code = ref("/static/link_course/or_code.png")
    const link_course_url = ref("https://c.d5v.cc/")
    // -----------------湖汽课表-----------------

    return {
        oss_url,
        uuid,
        get_user_id,
        // -----------------登入信息-----------------
        user,
        // -----------------首页-----------------
        index_link_options,
        index_notice_text,
        index_tabs,
        index_tab,
        index_tab_data,
        index_glide_loading,
        index_glide_loading_desc,
        index__glide_total_num,
        // -----------------首页-----------------

        // -----------------详情-----------------
        detail_card_data,
        detail_comment_data,
        detail_segmented_list,
        detail_segmented_current,
        detail_comment_show,
        detail_comment_inp,
        detail_comment_reply_desc,
        detail_comment_reply_var,
        detail_collect,
        detail_report_show,
        detail_submit_postParentCommentId,
        detail_submit_postCommentPicture,
        detail_report_inp,
        detail_touchT,
        detail_touchE,
        detail_comment_show_status,
        detail_comment_touch_data,
        detail_send_detail_comment_data_type,
        // -----------------详情-----------------

        // -----------------发现-----------------
        find_search_inp,
        find_search_data,
        find_search_status,
        find_search_index_data,
        find_hot_data,
        find_glide_loading,
        find_glide_loading_desc,
        find__glide_total_num,
        // -----------------发现-----------------

        // -----------------发帖-----------------
        card_tabs,
        card_tabs_show,
        card_tabs_select,
        card_show_desc,
        // -----------------发帖-----------------

        // -----------------湖汽课表-----------------
        link_course_or_code,
        link_course_url,
        // -----------------湖汽课表-----------------
    };
});
