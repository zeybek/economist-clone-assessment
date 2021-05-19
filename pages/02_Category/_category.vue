<template>
  <div>
    <CategoryBanner />
    <div class="single-tag-post-area py-100 py-sm-50 section-bg py-md-50">
      <div class="container">
        <div class="row justify-content-center grid">
          <HomeAllNewsItem
            v-for="article in getNews
              .filter((article) => article.category === $route.params.category)
              .slice(oldPageValue, 9 * (currentPage + 1))"
            :key="article.guid"
            :article="article"
          />
        </div>
        <SharedPagination
          :totalnews="
            getNews.filter(
              (article) => article.category === $route.params.category
            ).length
          "
          :currentpage="currentPage"
          :perpage="9"
          @onChangePage="pageChanged"
        />
      </div>
    </div>
    <SharedSubscribe />
    <SharedFooter />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'category',
  data() {
    return {
      currentPage: 0,
      oldPageValue: 0,
    }
  },
  head: {
    title: 'TheEconomist',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: '../assets/js/dark-light.js' },
      { src: '../assets/js/default-js/jquery-3.3.1.min.js', body: true },
      {
        src: '../assets/js/default-js/jquery-migrate-1.4.1.min.js',
        body: true,
      },
      { src: '../assets/js/default-js/popper.js', body: true },
      { src: '../assets/js/default-js/bootstrap.min.js', body: true },
      { src: '../assets/js/plugin/jquery.hideseek.min.js', body: true },
      { src: '../assets/js/plugin/isotop-pakage-min.js', body: true },
      { src: '../assets/js/plugin/imagesloaded.pkgd.min.js', body: true },
      {
        src: '../assets/js/plugin/owl-carousel/owl.carousel.min.js',
        body: true,
      },
      { src: '../assets/js/plugin/owl-carousel/owl-custom.js', body: true },
      { src: '../assets/js/plugin/youtube-overlay.js', body: true },
      { src: '../assets/js/plugin/highlight.min.js', body: true },
      {
        src: '../assets/js/plugin/nice-select/jquery.nice-select.min.js',
        body: true,
      },
      { src: '../assets/js/scripts.js', body: true },
    ],
  },

  computed: {
    ...mapGetters({
      getNews: 'News/getNews',
    }),
  },
  methods: {
    newerPost() {
      this.currentPage++
    },
    olderPost() {
      this.currentPage--
    },
    pageChanged(value) {
      this.oldPageValue = 9 * value
      this.currentPage = value
    },
  },
}
</script>
<router>
  {
    path: '/:category'
  }
</router>
