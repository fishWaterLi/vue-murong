<template>
  <div
    v-loading.fullscreen.lock="loading" :element-loading-text="$t('loading')"
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="d2-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex>
        <div class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" flex-box="0">
          <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
        </div>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <d2-icon name="bars"/>
        </div>
        <d2-menu-header flex-box="1"/>
        <!-- 顶栏右侧 -->
        <div class="d2-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <d2-header-search @click="handleSearchClick"/>
          <d2-header-fullscreen/>
          <d2-header-theme/>
          <d2-header-lang/>
          <d2-header-user/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          class="d2-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">
          <d2-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-show="searchActive" class="d2-theme-container-main-layer" flex="dir:top">
              <d2-panel-search
                ref="panelSearch"
                @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-show="!searchActive" class="d2-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="d2-theme-container-main-header" flex-box="0">
                <d2-tabs/>
              </div>
              <!-- 页面 -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sysMenuService, sysUserService } from '@/common/api'
import d2MenuSide from './components/menu-side'
import d2MenuHeader from './components/menu-header'
import d2Tabs from './components/tabs'
import d2HeaderFullscreen from './components/header-fullscreen'
import d2HeaderSearch from './components/header-search'
import d2HeaderTheme from './components/header-theme'
import d2HeaderUser from './components/header-user'
import d2HeaderLang from './components/header-lang'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import mixinSearch from './mixins/search'
export default {
  name: 'd2-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    d2MenuSide,
    d2MenuHeader,
    d2Tabs,
    d2HeaderFullscreen,
    d2HeaderSearch,
    d2HeaderTheme,
    d2HeaderUser,
    d2HeaderLang
  },
  data () {
    return {
      // 加载状态
      loading: true,
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px'
    }
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    }),
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup () {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },
  created () {
    Promise.all([
      this.getUserInfo(),
      this.getPermissions()
    ]).then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions('d2admin/menu', [
      'asideCollapseToggle'
    ]),
    ...mapMutations('d2admin/user', {
      userInfoSet: 'set'
    }),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside () {
      this.asideCollapseToggle()
    },
    // [ murong ] 获取当前管理员信息
    getUserInfo () {
      return sysUserService
        .getInfo()
        .then(res => {
          this.userInfoSet({
            id: res.data.id,
            name: res.data.username,
            superAdmin: res.data.superAdmin
          })
        })
        .catch(() => {})
    },
    // [  ] 获取权限
    getPermissions () {
      return sysMenuService
        .getPermissions()
        .then(res => {
          window.SITE_CONFIG['permissions'] = res.data
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
</style>
