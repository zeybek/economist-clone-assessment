<template>
  <section class="popular-tag-area py-100 py-md-60 section-bg">
    <div class="container">
      <div class="col-md-12">
        <div
          class="
            section-heading
            d-flex
            align-items-center
            justify-content-between
          "
        >
          <h2>Categories</h2>
        </div>
        <div class="row">
          <div
            v-for="category in getState('categories')"
            :key="category.slug"
            class="col-lg-4 col-md-6 mb-30"
          >
            <a
              :href="'/' + category.slug"
              class="popular-single-tag-wrapper"
              :style="
                'background-image: url(' +
                require('~/assets/img/homepage/tag-img1.jpg') +
                ')'
              "
            >
              <div class="tag-title">
                #{{ category.title.replace(/ /g, '') }}
              </div>
              <div class="tag-card">
                {{
                  getNews.filter(
                    (article) => article.category === category.slug
                  ).length
                }}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getState: 'News/getState',
      getNews: 'News/getNews',
    }),
  },
}
</script>
