<template>
  <span ref="span" v-html="highlightingText()"></span>
</template>

<script>
export default {
    name: 'HighlightColorText',
    props: {
        result: String,
        keyword: String
    },
    methods: {
        highlightingText() {
            return this.result.replace(this.keyword,`<span style="color: #4bd897">${this.keyword}</span>`);
        }
    }
}
</script>