<template>
  <main-content title="Photos">
    <template v-slot:body>
      <b-row v-for="row in getRows" :key="row">
        <list-item v-for="item in getItemsForRow(row)" :key="item.id">
          <b-card-img-lazy :top="true" :offset="360" :src="item.url" alt="Image" bottom />
          <b-card-title>{{ item.title }}</b-card-title>
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
      photos: state => state.photos.photos
    }),
    ...mapGetters({
      getRows: 'photos/getRows',
      getItemsForRowFromStore: 'photos/getItemsForRow'
    })
  },
  methods: {
    getItemsForRow (row) {
      return this.getItemsForRowFromStore(row)
    }
  }
}
</script>

<style scoped>
.card {
  height: 100% !important;
}

div [class*='col-'] {
  padding-bottom: 40px !important;
}

h1 {
  width: 110% !important;
  text-align: center;
  margin-bottom: 25px;
}
</style>
