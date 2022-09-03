<template>
    <div class="wrapper">
      <div class="content">
         <div class="nav">
          <NavbarAdmin
          @get-name="getName"/>
        </div>
        <h3 class="has-text-centered-mobile has-text-right-tablet">Bonjour, {{adminName}} !</h3>
        <h1 class="has-text-centered">Back Office Admin</h1>
        <h2 class="has-text-centered">Gérer les lecteurs</h2>

        <div class="readers-list">
          <ReadersListComponent
          :usersList="usersList"/>
        </div>

      </div>
    </div>
</template>

<script>
import NavbarAdmin from '@/components/admin/NavbarAdmin.vue'
import ReadersListComponent from '@/components/admin/ReadersListComponent.vue'
export default {
  name: 'ReadersListView',
  data () {
    return {
      adminName: '',
      usersList: ['Katie', 'Perry']
    }
  },
  components: { NavbarAdmin, ReadersListComponent },
  mounted () {

  },
  methods: {
    getName (payload) {
      this.adminName = payload.adminName
    }
  }
}
</script>

<style scoped>
.content{
  margin: 3% auto 0 22vw;
  width: 74vw;
  /* border: 1px solid black; */
}

.nav{
  position: fixed;
  top: 6%;
  left: 1%;
}

.readers-list{
  margin-top: 5%;
  /* border: 1px solid brown; */
}
</style>
