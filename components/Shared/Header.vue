<template>
  <header class="header-area">
    <div class="container">
      <div
        class="header-wrapper d-flex align-items-center justify-content-between"
      >
        <!--header-logo-->
        <div class="header-logo">
          <a href="/"><span style="color: red">The</span>Economist</a>
        </div>
        <!-- menu-bar -->

        <!-- sign-in area -->
        <client-only>
          <div class="sign-in-area">
            <ul class="d-flex align-items-center justify-content-between">
              <li class="popup">
                <img src="~/assets/img/svg/search.svg" alt="" />
              </li>
              <li class="dark-light">
                <img src="~/assets/img/svg/dark-light.svg" alt="" />
              </li>
              <li class="sign-click relative">
                <button v-if="!$cookies.get('token')" class="btn">Login</button>
                <button
                  v-if="$cookies.get('token')"
                  class="btn"
                  @click="logout"
                >
                  Logout
                </button>
                <div
                  v-if="!$cookies.get('token')"
                  class="sign-in-card"
                  style="
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <h3>Welcome</h3>
                  <p style="text-align: center">
                    Create your account to read news from TheEconomist
                  </p>
                  <div
                    v-if="!hasAccount"
                    class="input-group-icon radious-6 mb-30"
                  >
                    <input
                      v-model="username"
                      type="text"
                      placeholder="Username"
                    />
                    <img src="~/assets/img/svg/mail-sign.svg" alt="" />
                  </div>
                  <div class="input-group-icon radious-6 mb-30">
                    <input v-model="email" type="email" placeholder="Email" />
                    <img src="~/assets/img/svg/mail-sign.svg" alt="" />
                  </div>
                  <div class="input-group-icon radious-6 mb-30">
                    <input
                      v-model="password"
                      type="password"
                      placeholder="Password"
                    />
                    <img src="~/assets/img/svg/mail-sign.svg" alt="" />
                  </div>
                  <button
                    class="btn btn-sm btn-radious-6 btn-black mb-20"
                    style="float: right"
                    @click="hasAccount ? login() : signup()"
                  >
                    {{ hasAccount ? 'Login' : 'Signup' }}
                  </button>
                  <div class="sign-link">
                    <p>
                      {{
                        hasAccount ? 'Create new account' : 'I have an account.'
                      }}
                    </p>
                    <a href="#" @click.prevent="toggleLogin">{{
                      hasAccount ? 'Signup' : 'Login'
                    }}</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="menu-toggole">
                  <span class="menu-show comon-tab">
                    <img src="~/assets/img/svg/toggle.svg" alt="" />
                  </span>
                  <span class="menu-close comon-tab">
                    <img src="~/assets/img/svg/close.svg" alt="" />
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </client-only>
      </div>
    </div>
    <!-- menu search popup -->
    <SharedSearchBar />
  </header>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      hasAccount: false,
    }
  },
  computed: {
    ...mapGetters({
      getCurrentUser: 'User/getCurrentUser',
    }),
  },
  mounted() {
    console.log(this.$cookies.get('token'))
  },
  methods: {
    ...mapMutations({
      setUser: 'User/SET_USER',
    }),
    async login() {
      await this.$axios
        .post('/api/user/login', {
          email: this.email,
          password: this.password,
        })
        .then((result) => {
          this.setUser(result.data)
          this.$cookies.set('token', result.data.token)
          location.href = '/'
        })
        .catch((error) => console.log(error))
    },
    async signup() {
      await this.$axios
        .post('/api/user/signup', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then((result) => {
          this.setUser(result.data)
          this.$cookies.set('token', result.data.token)
          location.href = '/'
        })
        .catch((error) => console.log(error))
    },
    logout() {
      console.log('Log Out')
      this.setUser('')
      this.$cookies.remove('token')
      location.href = '/'
    },
    toggleLogin() {
      this.hasAccount = !this.hasAccount
    },
  },
}
</script>
