<template>
  <div class="detail" v-if="attraction">
    <!-- Back Button -->
    <button class="back-btn" @click="$router.back()">← 返回</button>

    <!-- Cover -->
    <div class="detail-cover">
      <img :src="attraction.coverImage" :alt="attraction.name" />
      <div class="cover-overlay">
        <h1>{{ attraction.name }}</h1>
        <p>{{ attraction.city }} · {{ attraction.region }}</p>
      </div>
    </div>

    <div class="detail-content">
      <!-- Quick Info -->
      <section class="info-bar">
        <div class="info-item">📅 最佳季节<br /><strong>{{ attraction.bestSeason }}</strong></div>
        <div class="info-item">🕐 建议游玩<br /><strong>{{ attraction.suggestedDays }}</strong></div>
        <div class="info-item">🎫 参考票价<br /><strong>{{ attraction.ticketPrice }}</strong></div>
      </section>

      <!-- Intro -->
      <section class="section">
        <h2>景点简介</h2>
        <p>{{ attraction.intro }}</p>
      </section>

      <!-- Highlights -->
      <section class="section">
        <h2>必看亮点</h2>
        <div class="highlight-list">
          <div v-for="(h, i) in attraction.highlights" :key="i" class="highlight-item">
            <h3>{{ i + 1 }}. {{ h.title }}</h3>
            <p>{{ h.description }}</p>
          </div>
        </div>
      </section>

      <!-- Routes -->
      <section class="section">
        <h2>游玩路线推荐</h2>
        <ul class="route-list">
          <li v-for="(r, i) in attraction.routes" :key="i">{{ r }}</li>
        </ul>
      </section>

      <!-- Transport -->
      <section class="section">
        <h2>交通指南</h2>
        <p>{{ attraction.transport }}</p>
      </section>

      <!-- Food -->
      <section class="section">
        <h2>美食推荐</h2>
        <div class="tag-list">
          <span v-for="f in attraction.food" :key="f" class="food-tag">{{ f }}</span>
        </div>
      </section>

      <!-- Hotels -->
      <section class="section">
        <h2>住宿建议</h2>
        <ul>
          <li v-for="h in attraction.hotels" :key="h">{{ h }}</li>
        </ul>
      </section>

      <!-- Tips -->
      <section class="section">
        <h2>注意事项</h2>
        <ul class="tips-list">
          <li v-for="(t, i) in attraction.tips" :key="i">⚠️ {{ t }}</li>
        </ul>
      </section>

      <!-- Gallery -->
      <section class="section">
        <h2>图片画廊</h2>
        <div class="gallery">
          <img
            v-for="(img, i) in attraction.gallery"
            :key="i"
            :src="img"
            :alt="attraction.name"
            loading="lazy"
            @click="openLightbox(i)"
          />
        </div>
      </section>
    </div>

    <!-- Lightbox -->
    <div v-if="lightboxOpen" class="lightbox" @click="lightboxOpen = false">
      <img :src="attraction.gallery[lightboxIndex]" :alt="attraction.name" />
      <button class="lightbox-close">✕</button>
      <button class="lightbox-prev" @click.stop="prevImage">‹</button>
      <button class="lightbox-next" @click.stop="nextImage">›</button>
    </div>
  </div>

  <div v-else class="detail not-found">
    <p>景点不存在</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import attractions from "../data/attractions.json";

const route = useRoute();
const attraction = computed(() =>
  attractions.find((a) => a.id === Number(route.params.id))
);

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

const openLightbox = (i) => {
  lightboxIndex.value = i;
  lightboxOpen.value = true;
};

const prevImage = () => {
  if (attraction.value) {
    lightboxIndex.value =
      (lightboxIndex.value - 1 + attraction.value.gallery.length) %
      attraction.value.gallery.length;
  }
};

const nextImage = () => {
  if (attraction.value) {
    lightboxIndex.value =
      (lightboxIndex.value + 1) % attraction.value.gallery.length;
  }
};
</script>
