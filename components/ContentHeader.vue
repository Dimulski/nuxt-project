<template>
  <h1>{{ title }}<slot /></h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
h1 {
  margin-bottom: 40px !important;
}
</style>
