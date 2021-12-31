<template>
  <div class="user">
    <div class="user__grid">
      <div class="user__image">
        <slot name="image"></slot>
      </div>
      <div class="user__name">
        <slot name="name"></slot>
      </div>
      <slot name="action"></slot>
    </div>

    <slot name="occurrences"></slot>
    <slot name="expanded"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    hasOccurrences: {
      type: Boolean,
      default: true,
    },

    hasExpanded: {
      type: Boolean,
      default: true,
    }
  }
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

  &__action {
    border: none;
    color: tomato;
    font-size: 32px;
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