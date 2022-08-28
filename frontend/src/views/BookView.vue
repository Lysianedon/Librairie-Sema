<template>
    <div>
      <h1>{{title}}</h1>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BookView',
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    axios
      .get(`http://localhost:8001/books/${this.$route.params.bookId}`)
      .then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.title = res.data.selectedBook.title
        }
      })
      .catch(err => {
        return console.error(err)
      })
  }
}
</script>

<style scoped>

</style>
