export default function ({ $axios, app, store, $cookies }) {
  $axios.onRequest((config) => {
    if ($cookies.get('token')) {
      // eslint-disable-next-line dot-notation
      config.headers.common['Authorization'] = $cookies.get('token')
    }
  })
}
