<template>
  <page class="home">
    <template v-slot:navbar>
      <navbar
          :nav-list="[
            {
              url: '/',
              title: 'Home',
            },
            {
              url: '/history',
              title: 'History',
            },
            {
              url: '/history?filter=adding',
              title: 'Adding history',
            },
            {
              url: '/history?filter=removing',
              title: 'Removing history',
            }
        ]"
      />
    </template>
    <template v-slot:content>
      <div class="home__grid">
        <container>
          <template v-slot:content>
            <user-list/>
          </template>
        </container>

        <container>
          <template v-slot:content>
            <user-list-favorite/>
          </template>
        </container>
      </div>
    </template>
  </page>
</template>

<script lang="ts">
import Vue from 'vue';

import UserList from '@/modules/user/components/UserList.vue';
import Container from '@/components/Container.vue';
import UserListFavorite from "@/modules/favorites/components/UserListFavorite.vue";
import Navbar from "@/components/Navbar.vue";
import Page from "@/components/Page.vue";

export default Vue.extend({
  name: 'Home',
  components: {
    Page,
    Navbar,
    UserListFavorite,
    UserList,
    Container,
  },

  mounted() {
    console.log("MOUNTED");
  }
});
</script>

<style lang="less">

.home {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media screen and (max-width: 1085px) {
      display: block;
    }
  }
}

</style>
