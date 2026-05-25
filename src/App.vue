<template>
  <div class="app">
    <nav class="navbar">
      <div class="nav-inner">
        <router-link to="/" class="logo">🌍 旅行攻略</router-link>
        <div class="nav-links">
          <router-link to="/">首页</router-link>
          <router-link to="/favorites">❤️ 收藏</router-link>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="footer">
      <p>© 2026 旅行攻略 | 中国十大热门景点</p>
    </footer>
  </div>
</template>
