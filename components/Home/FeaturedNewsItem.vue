<template>
  <div class="banner-single-wrapper">
    <div class="banner-img-area">
      <h4>Random News</h4>
      <div class="banner-img">
        <img :src="thumbnail" :alt="article.title" />
      </div>
    </div>
    <div class="banner-content-area">
      <h5>{{ article.categorytitle }}</h5>
      <h1>
        <a
          :href="`/${article.category}/${article.slug}?guid=${article.guid}`"
          >{{ article.title }}</a
        >
      </h1>
      <h4 class="date">
        <span>{{ formatDate(article.pubdate) }}</span>
      </h4>
      <p>
        {{ article.description }}
      </p>
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
      // eslint-disable-next-line no-console
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
