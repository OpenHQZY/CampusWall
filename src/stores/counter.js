// stores/counter.js
import { defineStore } from 'pinia';
import {ref} from 'vue'

export const useCounterStore = defineStore('counter', () => {
	 const name_test = ref("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊");
	return { 
		name_test,
	 };
});
