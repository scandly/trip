<template>
  <div class="home">
    <!-- Banner Carousel -->
    <section class="banner">
      <div class="banner-slide" :key="currentSlide">
        <img :src="banners[currentSlide].image" :alt="banners[currentSlide].title" />
        <div class="banner-text">
          <h2>{{ banners[currentSlide].title }}</h2>
          <p>{{ banners[currentSlide].subtitle }}</p>
        </div>
      </div>
      <div class="banner-dots">
        <span
          v-for="(b, i) in banners"
          :key="i"
          class="dot"
          :class="{ active: i === currentSlide }"
          @click="currentSlide = i"
        ></span>
      </div>
    </section>

    <!-- Search & Filter -->
    <section class="filters">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="🔍 搜索景点名称..."
      />
      <div class="region-tags">
        <button
          v-for="r in regions"
          :key="r"
          class="tag"
          :class="{ active: activeRegion === r }"
          @click="activeRegion = activeRegion === r ? '' : r"
        >
          {{ r }}
        </button>
      </div>
    </section>

    <!-- Attraction Cards -->
    <section class="card-grid">
      <div
        v-for="item in filteredAttractions"
        :key="item.id"
        class="card"
        @click="goDetail(item.id)"
      >
        <div class="card-img">
          <img :src="item.coverImage" :alt="item.name" loading="lazy" />
          <button class="fav-btn" @click.stop="toggleFav(item.id)">
            {{ isFav(item.id) ? '❤️' : '🤍' }}
          </button>
        </div>
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <span class="card-city">{{ item.city }}</span>
          <p class="card-desc">{{ item.intro.slice(0, 60) }}...</p>
          <div class="card-meta">
            <span>📅 {{ item.bestSeason }}</span>
            <span>🕐 {{ item.suggestedDays }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <div v-if="filteredAttractions.length === 0" class="empty">
      <p>😕 没有找到匹配的景点</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import attractions from "../data/attractions.json";

const router = useRouter();

const banners = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    title: "探索中国最美风景",
    subtitle: "十大热门景点，发现旅行的意义",
  },
  {
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&q=80",
    title: "奇峰异石，人间仙境",
    subtitle: "张家界 · 九寨沟 · 黄山",
  },
  {
    image: "https://images.unsplash.com/photo-1589411885454-8c67f14c45ce?w=1200&q=80",
    title: "千年文明，世界遗产",
    subtitle: "故宫 · 长城 · 兵马俑 · 布达拉宫",
  },
];

const currentSlide = ref(0);
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % banners.length;
  }, 4000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const searchQuery = ref("");
const activeRegion = ref("");

const regions = ["全部", "华北", "华东", "华中", "华南", "西南", "西北"];

const filteredAttractions = computed(() => {
  return attractions.filter((a) => {
    const matchSearch =
      !searchQuery.value ||
      a.name.includes(searchQuery.value) ||
      a.city.includes(searchQuery.value);
    const matchRegion =
      !activeRegion.value || activeRegion.value === "全部" || a.region === activeRegion.value;
    return matchSearch && matchRegion;
  });
});

// Favorites
const favList = ref(JSON.parse(localStorage.getItem("trip_favs") || "[]"));

const isFav = (id) => favList.value.includes(id);

const toggleFav = (id) => {
  const idx = favList.value.indexOf(id);
  if (idx > -1) {
    favList.value.splice(idx, 1);
  } else {
    favList.value.push(id);
  }
  localStorage.setItem("trip_favs", JSON.stringify(favList.value));
};

const goDetail = (id) => {
  router.push({ name: "Detail", params: { id } });
};
</script>
