import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import api from '../api/api.js'
const baseURL = 'https://reqres.in/api/'
const $axios = axios.create({ baseURL })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    user: {},
    editableUser: {},
    lastUser: {},
    totalPages: 0
  },
  mutations: {
    SET_USERS (state, payload) {
      state.users = payload
    },
    ADD_USER (state, payload) {
      state.users.push(payload)
    },
    SET_LAST_USER (state, payload) {
      state.lastUser = payload
    },
    SET_TOTAL_PAGES (state, payload) {
      state.totalPages = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_EDITABLE_USER (state, payload) {
      state.editableUser = payload
    }
  },
  actions: {
    async GET_DATA ({ dispatch }, page = 1) {
      try {
        const data = $axios.get('/users', {
          params: {
            page
          }
        })
        dispatch('SPLIT_DATA', await data)
      } catch (e) {
        console.error(e)
      }
    },
    SPLIT_DATA ({ commit }, payload) {
      /* eslint-disable camelcase */
      const { data } = payload
      commit('SET_USERS', data.data)
      commit('SET_TOTAL_PAGES', data.total_pages)
    },
    async GET_USER ({ commit }, id) {
      try {
        /* eslint-disable no-debugger */
        // debugger
        const user = $axios.get(`/users/${id}`)
        user.then(resp => {
          commit('SET_USER', resp.data.data)
        })
      } catch (e) {
        console.error(e)
      }
    },

    SAVE_USER_PROFILE ({ state, commit }, payload) {
      const { stateName, formData } = payload
      const key = stateName.toLowerCase().split('-')[0]
      const users = state[key]
      const editedUserId = state.editableUser.id
      const { name, job, pass } = formData
      const splitName = name.split(' ')
      $axios.put(`/users/${editedUserId}`, {
        params: {
          first_name: splitName[0],
          last_name: splitName[1] ? splitName[1] : users.last_name,
          job: job,
          pass: pass
        }
      })
      if (key === 'user') {
        users.first_name = splitName[0]
        users.last_name = splitName[1] ? splitName[1] : users.last_name
        users.job = job
        users.pass = pass
      } else {
        users.forEach((el, i) => {
          if (el.id === editedUserId) {
            users[i].first_name = splitName[0]
            users[i].last_name = splitName[1] ? splitName[1] : users[i].last_name
            users[i].job = job
            users[i].pass = pass
          }
        })
      }
      commit(`SET_${key.toUpperCase()}`, users)
    },
    DELETE_USER ({ state, commit }, payload) {
      const { stateName, userId } = payload
      const key = stateName.toLowerCase().split('-')[0]
      $axios.delete(`/users/${userId}`)
      if (key === 'user') {
        commit('SET_USER', {})
      } else {
        const users = state.users.filter(el => el.id !== userId)
        commit('SET_USERS', users)
      }
    },
    async CREATE_USER ({ commit }, payload) {
      try {
        await $axios.post('/users', {
          params: {
            ...payload
          }
        })
        commit('ADD_USER', await payload)
      } catch (e) {

      }
    }
  },
  modules: {
  }
})
