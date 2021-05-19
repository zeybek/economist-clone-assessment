export default function ({ store, redirect, app }) {
  if (!app.$cookies.get('token')) {
    return redirect('/')
  }
}
