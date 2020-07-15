<template>
  <div>
    <b-modal id="editUser" ref="editUser" :busy="true" :cancel-disabled="true" :ok-disabled="true" @hidden="formReset">
      <validation-observer ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(submitHandler)">
          <validation-provider rules="required|min:3|max:20" name="Name" v-slot="{ valid, errors }">
            <b-form-group id="userInput-1" label="Name" label-for="userName">
              <b-form-input
                id="userName"
                name="UserName"
                :placeholder="editableUser.first_name ? `${editableUser.first_name} ${editableUser.last_name}` : 'Enter name'"
                v-model="form.name"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="userNameFeedback"
                data-vv-as="Name"
              ></b-form-input>

              <b-form-invalid-feedback id="userNameFeedback">{{ errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider rules="required|min:8|max:20" name="Name" v-slot="{ valid, errors }">
            <b-form-group id="userInput-2" label="Job" label-for="userJob">
              <b-form-input
                id="userJob"
                name="UserJob"
                :placeholder="editableUser.job ? editableUser.job : 'Enter job'"
                v-model="form.job"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="userJobFeedback"
                data-vv-as="Job"
              ></b-form-input>

              <b-form-invalid-feedback id="userJobFeedback">{{ errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider rules="required" name="Password" vid="password" v-slot="{ valid, errors }">
            <b-form-group label="Password">
              <b-form-input
                type="password"
                v-model="form.pass"
                :state="errors[0] ? false : (valid ? true : null)"
                placeholder="Enter password"
              ></b-form-input>
              <b-form-invalid-feedback id="userPassFeedback">{{ errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <ValidationProvider rules="required|confirmed:password" name="Password confirmation" v-slot="{ valid, errors }">
            <b-form-group label="Confirm Password:">
              <b-form-input
                type="password"
                v-model="form.passConfirm"
                :state="errors[0] ? false : (valid ? true : null)"
                placeholder="Confirm Password"
              ></b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-button class="mr-3" type="submit" variant="primary">Save</b-button>
          <b-button type="button" @click="close()" variant="danger">Close</b-button>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, confirmed, length, min, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('min', {
  ...min,
  message: 'This field must be a more than 3 characters'
})

extend('max', {
  ...max,
  message: 'This field must be less than 20 characters'
})

extend('confirmed', {
  ...confirmed,
  message: 'This field confirmation does not match'
})

extend('length', {
  ...length,
  message: 'This field must have 2 options'
})

export default {
  name: 'ProfileEditForm',
  components: { ValidationObserver, ValidationProvider },
  data () {
    return {
      form: {
        name: '',
        job: '',
        pass: '',
        passConfirm: ''
      }
    }
  },
  computed: {
    ...mapState(['editableUser'])
  },
  methods: {
    ...mapActions({
      updateUserProfile: 'SAVE_USER_PROFILE',
      createUser: 'CREATE_USER'
    }),
    submitHandler () {
      if (Object.keys(this.editableUser).length > 0) {
        this.updateUserProfile({ stateName: this.$route.name, formData: this.form })
        this.$bvToast.show('userDataChange')
      } else {
        const name = this.form.name.split(' ')
        this.createUser({
          id: new Date(),
          first_name: name[0],
          last_name: name[1] ? name[1] : '',
          email: `${this.form.name.replace(' ', '')}@reqres.in`,
          job: this.form.job,
          avatar: 'https://i.ytimg.com/vi/Y5GLCBjHR8U/maxresdefault.jpg'
        })
      }
    },
    close () {
      this.formReset()
      this.$refs.editUser.hide()
    },
    formReset () {
      this.form.name = ''
      this.form.job = ''
      this.form.pass = ''
      this.form.passConfirm = ''
    }
  }
}
</script>

<style lang="sass">
  #editUser .modal-footer
    display: none !important
</style>
