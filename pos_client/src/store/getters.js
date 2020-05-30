const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  curUserInfo: state => state.user.curUserInfo,
  allPermission: state => state.user.allPermission,
  backHandle: state => state.app.backHandle
}
export default getters
