<template>
  <user-item-container>
    <template v-slot:image>
      <img :src="source.picture.thumbnail"  :alt="source.name"/>
    </template>
    <template v-slot:name>
      {{source.name}}
    </template>
    <template v-slot:action>
      <button class="user__action" @click="removeFromFavorite(source.id)">-</button>
    </template>
  </user-item-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {User} from "@/modules/user/models";
import {mapActions} from "vuex";
import UserItemContainer from "@/components/UserItemContainer.vue";

export default Vue.extend({
  components: {UserItemContainer},
  props: {
    source: {
      type: User,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    ...mapActions('favoritesStore', ['removeFromFavorite']),
  },
})
</script>