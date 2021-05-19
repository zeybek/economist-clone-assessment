<template>
  <div class="search-popup-area">
    <div class="search-option">
      <div class="search-box">
        <img src="~/assets/img/svg/search.svg" alt="" />
        <input
          id="search-box"
          name="search"
          type="text"
          data-list=".data-list"
          placeholder="Type your keywords..."
        />
      </div>
      <div class="data-list-wrapper">
        <ul
          class="data-list"
          style="max-height: 80vh; overflow: hidden; overflow-y: auto"
        >
          <li v-for="article in getNews.slice(0, 100)" :key="article.guid">
            <a
              :href="`/${article.category}/${article.slug}?guid=${article.guid}`"
            >
              <div class="search-content">
                <div class="search-title">
                  <h4>
                    {{ article.title }}
                    <span>{{ formatDate(article.pubdate) }}</span>
                  </h4>
                </div>
                <p>
                  {{ article.description }}
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="popup-close-icon">
      <img src="~/assets/img/svg/close-icon.svg" alt="" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getNews: 'News/getNews',
    }),
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
