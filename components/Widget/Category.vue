<template>
  <div class="categories-area">
    <h4>Categories</h4>
    <ul>
      <li v-for="category in getState('categories')" :key="category.slug">
        <a :href="'/' + category.slug">{{ category.title }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getState: 'News/getState',
    }),
  },
}
</script>
