<template>
  <section class="all-stories-area pt-100 pb-50">
    <div class="section-heading text-center">
      <h2>All News</h2>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mb-md-50">
          <div class="row grid">
            <HomeAllNewsItem
              v-for="article in getNews.slice(
                oldPageValue,
                10 * (currentPage + 1)
              )"
              :key="article.guid"
              :article="article"
            />
          </div>
          <SharedPagination
            :totalnews="getNews.length"
            :currentpage="currentPage"
            :perpage="10"
            @onChangePage="pageChanged"
          />
        </div>
        <div class="col-lg-4">
          <div class="side-bar-wrapper">
            <div class="row">
              <div class="col-lg-12 col-md-6 col-sm-7">
                <WidgetLatestNews />
                <div
                  class="pro-add"
                  style="
                    background-image: url(~/assets/img/sidebar-img/promotion-add.jpg);
                  "
                >
                  <button class="btn btn-white btn-radious-6">
                    Promotional Ad
                  </button>
                  <img src="~/assets/img/svg/circle-shape.svg" alt="" />
                </div>
              </div>
              <div class="col-lg-12 col-md-6 col-sm-5">
                <WidgetCategory />
                <div class="instagram-area">
                  <h4>Instagram</h4>
                  <div class="instra-wrap">
                    <ul>
                      <li>
                        <img
                          src="~/assets/img/sidebar-img/instra1.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src="~/assets/img/sidebar-img/instra2.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src="~/assets/img/sidebar-img/instra3.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src="~/assets/img/sidebar-img/instra4.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src="~/assets/img/sidebar-img/instra5.png"
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src="~/assets/img/sidebar-img/instra6.png"
                          alt=""
                        />
                      </li>
                    </ul>
                    <a href="#" class="btn btn-orange"
                      ><img
                        src="~/assets/img/svg/instra.svg"
                        alt=""
                      />instagram</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentPage: 0,
      oldPageValue: 0,
    }
  },
  computed: {
    ...mapGetters({
      getNews: 'News/getNews',
    }),
  },
  methods: {
    newerPost() {
      this.currentPage++
    },
    olderPost() {
      this.currentPage--
    },
    pageChanged(value) {
      this.oldPageValue = 10 * value
      this.currentPage = value
    },
  },
}
</script>
