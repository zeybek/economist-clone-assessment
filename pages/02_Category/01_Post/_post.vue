<template>
  <div v-if="article">
    <!-- blog banner area start from here -->
    <section class="single-blog-banner-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 m-auto">
            <div class="single-blog-banner-wrapper">
              <h5>{{ article.categorytitle }}</h5>
              <h1>{{ article.title }}</h1>
              <p>
                {{ article.description }}
              </p>
              <div
                class="
                  single-blog-social
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <p>{{ formatDate(article.pubdate) }}</p>
                <div class="social-icon">
                  <ul class="d-flex align-items-center justify-content-between">
                    <li>
                      <a href="#"
                        ><img
                          :src="require('~/assets/img/svg/facebook.svg')"
                          alt=""
                      /></a>
                    </li>
                    <li>
                      <a href="#"
                        ><img
                          :src="require('~/assets/img/svg/instagram.svg')"
                          alt=""
                      /></a>
                    </li>
                    <li>
                      <a href="#"
                        ><img
                          :src="require('~/assets/img/svg/twitter.svg')"
                          alt=""
                      /></a>
                    </li>
                    <li>
                      <a href="#"
                        ><img
                          :src="require('~/assets/img/svg/youtube.svg')"
                          alt=""
                      /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <PostContent :article="article" />
    <SharedSubscribe />
    <SharedFooter />
  </div>
</template>
<script>
export default {
  middleware: ['authenticated', 'article'],
  data() {
    return {
      article: '',
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
      { src: '../../assets/js/dark-light.js' },
      { src: '../../assets/js/default-js/jquery-3.3.1.min.js', body: true },
      {
        src: '../../assets/js/default-js/jquery-migrate-1.4.1.min.js',
        body: true,
      },
      { src: '../../assets/js/default-js/popper.js', body: true },
      { src: '../../assets/js/default-js/bootstrap.min.js', body: true },
      { src: '../../assets/js/plugin/jquery.hideseek.min.js', body: true },
      { src: '../../assets/js/plugin/isotop-pakage-min.js', body: true },
      { src: '../../assets/js/plugin/imagesloaded.pkgd.min.js', body: true },
      {
        src: '../../assets/js/plugin/owl-carousel/owl.carousel.min.js',
        body: true,
      },
      { src: '../../assets/js/plugin/owl-carousel/owl-custom.js', body: true },
      { src: '../../assets/js/plugin/youtube-overlay.js', body: true },
      { src: '../../assets/js/plugin/highlight.min.js', body: true },
      {
        src: '../../assets/js/plugin/nice-select/jquery.nice-select.min.js',
        body: true,
      },
      { src: '../../assets/js/scripts.js', body: true },
    ],
  },
  async beforeMount() {
    this.article = await this.$axios.$post('/api/news', {
      guid: this.$route.query.guid,
    })
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
<router>
  {
    path: '/:category/:post'
  }
</router>
