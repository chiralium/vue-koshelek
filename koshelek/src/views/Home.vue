<template>
  <div class="home">
    <user-list/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import UserList from '@/modules/user/components/UserList.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    UserList,
  }
});
</script>
