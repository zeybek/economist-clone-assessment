export default function ({ store, redirect, route }) {
  if (
    !store.state.News.categories.find(
      (category) => category.slug === route.params.category
    )
  ) {
    return redirect('/')
  }
}
