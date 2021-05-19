<template>
  <section class="subscribe-area">
    <div class="container">
      <div class="row">
        <div class="col-md-10 m-auto">
          <div class="row align-items-center">
            <div class="col-md-10 m-auto">
              <div class="suscribe-wrapper">
                <div class="section-heading text-center">
                  <h2>Newsletter</h2>
                  <p>
                    Subscribe to see what we're thinking & get always latest
                    update
                  </p>
                </div>
                <div class="subscribe-input">
                  <input
                    v-model="newsletterEmail"
                    type="email"
                    placeholder="enter your email"
                  />
                  <button class="btn" @click="subscribeNewsletter">
                    Subscribe
                  </button>
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
export default {
  data() {
    return {
      newsletterEmail: '',
    }
  },
  methods: {
    subscribeNewsletter() {
      this.$axios
        .$post('/api/user/subscribe', {
          newsletteremail: this.newsletterEmail,
        })
        .then((result) => console.log(result.data))
        .catch((error) => console.log(error))
    },
  },
}
</script>
