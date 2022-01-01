<template>
  <div class="history">
    <history-list/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HistoryList from "@/modules/history/components/HistoryList.vue";

export default Vue.extend({
  components: {HistoryList},
  mounted() {
    this.filter = this.$route.query.filter as string;
  },

  data() {
    return {
      filter: '',
    }
  },
})
</script>