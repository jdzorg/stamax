<template>
  <aside class="d-flex flex-column align-items-start navigation">
    <div class="navigation__title">Stamax</div>
    <div v-if="Object.keys(lastUser).length > 0" class="d-flex align-items-center w-100 p-2 navigation__top last-user">
      <div class="last-user__avatar">
        <b-avatar  size="lg" :src="lastUser.avatar"></b-avatar>
      </div>
      <div class="ml-2">
        <span class="last-user__name">{{ `${lastUser.first_name} ${lastUser.last_name}` }}</span>
        <span class="last-user__email">{{ lastUser.email }}</span>
      </div>
    </div>
    <div class="w-100 pl-2 pr-2 pt-2 navigation__bottom">
      <b-nav vertical pills fill class="w-100">
        <b-nav-item exact exact-active-class="active" to="/">
          <div class="d-flex align-items-center w-100 text-left">
            <b-icon-grid1x2-fill class="mr-2"></b-icon-grid1x2-fill>
            <span>Home</span>
          </div>
        </b-nav-item>
        <b-nav-item class="" exact exact-active-class="active" to="/users">
          <div class="d-flex align-items-center w-100 text-left">
            <b-icon-person-fill class="mr-2"></b-icon-person-fill>
            <span>Users</span>
          </div>
        </b-nav-item>
      </b-nav>

    </div>

  </aside>

</template>

<script>
import { mapState } from 'vuex'
import { BIconGrid1x2Fill, BIconPersonFill } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

export default {
  name: 'Nav',
  components: { BIconGrid1x2Fill, BIconPersonFill },
  computed: {
    ...mapState(['lastUser'])
  }
}
</script>

<style scoped lang="sass">
  .navigation
    position: fixed
    z-index: 1
    top: 0
    left: 0
    width: 300px
    height: 100%
    border-right: 1px solid gray
    background: #fff
    &__title
      font:
        size: 24px
        weight: 600
    &__bottom
      border-top: 1px solid gray
  .last-user
    &__name
      display: inline-flex
      font:
        size: 26px
        weight: 600
    &__email
      font-size: 14px
</style>
