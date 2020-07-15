<template>
  <div class="user">
    <b-row>
      <b-col cols="4">
        <user-card v-if="Object.keys(user).length > 0" :user-data="user" :with-link="false"></user-card>
        <span v-else>Now you will be redirected to the Users page</span>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import UserCard from '../components/UserCard'

export default {
  name: 'UserSingle',
  components: { UserCard },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    this.getUser(this.$route.params.id)
  },
  beforeDestroy () {
    this.setLastUser(this.user)
  },
  methods: {
    ...mapActions({
      getUser: 'GET_USER'
    }),
    ...mapMutations({
      setLastUser: 'SET_LAST_USER'
    })
  }
}
</script>

<style scoped>

</style>
