export const state = () => ({})

export const actions = {
  async nuxtServerInit({ dispatch }, { app, req, $content, $axios, route }) {
    if (!app.store.state.News.news.length) {
      let { data } = await $axios.get('/api/news')
      data = data.sort((a, b) => {
        return new Date(b.pubdate) - new Date(a.pubdate)
      })
      data.forEach((result) => app.store.commit('News/SET_NEWS', result))
    }
  },
}
