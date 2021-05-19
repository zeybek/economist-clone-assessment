<template>
  <div class="single-blog-full-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 m-auto">
          <div class="post-thumb">
            <img :src="article.thumbnail" alt="" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 m-auto">
          <div class="post-full-content">
            <p class="title-content">
              {{ article.content }}
            </p>
          </div>
        </div>
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
}
</script>
