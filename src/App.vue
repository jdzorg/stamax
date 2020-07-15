<template>
  <div id="app">
    <router-view name="nav" />
    <div class="content">
      <router-view/>
      <b-toast id="userDelete" title="info"  auto-hide-delay="2000">
        user deleted
      </b-toast>
      <b-toast id="userDataChange" title="info"  auto-hide-delay="2000">
        user data changed
      </b-toast>
      <b-toast id="newUserChange" title="info"  auto-hide-delay="2000">
        new user added
      </b-toast>
    </div>
    <profile-edit-form/>

  </div>
</template>

<script>
import ProfileEditForm from './components/ProfileEditForm'

export default {
  components: { ProfileEditForm }
}
</script>

<style lang="sass">
.content
  width: calc(100vw - 300px)
  margin-left: 300px
  padding: 36px 15px 15px
</style>
