<template>
  <b-card
    :title="`${userData.first_name} ${userData.last_name}`"
    :img-src="userData.avatar"
    :img-alt="`${userData.first_name}_${userData.last_name}`"
    img-height="200px"
    img-top
    :data-user-id="userData.id"
    :key="userData.id"
  >
    <b-card-text>{{ userData.email }}</b-card-text>
    <b-link v-if="withLink" :to="getUserLink()" class="btn btn-success mr-2">Show</b-link>
    <b-button variant="info" class="mr-2" @click="showModal">Edit</b-button>
    <b-button variant="warning" @click="deleteUser">Delete</b-button>
  </b-card>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'UserCard',
  props: {
    userData: {
      type: Object,
      default: () => ({})
    },
    withLink: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapMutations({
      setEditableUser: 'SET_EDITABLE_USER'
    }),
    ...mapActions({
      removeUser: 'DELETE_USER'
    }),
    getUserLink () {
      return { name: 'User-single', params: { user: `${this.userData.first_name}_${this.userData.last_name}`, id: this.userData.id } }
    },
    showModal () {
      this.setEditableUser(this.userData)
      this.$bvModal.show('editUser')
    },
    deleteUser () {
      /* eslint-disable no-debugger */
      // debugger
      this.$bvToast.show('userDelete')
      this.removeUser({ stateName: this.$route.name, userId: this.userData.id })
      if (this.$route.name.toLowerCase() === 'user-single') setTimeout(() => this.$router.replace('/users'), 2000)
    }
  }
}
</script>

<style scoped>

</style>
