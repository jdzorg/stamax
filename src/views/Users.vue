<template>
  <div class="users">
    <b-card-group columns>
      <user-card
        v-for="user in users"
        :key="user.id"
        :user-data="user"
      ></user-card>
    </b-card-group>
    <b-pagination-nav v-if="totalPages > 0" :link-gen="linkGen" pills align="center" :number-of-pages="totalPages" use-router></b-pagination-nav>

    <b-button class="users__add" pill variant="danger" v-b-modal.editUser><BIconPersonPlus></BIconPersonPlus></b-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { BIconPersonPlus } from 'bootstrap-vue'
import UserCard from '../components/UserCard'

export default {
  name: 'Users',
  components: { UserCard, BIconPersonPlus },
  computed: {
    ...mapState(['users', 'totalPages'])
  },
  data () {
    return {
      curPage: 1
    }
  },
  watch: {
    '$route' (val) {
      if (Object.prototype.hasOwnProperty.call(val.params, 'page')) {
        this.curPage = parseInt(val.params.page)
        this.getUsers(this.curPage)
      } else {
        this.getUsers()
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    ...mapActions({
      getUsers: 'GET_DATA'
    }),
    linkGen (pageNum) {
      return pageNum === 1 ? '/users' : `/users/${pageNum}`
    }
  }
}
</script>

<style scoped lang="sass">
  .users
    .card img
      object-fit: cover
    &__add
      position: fixed
      right: 30px
      bottom: 30px
</style>
