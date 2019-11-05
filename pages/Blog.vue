<template>
  <main-content title="Blog">
    <template v-slot:header />
    <template v-slot:body>
      <b-row v-for="row in getRows" :key="row">
        <list-item v-for="item in getItemsForRow(row)" :key="item.id" @:my-custom-emit="logEmitter(item.title)">
          <b-card :title="item.title | capitalize" align="left">
            <b-card-text>{{ item.body | capitalize | limit50Characters }}...</b-card-text>
            <b-button :to="`posts/${item.id}`" variant="primary">
              Read More
            </b-button>
          </b-card>
        </list-item>
      </b-row>
    </template>
  </main-content>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MainContent from '@/components/MainContent.vue'
import ListItem from '@/components/ListItem.vue'

export default {
  components: {
    MainContent,
    ListItem
  },
  computed: {
    ...mapState({
      posts: state => state.blog.posts,
      itemsPerRow: state => state.blog.itemsPerRow
    }),
    ...mapGetters({
      getRows: 'blog/getRows',
      getCombinedTitleLength: 'blog/getCombinedTitleLength',
      getItemsForRowFromStore: 'blog/getItemsForRow'
    })
  },
  watch: {
    posts () {
      // eslint-disable-next-line
      console.log(`Combined title length is ${this.getCombinedTitleLength}`)
    }
  },
  methods: {
    getItemsForRow (row) {
      return this.getItemsForRowFromStore(row)
    },
    logEmitter (title) {
      // eslint-disable-next-line
      console.log(`${title} emitted an event`)
    }
  }
}
</script>

<style scoped>
.card {
  height: 110% !important;
}

div [class*='col-'] {
  padding-bottom: 40px !important;
}

.btn {
  margin-top: 10px !important;
  position: absolute !important;
  bottom: 15px !important;
  right: 15px !important;
}

h1 {
  width: 110% !important;
  text-align: center;
}
</style>
