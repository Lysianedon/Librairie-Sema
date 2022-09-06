<template>
    <div class="wrapper">
      <div class="content">
         <div class="nav">
          <NavbarAdmin
          @get-name="getName"/>
        </div>
        <h3 class="has-text-centered-mobile has-text-right-tablet hello-msg">Bonjour, {{adminName}} !</h3>
        <h1 class="has-text-centered">BACK OFFICE</h1>
        <h2 class="gerer-lecteurs ml-5 p-5">Gérer les lecteurs</h2>

        <div class="readers-list">
          <ReadersListComponent
          :usersList="usersList"
          @updateListUsers="updateListUsersFromParentElem"/>
        </div>

      </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavbarAdmin from '@/components/admin/NavbarAdmin.vue'
import ReadersListComponent from '@/components/admin/ReadersListComponent.vue'
export default {
  name: 'ReadersListView',
  data () {
    return {
      adminName: '',
      usersList: []
    }
  },
  components: { NavbarAdmin, ReadersListComponent },
  mounted () {
    axios
      .get('http://localhost:8001/admin/user-list', { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.usersList)
          this.usersList = res.data.usersList
          // Removing the admins from the list:
          this.usersList = this.usersList.filter(user => !user.isAdmin)
        }
      })
  },
  methods: {
    getName (payload) {
      this.adminName = payload.adminName
    },
    filterUsersList (payload) {
      this.usersList = payload.searchResults
    },
    updateListUsersFromParentElem (payload) {
      if (payload.deletedUser || payload.updatedUser) {
        axios
          .get('http://localhost:8001/admin/user-list', { withCredentials: true })
          .then(res => {
            if (res.data.success) {
              // console.log(res.data.usersList)
              this.usersList = res.data.usersList
              // Removing the admins from the list:
              this.usersList = this.usersList.filter(user => !user.isAdmin)
            }
          })
      }
    }
  }
}
</script>

<style scoped>
.content{
  margin: 1% auto 0 22vw;
  width: 74vw;
  padding: 2% 0 4% 0;
  /* border: 1px solid black; */
}

.nav{
  position: fixed;
  top: 6%;
  left: 1%;
}
.readers-list{
  margin-top: 5%;
}
.hello-msg{
  font-weight: 100;
}
.gerer-lecteurs{
  background-color: #ECEEE5;
}
</style>
