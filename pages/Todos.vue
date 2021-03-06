<template>
  <b-container class="main-content" xl="12">
    <content-header>To-Do's</content-header>
    <b-col sm="11" class="mb-4 mx-auto">
      <b-form-group
        :invalid-feedback="invalidTitle"
        :state="titleState"
      />
      <b-input-group>
        <b-form-input
          id="editBox"
          v-model="editField"
          :state="titleState"
          class="mr-3"
          @input="updateTitle()"
        />
        <b-button
          variant="outline-primary"
          @click="setTodo"
        >
          {{ editFieldEditMode ? 'Save' : 'Create' }}
        </b-button>
      </b-input-group>
    </b-col>
    <b-table
      id="todos-table"
      hover
      :items="todos"
      :fields="fields"
      :tbody-tr-class="rowClass"
      :per-page="perPage"
      :current-page="currentPage"
      :sort-by="sortBy"
      :sort-desc="true"
    >
      <template v-slot:cell(title)="row">
        <p :ref="`title-${row.item.id}`">
          {{ row.item.title }}
        </p>
      </template>
      <template v-slot:cell(edit)="row">
        <b-button variant="outline-warning" size="sm" @click="editTodo(row.item)">
          Edit
        </b-button>
      </template>
      <template v-slot:cell(delete)="row">
        <b-button v-b-modal.delete-modal variant="outline-danger" size="sm" @click="promptDelete(row.item)">
          Delete
        </b-button>
      </template>
      <template v-slot:cell(is_completed)="row">
        <b-form-checkbox :checked="row.item.completed" size="lg" switch @change="updateStatus(row.item)" />
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="todos-table"
    />
    <b-modal id="delete-modal" ref="delete-modal">
      <template v-slot:modal-header="{ close }">
        <h5>Confirm Deletion</h5>
      </template>
      <template v-slot:default="{ hide }">
        <p>Are you sure you want to delete todo "{{ todoBeingEdited.title }}"</p>
      </template>
      <template v-slot:modal-footer="{ hide }">
        <b-button variant="danger" @click="confirmDelete">
          Delete
        </b-button>
        <b-button variant="outline-secondary" @click="cancelDelete">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
// eslint-disable-next-line
import { isNullOrUndefined } from 'util'
import { mapState, mapActions } from 'vuex'
import ContentHeader from '@/components/ContentHeader.vue'

export default {
  components: {
    ContentHeader
  },
  computed: {
    ...mapState({
      todos: state => state.todos.todos,
      perPage: state => state.todos.perPage,
      rows: state => state.todos.rows,
      fields: state => state.todos.fields,
      sortBy: state => state.todos.sortBy
    }),
    currentPage: {
      get () { return this.$store.state.todos.currentPage },
      set (value) { this.setCurrentPage(value) }
    },
    editField: {
      get () { return this.$store.state.todos.editField },
      set (value) { this.setEditField(value) }
    },
    editFieldEditMode: {
      get () { return this.$store.state.todos.editFieldEditMode },
      set (value) { this.setEditFieldEditMode(value) }
    },
    todoBeingEdited: {
      get () { return this.$store.state.todos.todoBeingEdited },
      set (value) { this.setTodoBeingEdited(value) }
    },
    titleState () {
      if (this.editField == null) {
        return null
      }
      return this.editField.length >= 5 && this.editField.length <= 80
    },
    invalidTitle () {
      if (this.editField == null || (this.editField.length >= 5 && this.editField.length <= 80)) {
        return ''
      } else if (this.editField.length < 5 || this.editField.length > 80) {
        return 'Title must be between 5 and 80 characters.'
      } else {
        return 'Please enter a todo title.'
      }
    }
  },
  watch: {
    // eslint-disable-next-line
    todos: function (newValues) {
      // eslint-disable-next-line
      console.log(`Todo ids with leading 0's: ${newValues.map(todo => String(todo.id).padStart(2, 0))}`)
    }
  },
  mounted () {
    this.printDestructuringExample()
  },
  methods: {
    data () {
      return {
        initialFieldValue: ''
      }
    },
    updateStatus (row) {
      this.updateTodoStatus(row)
    },
    ...mapActions({
      setCurrentPage: 'todos/setCurrentPage',
      setCompleted: 'todos/setCompleted',
      setEditField: 'todos/setEditField',
      addTodo: 'todos/addTodo',
      setEditFieldEditMode: 'todos/setEditFieldEditMode',
      setTodoBeingEdited: 'todos/setTodoBeingEdited',
      saveTodoTitle: 'todos/saveTodoTitle',
      resetEdit: 'todos/resetEdit',
      deleteTodo: 'todos/deleteTodo',
      saveTodo: 'todos/saveTodo',
      updateTodoStatus: 'todos/updateStatus'
    }),
    saveStatus (todo) {
      const alteredTodo = todo
      alteredTodo.completed = !todo.completed
      this.saveTodo(alteredTodo)
    },
    setTodo () {
      if (this.editFieldEditMode) {
        this.saveTodoTitle(this.editField)
        this.saveTodo(this.todoBeingEdited)
        this.resetEdit()
        // eslint-disable-next-line
      } else if (this.editField != '' && !isNullOrUndefined(this.editField)) {
        this.addTodo(this.editField)
      } else {
        this.editField = ''
      }
    },
    editTodo (todo) {
      if (this.todoBeingEdited.id) {
        this.saveTodoTitle(this.initialFieldValue)
        this.setEditField(todo.title)
        this.setEditFieldEditMode(true)
        this.setTodoBeingEdited(todo)
        this.initialFieldValue = todo.title
      } else {
        this.initialFieldValue = todo.title
        this.setEditField(todo.title)
        this.setEditFieldEditMode(true)
        this.setTodoBeingEdited(todo)
      }
    },
    rowClass (item) {
      if (!item) { return }
      return item.completed ? 'completed' : 'in-progress'
    },
    promptDelete (todo) {
      if (this.todoBeingEdited.id) {
        this.setEditField(null)
        this.setEditFieldEditMode(false)
        this.setTodoBeingEdited(todo)
      } else {
        this.setTodoBeingEdited(todo)
      }
      this.$refs['delete-modal'].show()
    },
    saveButton (todo) {
      if (this.todoBeingEdited.id) {
        this.saveTodoTitle(this.initialFieldValue)
        this.setEditField(null)
        this.setEditFieldEditMode(false)
        this.setTodoBeingEdited(todo)
      } else {
        this.setEditField(null)
        this.setEditFieldEditMode(false)
        this.setTodoBeingEdited(todo)
      }
    },
    cancelDelete () {
      this.$refs['delete-modal'].hide()
      this.setTodoBeingEdited({})
    },
    confirmDelete () {
      this.deleteTodo(this.todoBeingEdited)
      this.setTodoBeingEdited({})
      this.$refs['delete-modal'].hide()
    },
    updateTitle () {
      if (this.todoBeingEdited.id) {
        this.saveTodoTitle(this.editField)
      }
    },
    printDestructuringExample () {
      // eslint-disable-next-line
      let a, b, c
      [a, c] = [5, 10]
      // eslint-disable-next-line
      console.log(a)
      // eslint-disable-next-line
      console.log(b)
      // eslint-disable-next-line
      console.log(c)
      ;({ a, b, ...c } = { a: 10, b: 20, c: 30, c2: 40 })
      // eslint-disable-next-line
      console.log(a)
      // eslint-disable-next-line
      console.log(b)
      // eslint-disable-next-line
      console.log(c)
    }
  }
}
</script>

<style scoped>
#editBox {
  border-radius: 0.25rem;
}

div >>> .completed {
  color: green;
}

div >>> .completed:hover {
  color: #28a745 !important;
}

div >>> .in-progress {
  color: red;
}
div >>> .in-progress:hover {
  color: #dc3545 !important;
}

.form-control {
  width: 87%;
  display: flex;
}

#switch {
  user-select: none;
}

.table >>> td {
  vertical-align: middle;
}

.table >>> td p {
  margin-top: 5px;
  margin-bottom: 5px;
}

.table >>> tbody {
  user-select: none;
}
</style>
