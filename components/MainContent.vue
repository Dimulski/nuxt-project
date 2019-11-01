<template>
  <b-container class="main-content" xl="12">
    <content-header :title="title">
      <slot name="header" />
    </content-header>
    <content-body>
      <slot name="body" />
    </content-body>
  </b-container>
</template>

<script>
import ContentHeader from '@/components/ContentHeader.vue'
import ContentBody from '@/components/ContentBody.vue'

export default {
  name: 'MainContent',
  components: {
    ContentHeader,
    ContentBody
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
</style>
