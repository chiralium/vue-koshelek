<template>
  <page class="history">
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
      <history-list :filter-factor="$route.query.filter"/>
    </template>
  </page>
</template>

<script lang="ts">
import Vue from 'vue';
import HistoryList from "@/modules/history/components/HistoryList.vue";
import Page from "@/components/Page.vue";
import Navbar from '@/components/Navbar.vue';

export default Vue.extend({
  components: {Page, HistoryList, Navbar},
})
</script>