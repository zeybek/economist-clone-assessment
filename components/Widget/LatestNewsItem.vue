<template>
  <div class="latest-single-post">
    <div class="latest-single-img">
      <img width="100px" :src="thumbnail" alt="" />
    </div>
    <div class="latest-single-content">
      <div class="latext-scontent-title">
        <h5>{{ article.categorytitle }}</h5>
        <span>{{ formatDate(article.pubdate) }}</span>
      </div>
      <div class="latext-scontent">
        <h4>
          <a
            :href="`/${article.category}/${article.slug}?guid=${article.guid}`"
            >{{ article.title }}</a
          >
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      thumbnail: '',
    }
  },
  async mounted() {
    await this.$axios
      .$post('/api/news/thumbnail/', { articleLink: this.article.link })
      .then((response) => {
        this.thumbnail = response.thumbnail
      })
      .catch((error) => console.log(error))
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
