<template>
  <container class="nav">
    <template v-slot:content>
      <nav>
        <ul class="nav__navbar">
          <li class="nav__navitem" v-for="navItem in navList" :key="navItem.url">
            <router-link :to="navItem.url">
              {{navItem.title}}
            </router-link>
          </li>
        </ul>
      </nav>
    </template>
  </container>
</template>
<script lang="ts">
import Container from "./Container.vue";
import Vue from 'vue';

export default Vue.extend({
  props: {
    navList: {
      type: Array,
      required: true,
    }
  },
  components: {
    Container,
  }
})
</script>

<style lang="less">
.nav {
  margin-bottom: 12px;

  &__navbar {
    display: grid;
    grid-template-columns: repeat(auto-fill, 170px);
    justify-items: flex-start;
    list-style: none;
  }

  &__navitem {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>