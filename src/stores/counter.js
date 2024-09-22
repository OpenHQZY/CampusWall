// stores/counter.js
import { defineStore } from 'pinia';
import {ref} from 'vue'

export const useCounterStore = defineStore('counter', () => {
	// -----------------首页-----------------
	 const index_link_options = ref([
		 ["1", "湖汽课表", "https://c.d5v.cc/", "@/static/index/head.png"],
		 ["2", "新生手册", "https://c.d5v.cc/", "@/static/index/head.png"],
		 ["3", "最新校历", "https://c.d5v.cc/", "@/static/index/head.png"],
		 ["4", "全景校园", "https://c.d5v.cc/", "@/static/index/head.png"],
		 ["5", "实时公交", "https://c.d5v.cc/", "@/static/index/head.png"],
	 ]);
	return { 
	// -----------------首页-----------------
		index_link_options,
	 };
});
