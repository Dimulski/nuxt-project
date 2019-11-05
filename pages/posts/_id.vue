<template>
  <b-container>
    <b-col class="main-content" xl="12">
      <article>
        <h1 id="title">
          {{ post.title | capitalize }}
        </h1>
        <p id="body">
          {{ post.body | capitalize }}
        </p>
      </article>
    </b-col>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: mapState({
    posts: state => state.blog.posts,
    post: state => state.blog.post
  }),
  mounted () {
    const postId = this.$route.params.id
    // eslint-disable-next-line
    this.loadPost(this.posts.filter(post => post.id == postId)[0])
  },
  methods: {
    ...mapActions({
      fetchPostById: 'blog/fetchPostById',
      loadPost: 'blog/loadPost'
    })
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  flex-wrap: wrap;
}

.card {
  list-style: none;
  flex: 0 0 30%;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

h1 {
  width: 100%;
  text-align: center;
  margin-bottom: 25px;
}
</style>
