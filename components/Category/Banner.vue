<template>
  <section class="single-tag-banner-area">
    <div
      class="container"
      style="display: flex; align-items: center; justify-content: center"
    >
      <div class="row align-items-center justify-content-center">
        <div class="col-lg-12 col-md-6">
          <div class="single-tag-banner-content">
            <h1>
              {{ categoryTitle }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: this.categoryTitle + ' || TheEconomist',
    }
  },
  computed: {
    ...mapGetters({
      getState: 'News/getState',
    }),
    categoryTitle() {
      return this.getState('categories').filter(
        (category) => category.slug === this.$route.params.category
      )[0].title
    },
  },
}
</script>
