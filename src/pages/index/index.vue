<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()

</script>
<template>
  <view>
	  <text>{{counter.name_test}}</text>
  </view>
  我靠
</template>


<style>

</style>
