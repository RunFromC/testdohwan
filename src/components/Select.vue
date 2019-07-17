<template>
  <div class="input-selectbox-wrap" id="m-jobSelect">
    <div class="select2" id="jobselect-btn" @click="click()">
      <span>{{title}}</span>
      <i></i>
    </div>

    <div class="listWrap2 long">
      <ul class="list">
        <li v-for="item in list" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    props: ['title', 'list'],
    methods: {
        click() {
            this.$emit('click');
        }
    }
};
</script>

<style>
</style>
