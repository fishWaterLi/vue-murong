import request from '@/plugin/axios'
import encrypt from '@/common/encrypt'

/**
 * @description [ sys ] 登陆注销相关
 */
export const sysAccountService = {
  /**
   * 登录
   */
  login(data) {
     data.password = encrypt.AESEncrypt(data.password)
    return request({
      url: '/sys/login',
      method: 'post',
      data
    })
  }
}

/**
 * @description [ sys ] 系统信息
 */
export const sysInfoService = {
  /**
   * 获取系统信息
   */
  get() {
    return request({
      url: '/sys/info'
    })
  }
}

/**
 * @description [ sys ] 菜单和路由相关
 */
export const sysMenuService = {
  /**
   * 获取菜单
   */
  getNav() {
    return request({
      url: '/sys/menu/nav'
    })
  },
  /**
   * 获取权限
   */
  getPermissions() {
    return request({
      url: '/sys/user/permissions'
    })
  }
}

/**
 * @description [ sys ] 用户相关
 */
export const sysUserService = {
  /**
   * 获取用户信息
   */
  getInfo() {
    return request({
      url: '/sys/user/info'
    })
  },
  updatePassword(data) {
    data.password = encrypt.AESEncrypt(data.password)
    data.newPassword = encrypt.AESEncrypt(data.newPassword)

    return request({
      url: '/sys/user/password',
      method: 'post',
      data
    })
  }
}
