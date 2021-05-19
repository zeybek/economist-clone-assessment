<template>
  <div class="row">
    <div class="col-12">
      <div class="post-order-wrapper">
        <ul class="d-flex align-items-center justify-content-between">
          <li>
            <a href="#" @click.prevent="decreasePage"
              ><img
                class="mr-10"
                src="~/assets/img/svg/arrow-right.svg"
                alt=""
              />Newer Post</a
            >
          </li>
          <li>
            <a href="#" @click.prevent="increasePage"
              >Older Post
              <img class="ml-10" src="~/assets/img/svg/arrows-left.svg" alt=""
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalnews: { type: Number, default: 0 },
    currentpage: { type: Number, default: 0 },
    perpage: { type: Number, default: 0 },
  },
  data() {
    return { propPage: 0 }
  },

  methods: {
    increasePage() {
      this.propPage < Math.ceil(this.totalnews / this.perpage) - 1 &&
        this.propPage++
      this.$emit('onChangePage', this.propPage)
    },
    decreasePage() {
      this.propPage > 0 && this.propPage--
      this.$emit('onChangePage', this.propPage)
    },
  },
}
</script>
