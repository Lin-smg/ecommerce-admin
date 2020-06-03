const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userid: state => state.user.userid,

  curUserInfo: state => state.user.curUserInfo,
  allPermission: state => state.user.allPermission,
  backHandle: state => state.app.backHandle
}
export default getters
