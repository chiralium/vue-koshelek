<template>
  <div class="user">
    <div class="user__grid">
      <div class="user__image">
        <img :src="user.picture.thumbnail"  :alt="user.name"/>
      </div>
      <div class="user__name">
        {{user.name}}
      </div>
    </div>
    <expanded>
      <template v-slot:icon>
        <div class="user__expand-ico">[details]</div>
      </template>
      <template v-slot:content>
        <div class="user__details">
          <p>Email: {{user.email}}</p>
          <p>Sex: {{user.gender}}</p>
          <p>Location: {{user.location}}</p>
          <p>Age: {{user.dob.age}}</p>
        </div>
      </template>
    </expanded>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {User} from "../models";
import {mapGetters} from "vuex";

import Expanded from "@/components/Expanded.vue";

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

  components: {
    Expanded,
  },
})
</script>

<style lang="less">
.user {
  border-radius: 12px;
  border: 2px solid cornflowerblue;
  padding: 4px;
  position: relative;
  transition: height ease-out .3s;

  &__expand-ico {
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    color: cornflowerblue;
    transition: opacity ease-out .3s;

    &:hover {
      opacity: .5;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 32px 200px;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: opacity ease-out .3s;

    &:hover {
      opacity: .7;
    }
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