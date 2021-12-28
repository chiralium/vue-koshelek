<template>
  <div class="home">
    <container>
      <template v-slot:content>
        <user-list></user-list>
      </template>
    </container>

    <container>
      <template v-slot:content>
        Test
      </template>
    </container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import UserList from '@/modules/user/components/UserList.vue';
import Container from '@/components/Container.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    UserList,
    Container,
  }
});
</script>

<style lang="less">

.home {
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media screen and (max-width: 1085px) {
    display: block;
  }
}

</style>
