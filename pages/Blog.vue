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
      getCombinedTitleLength: 'blog/getCombinedTitleLength'
    })
  },
  watch: {
    posts () {
      console.log(`Combined title length is ${this.getCombinedTitleLength}`)
    }
  },
  methods: {
    getItemsForRow (row) {
      const blogState = this.$store.state.blog
      const items = []
      const startingIndex = (blogState.itemsPerRow * (row - 1))
      for (let i = startingIndex, y = 0; i < startingIndex + blogState.itemsPerRow; i++, y++) {
        if (blogState.posts[i]) {
          items[y] = blogState.posts[i]
        }
      }
      return items
    },
    logEmitter (title) {
      console.log(`${title} emitted an event`)
    },
    getItemsPerRowFromStore (row) {
      return this.getItemsForRow(row)
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
