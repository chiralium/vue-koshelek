<template>
  <div class="user">
    <div class="user__image">
      <img :src="user.picture.thumbnail"  :alt="user.name"/>
    </div>
    <div class="user__name">
      {{user.name}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {User} from "../models";
import {mapGetters} from "vuex";

export default Vue.extend({
  props: {
    user: {
      type: User,
      required: true,
    },
  },

  computed: {
    ...mapGetters('userStore', ['userList']),
  },
})
</script>

<style lang="less">
.user {
  border-radius: 12px;
  border: 2px solid cornflowerblue;
  padding: 4px;
  display: grid;
  grid-template-columns: 32px 200px;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity ease-out;

  &:hover {
    opacity: .7;
  }

  &__image {
    img {
      border-radius: 100%;
      border: 1px solid tomato;
      max-height: 100%;
      width: 100%;
    }
  }
}
</style>