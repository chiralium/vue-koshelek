<template>
  <container>
    <template v-slot:content>
      {{historyList}}
    </template>
  </container>
</template>
<script>
import Container from "@/components/Container";
import Vue from 'vue';
import {mapGetters} from "vuex";

export default Vue.extend({
  computed: {
    ...mapGetters('historyStore', ['historyList'])
  },

  components: {
    Container,
  }
})
</script>