<template>
  <container>
    <template v-slot:content>
      <div class="history-item">
        <div class="history-item__date">
          <slot name="date"></slot>
        </div>
        <div class="history-item__type">
          <slot name="type"></slot>
        </div>
        <div class="history-item__item">
          <slot name="item"></slot>
        </div>
      </div>
    </template>
  </container>
</template>

<style lang="less">
.history-item {
  &__item {
    padding: 16px;
  }

  &__date {
    font-weight: bold;
  }
}
</style>
<script lang="ts">
import Container from "@/components/Container.vue";
export default {
  components: {Container}
}
</script>