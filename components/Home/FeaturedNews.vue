<template>
  <section class="banner-area">
    <div class="container">
      <div
        class="banner-owl-area owl-carousel"
        data-carousel-loop="true"
        data-carousel-autoplay="false"
        data-carousel-mousedrag="true"
        data-carousel-items="1"
        data-carousel-nav="false"
      >
        <HomeFeaturedNewsItem
          v-for="article in featuredNews"
          :key="article.guid"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getNews: 'News/getNews',
    }),
    featuredNews() {
      const items = []
      for (let i = 0; i < 3; i++) {
        items.push(
          this.getNews[Math.floor(Math.random() * this.getNews.length)]
        )
      }
      return items
    },
  },
}
</script>
