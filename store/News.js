export const state = () => ({
  module: 'News',
  news: [],
  categories: [
    { title: 'The world this week', slug: 'the-world-this-week' },
    { title: 'Leaders', slug: 'leaders' },
    { title: 'Briefings', slug: 'briefing' },
    { title: 'Special reports', slug: 'special-report' },
    { title: 'Britain', slug: 'britain' },
    { title: 'Europe', slug: 'europe' },
    { title: 'United States', slug: 'united-states' },
    { title: 'The Americas', slug: 'the-americas' },
    { title: 'Middle East and Africa', slug: 'middle-east-and-africa' },
    { title: 'Asia', slug: 'asia' },
    { title: 'China', slug: 'china' },
    { title: 'International', slug: 'international' },
    { title: 'Business', slug: 'business' },
    { title: 'Finance and economics', slug: 'finance-and-economics' },
    { title: 'Science and technology', slug: 'science-and-technology' },
    { title: 'Books and arts', slug: 'books-and-arts' },
    { title: 'Obituaries', slug: 'obituary' },
    { title: 'Graphic detail', slug: 'graphic-detail' },
    { title: 'Indicators', slug: 'economic-and-financial-indicators' },
  ],
})

export const getters = {
  getState: (state) => (value) => {
    return state[value]
  },
  getNews: (state) => {
    return state.news
      .filter((article) => article.description !== '')
      .sort((a, b) => b.pubdate - a.pubdate)
  },
}

export const mutations = {
  SET_STATE(state, { key, payload }) {
    state[key] = payload
  },
  SET_NEWS(state, payload) {
    state.news.push(payload)
  },
}
