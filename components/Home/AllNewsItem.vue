<template>
  <div
    class="mb-30 grid-item"
    :class="$route.params.category ? 'col-sm-4' : 'col-sm-6'"
  >
    <div class="single-stories-card">
      <div class="stories-card-img">
        <img :src="thumbnail" :alt="article.title" />
      </div>
      <div class="stories-card-content">
        <div class="sub-title-wrapper">
          <nuxt-link :to="`/${article.category}`" class="card-sub-title">
            {{ article.categorytitle }}
          </nuxt-link>
          <h5 class="card-date">{{ formatDate(article.pubdate) }}</h5>
        </div>
        <h4 class="card-title">
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
  async fetch() {
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
