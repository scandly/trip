<template>
  <div class="favorites">
    <h1>❤️ 我的收藏</h1>

    <div v-if="favAttractions.length > 0" class="card-grid">
      <div
        v-for="item in favAttractions"
        :key="item.id"
        class="card"
        @click="goDetail(item.id)"
      >
        <div class="card-img">
          <img :src="item.coverImage" :alt="item.name" loading="lazy" />
          <button class="fav-btn active" @click.stop="removeFav(item.id)">❤️</button>
        </div>
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <span class="card-city">{{ item.city }}</span>
          <p class="card-desc">{{ item.intro.slice(0, 60) }}...</p>
        </div>
      </div>
    </div>

    <div v-else class="empty">
      <p>😕 还没有收藏任何景点</p>
      <router-link to="/" class="btn">去首页看看</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import attractions from "../data/attractions.json";

const router = useRouter();

const favList = ref([]);
const favAttractions = ref([]);

const loadFavs = () => {
  favList.value = JSON.parse(localStorage.getItem("trip_favs") || "[]");
  favAttractions.value = attractions.filter((a) => favList.value.includes(a.id));
};

onMounted(loadFavs);

const removeFav = (id) => {
  favList.value = favList.value.filter((f) => f !== id);
  localStorage.setItem("trip_favs", JSON.stringify(favList.value));
  loadFavs();
};

const goDetail = (id) => {
  router.push({ name: "Detail", params: { id } });
};
</script>
