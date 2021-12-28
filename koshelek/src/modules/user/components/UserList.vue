<template>
  <div>Hello world</div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserApi from '@/modules/user/api';

export default Vue.extend({
  async mounted() {
    const userApi = new UserApi();
    const userList = await userApi.getUserList();
    console.log(userList);
  }
})

</script>