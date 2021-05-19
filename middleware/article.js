export default function ({ store, redirect, route }) {
  if (
    !store.state.News.news.find((article) => article.guid === route.query.guid)
  ) {
    return redirect('/')
  }
}
