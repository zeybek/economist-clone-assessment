<template>
  <div>
    <HomePreloader />
    <HomeFeaturedNews />
    <HomeAllNews />
    <HomeCategories />
    <HomeSubscribe />
    <SharedFooter />
  </div>
</template>
<script>
export default {
  head: {
    title: 'TheEconomist',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'assets/js/dark-light.js' },
      { src: 'assets/js/default-js/jquery-3.3.1.min.js', body: true },
      { src: 'assets/js/default-js/jquery-migrate-1.4.1.min.js', body: true },
      { src: 'assets/js/default-js/popper.js', body: true },
      { src: 'assets/js/default-js/bootstrap.min.js', body: true },
      { src: 'assets/js/plugin/jquery.hideseek.min.js', body: true },
      { src: 'assets/js/plugin/isotop-pakage-min.js', body: true },
      { src: 'assets/js/plugin/imagesloaded.pkgd.min.js', body: true },
      { src: 'assets/js/plugin/owl-carousel/owl.carousel.min.js', body: true },
      { src: 'assets/js/plugin/owl-carousel/owl-custom.js', body: true },
      { src: 'assets/js/plugin/youtube-overlay.js', body: true },
      { src: 'assets/js/plugin/highlight.min.js', body: true },
      {
        src: 'assets/js/plugin/nice-select/jquery.nice-select.min.js',
        body: true,
      },
      { src: 'assets/js/scripts.js', body: true },
    ],
  },
}
</script>
<router>
  {
    path: '/'
  }
</router>
