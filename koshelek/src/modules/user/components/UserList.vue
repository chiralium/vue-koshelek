<template>
  <div>
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <ul>
        <li v-for="user in userList" v-bind:key="user.email">
          {{user.name.last}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';
import UserApi from '@/modules/user/api';

export default Vue.extend({
  methods: {
    ...mapActions(
        'userStore',
        ['setIsLoading', 'fetchUserList'],
    ),
  },

  computed: {
    ...mapGetters(
        'userStore',
        ['isLoading', 'userList'],
    ),
  },

  mounted() {
    this.fetchUserList();
  }
})

</script>