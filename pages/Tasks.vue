<template>
  <main-content title="Tasks">
    <template v-slot:body>
      <b-row v-for="row in getRows()" :key="row">
        <list-item v-for="item in getItemsForRow(row)" :key="item.id">
          <b-card
            :class="[item.completed ? 'completed' : 'in-progress']"
            :title="item.title"
            align="left"
          >
            <b-card-text>{{ item.completed ? 'Completed' : 'In Progress' }}</b-card-text>
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
      tasks: state => state.tasks.tasks
    })
  },
  created () {
  },
  methods: {
    getItemsForRow (row) {
      const tasksState = this.$store.state.tasks
      const items = []
      const startingIndex = (tasksState.itemsPerRow * (row - 1))
      for (let i = startingIndex, y = 0; i < startingIndex + tasksState.itemsPerRow; i++, y++) {
        if (tasksState.tasks[i]) {
          items[y] = tasksState.tasks[i]
        }
      }
      return items
    },
    ...mapGetters({
      getRows: 'tasks/getRows'
    })
  }
}
</script>

<style scoped>
.in-progress {
  border: 2px solid #DF3449;
}

.in-progress >>> .card-text {
  color: #DF3449;
}

.completed {
  border: 2px solid green;
}

.completed  >>> .card-text {
  color: green;
}

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
