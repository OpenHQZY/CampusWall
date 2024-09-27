<template>
  <web-view :src="url" bindmessage="getMessage"></web-view>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  onLoad(options) {
    this.url = options.url;
  }
}
</script>

<style>

</style>