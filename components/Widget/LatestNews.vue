<template>
  <div class="latest-news">
    <h4>Latest News</h4>
    <WidgetLatestNewsItem
      v-for="article in getNews.slice(0, 5)"
      :key="article.guid"
      :article="article"
    />
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
}
</script>
