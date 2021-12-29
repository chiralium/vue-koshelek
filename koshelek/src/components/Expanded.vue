<template>
  <div class="expanded">
    <div class="expanded__icon" v-on:click="onClick">
      <slot name="icon"/>
    </div>
    <div :class="['expanded__content', isOpen ? '' : 'expanded__content_hidden']">
      <slot name="content"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: function() {
    return {
      isOpen: false,
    }
  },

  methods: {
    onClick() {
      this.isOpen = !this.isOpen;
    },
  }
})
</script>

<style lang="less">
.expanded {
  &__content {
    border: 2px solid tomato;
    border-radius: 12px;
    padding: 8px;

    &_hidden {
      display: none;
    }
  }

  &__icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>