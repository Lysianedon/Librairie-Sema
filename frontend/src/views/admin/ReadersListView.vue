<template>
    <div class="wrapper">
      <div class="content">
         <div class="nav">
          <NavbarAdmin
          @get-name="getName"/>
        </div>
        <div class="nav-mobile">
          <NavbarMobileAdmin
           @get-name="getName"/>
        </div>
        <h3 class="has-text-right hello-msg">Bonjour, {{adminName}} !</h3>
        <h1 class="has-text-centered back-office">BACK OFFICE</h1>
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
import NavbarMobileAdmin from '@/components/admin/NavbarMobileAdmin.vue'
export default {
  name: 'ReadersListView',
  data () {
    return {
      adminName: '',
      usersList: []
    }
  },
  components: { NavbarAdmin, ReadersListComponent, NavbarMobileAdmin },
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
}

.nav{
  position: fixed;
  top: 6%;
  left: 1%;
}
.nav-mobile{
  display: none;
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

/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1070px){
  .nav{
    display: none;
  }
  .nav-mobile{
    display: initial;
    position: fixed;
    top: 8%;
    left: 3%;
  }
  .content{
    margin: 0;
    width: 100vw;
    padding: 2% 0 4% 0;
  }
  .readers-list{
    margin-top: 6%;
  }
  .gerer-lecteurs{
    width: 100%;
    text-align: center;
  }
}
/* -------MOBILE VERSION --------- */
@media(max-width: 430px){
  .nav-mobile{
    top: 5%;
  }
  .hello-msg{
    font-size: 1.3rem;
  }
  .back-office{
    font-size: 1.8rem;
    margin: 12% auto;
  }
  .gerer-lecteurs{
    font-size: 1.5rem;
    margin: 3% 3% 10% 3% !important;
    width: 100%;
  }
}
</style>
