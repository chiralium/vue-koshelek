<template>
  <div class="user">
    <div class="user__grid">
      <div class="user__image">
        <img :src="source.picture.thumbnail"  :alt="source.name"/>
      </div>
      <div class="user__name">
        {{source.name}}
      </div>
      <button class="user__add" @click="removeAtIndex(index)">★</button>
    </div>

    <div class="user__occurrences" v-if="searchQuery !== ''  && source.occurrencesKeysList.length > 0">
      <b>Found {{source.occurrencesKeysList.length}} in {{source.occurrencesKeysList}}</b>
    </div>

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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {User} from "../models";
import {mapActions, mapGetters} from "vuex";

import Expanded from "@/components/Expanded.vue";

export default Vue.extend({
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

  computed: {
    ...mapGetters('userStore', ['searchQuery']),
  },

  methods: {
    ...mapActions('userStore', ['removeAtIndex']),
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
  margin-bottom: 12px;

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
    grid-template-columns: 32px 200px 40px;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: opacity ease-out .3s;

    &:hover {
      opacity: .7;
    }
  }

  &__add {
    border: none;
    color: tomato;
    font-size: 16px;
    font-weight: bold;
    background: none;
    cursor: pointer;
    transition: color ease-out .3s;

    &:hover {
      color: darkred;
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

  &__occurrences {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}
</style>