// stores/counter.js
import {defineStore} from 'pinia';
import {ref} from 'vue'

export const useCounterStore = defineStore('counter', () => {
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

    // -----------------首页-----------------
    const index_link_options = ref([
        ["1", "湖汽课表", "https://c.d5v.cc/", "/static/index/test_head.png"],
        ["2", "新生手册", "https://c.d5v.cc/", "/static/index/test_head.png"],
        ["3", "最新校历", "https://c.d5v.cc/", "/static/index/test_head.png"],
        ["4", "全景校园", "https://c.d5v.cc/", "/static/index/test_head.png"],
        ["5", "实时公交", "https://c.d5v.cc/", "/static/index/test_head.png"],
    ]);
    const index_notice_text = ref([

        ["20", '欢迎使用wot design uni欢迎使用wot design uni欢迎使用wot design uni欢迎使用wot design uni欢迎使用wot design uni欢迎使用wot design uni欢迎使用wot design uni欢迎使用wot design uni欢迎使用wot design uni欢迎使用wot design uni欢迎使用wot design uni', "2024-08-10 16:40"],
        ["19", '该组件库基于uniapp ->Vue3, ts构建', "2024-08-09 16:40"],
        ["18", '项目地址：https://github.com/Moonofweisheng/wot-design-uni', "2024-08-08 16:40"],
        ["17", '我们的目标是打造最强uniapp组件库', "2024-08-07 16:40"],
        ["16", '诚挚邀请大家共同建设', "2024-08-06 16:40"],
        ["15", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["14", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["13", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["12", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["11", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["10", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["9", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["8", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["7", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["6", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["5", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["4", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["3", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["2", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
        ["1", '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息', "2024-08-02 16:40"],
    ])
    const index_tabs = ref(['全部', '最美新生', '二手闲置', '打听求助', '分享生活', '吐槽爆料', '恋爱交友', '拼车拼单']);
    const index_tab = ref('全部');
    const index_tab_data = ref([
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "80.5w", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png",
                "/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png",
                "/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png",
                "/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png",
                "/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"], "最美新生", "15.6w", "500.5w"],
        ["164513", "/static/index/test_head.png", "某同学alagjexiag某同学alagjexiag某同学alagjexiag某同学alagjexiag某同学alagjexiag", "2024-08-06 16:40", "46521", "金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png",], "最美新生", "13541", "69854"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
        ["164512", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "84", "金融专业的学长学姐们", true,
            ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png"],
            "最美新生", "15", "50"],
    ]);
    // -----------------首页-----------------

    // -----------------详情-----------------
    const detail_card_data = ref(["164512", "54625", "/static/index/test_head.png", "某同学alagjexiag", "1小时前", "80.5w", "金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长学姐们金融专业的学长", true,
        ["/static/index/test_head.png", "/static/index/test_head.png", "/static/index/test_head.png",
            "/static/index/test_head.png"], "最美新生", "15.6w", "500.5w", 14]);
    const detail_comment_data_hot = ref([
        ["164512", "54625", "16452", "/static/index/test_head.png", "张三", "我去好美好美", "1小时前", 4, [
            ["164512", "54626", "95412", "/static/index/test_head.png", "李四", "你又知道美了？", "1小时前", 5, ""],
            ["164512", "54627", "36524", "/static/index/test_head.png", "王五", "不比你知道？", "1小时前", 6, "李四"],
            ["164512", "54628", "65241", "/static/index/test_head.png", "赵六", "美美美！！！", "1小时前", 2, ""],
            ["164512", "54629", "95412", "/static/index/test_head.png", "李四", "你知道个蛋", "1小时前", 3, "王五"],
            ["164512", "546230", "36524", "/static/index/test_head.png", "王五", "你才是知道个蛋", "1小时前", 8, "李四"],
        ]],
        ["164512", "54631", "13652", "/static/index/test_head.png", "小明", "博主是谁啊", "1小时前", 50, [
            ["164512", "54632", "26854", "/static/index/test_head.png", "小红", "迷你世界大王好像？", "1小时前", 32, ""],
        ]],
        ["164512", "54633", "13657", "/static/index/test_head.png", "小刚", "我玩原神！", "1小时前", 78, []],
        ["164512", "54634", "65245", "/static/index/test_head.png", "小刚", "就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗", "1小时前", 78, []],
    ]);
    const detail_comment_data_time = ref([
        ["164512", "54633", "13657", "/static/index/test_head.png", "小刚", "我玩原神！", "1小时前", 78, []],
        ["164512", "54634", "65245", "/static/index/test_head.png", "小刚", "就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗", "1小时前", 78, []],
        ["164512", "54631", "13652", "/static/index/test_head.png", "小明", "博主是谁啊", "1小时前", 50, [
            ["164512", "54632", "26854", "/static/index/test_head.png", "小红", "迷你世界大王好像？", "1小时前", 32, ""],
        ]],
        ["164512", "54625", "16452", "/static/index/test_head.png", "张三", "我去好美好美", "1小时前", 4, [
            ["164512", "54626", "95412", "/static/index/test_head.png", "李四", "你又知道美了？", "1小时前", 5, ""],
            ["164512", "54627", "36524", "/static/index/test_head.png", "王五", "不比你知道？", "1小时前", 6, "李四"],
            ["164512", "54628", "65241", "/static/index/test_head.png", "赵六", "美美美！！！", "1小时前", 2, ""],
            ["164512", "54629", "95412", "/static/index/test_head.png", "李四", "你知道个蛋", "1小时前", 3, "王五"],
            ["164512", "546230", "36524", "/static/index/test_head.png", "王五", "你才是知道个蛋", "1小时前", 8, "李四"],
        ]],
    ]);
    const detail_comment_data = ref([
        ["164512", "54625", "16452", "/static/index/test_head.png", "张三", "我去好美好美", "1小时前", 4, [
            ["164512", "54626", "95412", "/static/index/test_head.png", "李四", "你又知道美了？", "1小时前", 5, ""],
            ["164512", "54627", "36524", "/static/index/test_head.png", "王五", "不比你知道？", "1小时前", 6, "李四"],
            ["164512", "54628", "65241", "/static/index/test_head.png", "赵六", "美美美！！！", "1小时前", 2, ""],
            ["164512", "54629", "95412", "/static/index/test_head.png", "李四", "你知道个蛋", "1小时前", 3, "王五"],
            ["164512", "546230", "36524", "/static/index/test_head.png", "王五", "你才是知道个蛋", "1小时前", 8, "李四"],
        ]],
        ["164512", "54631", "13652", "/static/index/test_head.png", "小明", "博主是谁啊", "1小时前", 50, [
            ["164512", "54632", "26854", "/static/index/test_head.png", "小红", "迷你世界大王好像？", "1小时前", 32, ""],
        ]],
        ["164512", "54633", "13657", "/static/index/test_head.png", "小刚", "我玩原神！", "1小时前", 78, []],
        ["164512", "54634", "65245", "/static/index/test_head.png", "小刚", "就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗就这还狗叫吗", "1小时前", 78, []],
    ]);
    const detail_segmented_list = (['热度', '时间']);
    const detail_segmented_current = ref('热度');
    const detail_comment_show = ref(false);
    const detail_comment_inp = ref("");
    const detail_comment_reply_desc = ref([]);
    const detail_comment_reply_var = ref([]);
    const detail_collect = ref(false);
    const detail_report_show = ref(false);
    const detail_star = ref(false);
    // -----------------详情-----------------

    // -----------------发现-----------------
    const find_search_inp = ref("");
    const find_search_data = ref([]);
    const find_search_status = ref(false);
    const find_search_index_data = ref([]);
    const find_hot_data = ref([
        ["1", "热门帖子信息a热门帖子信息a热门帖子信息a热门帖子信息a热门帖子信息a热门帖子信息a热门帖子信息a", 4521],
        ["2", "热门帖子信息b", 3521],
        ["3", "热门帖子信息c", 2642],
        ["4", "热门帖子信息d", 1324],
        ["5", "热门帖子信息e", 962],
        ["6", "热门帖子信息f", 867],
        ["7", "热门帖子信息g", 462],
        ["8", "热门帖子信息h", 324],
        ["9", "热门帖子信息i", 241],
        ["10", "热门帖子信息j", 162],
    ]);

    // -----------------发现-----------------

    // -----------------发帖-----------------
    const card_tabs = ref(['二手闲置', '打听求助', '分享生活', '吐槽爆料', '恋爱交友', '拼车拼单']);
    const card_comment_inp = ref("");
    const card_tabs_show = ref(false);
    const card_tabs_select = ref("二手闲置");


    // -----------------发帖-----------------

    return {
        uuid,
        // -----------------首页-----------------
        index_link_options,
        index_notice_text,
        index_tabs,
        index_tab,
        index_tab_data,
        // -----------------首页-----------------

        // -----------------详情-----------------
        detail_card_data,
        detail_comment_data_hot,
        detail_comment_data_time,
        detail_comment_data,
        detail_segmented_list,
        detail_segmented_current,
        detail_comment_show,
        detail_comment_inp,
        detail_comment_reply_desc,
        detail_comment_reply_var,
        detail_collect,
        detail_report_show,
        detail_star,
        // -----------------详情-----------------

        // -----------------发现-----------------
        find_search_inp,
        find_search_data,
        find_search_status,
        find_search_index_data,
        find_hot_data,
        // -----------------发现-----------------

        // -----------------发帖-----------------
        card_tabs,
        card_comment_inp,
        card_tabs_show,
        card_tabs_select,
        // -----------------发帖-----------------
    }
        ;
});
