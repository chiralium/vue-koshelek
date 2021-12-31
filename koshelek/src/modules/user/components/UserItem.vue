<template>
  <user-item-container>
    <template v-slot:image>
      <img :src="source.picture.thumbnail" :alt="source.name"/>
    </template>
    <template v-slot:name>
      {{source.name}}
    </template>
    <template v-slot:action>
      <button class="user__action" @click="moveToFavorite(source.id)">+</button>
    </template>
    <template v-slot:expanded>
      <expanded>
        <template v-slot:icon>
          <div class="user__expand-ico">[details]</div>
        </template>
        <template v-slot:content>
          <div class="user__details">
            <p>Email: {{source.email}}</p>
            <p>Sex: {{source.gender}}</p>
            <p>Location: {{source.location}}</p>
            <p>Age: {{source.dob.age}}</p>
            <p>Date: {{source.dob.date}}</p>
            <p>Timezone: {{source.location.timezone.description}}</p>
          </div>
        </template>
      </expanded>
    </template>
  </user-item-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {User} from "../models";
import {mapActions, mapGetters} from "vuex";

import Expanded from "@/components/Expanded.vue";
import UserItemContainer from "@/components/UserItemContainer.vue";

export default Vue.extend({
  props: {
    isFavoriteItem: {
      type: Boolean,
      default(): boolean {
        return true;
      },
    },

    source: {
      type: User,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters('userStore', ['searchQuery']),

    somethingFound: function(): boolean {
      const {occurrencesKeysList} = this.source
      return this.searchQuery !== '' && occurrencesKeysList.length > 0
    }
  },

  methods: {
    ...mapActions('userStore', ['moveToFavorite']),
  },

  components: {
    UserItemContainer,
    Expanded,
  },
})
</script>