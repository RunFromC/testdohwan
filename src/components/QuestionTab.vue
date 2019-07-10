<template>
  <div class="contents type2">
    <a href="#" class="icon-back-btn" @click="close"></a>
    <slot></slot>
  </div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style>
</style>
