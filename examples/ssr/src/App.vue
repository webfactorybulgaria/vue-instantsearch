<template>
  <div>
    <section class="hero">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld :title="title" />
    </section>
    <index
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="instant_search"
    >
      <configure :hitsPerPage="3" />

      <div class="container container-playground">
        <div class="panel-left">
          <ais-menu attribute="brand" />
        </div>
        <div class="panel-right">
          <search-box />
          <stats />
          <hits>
            <ol
              slot-scope="{ items }"
              class="playground-hits"
            >
              <li
                v-for="item in items"
                :key="item.objectID"
                class="playground-hits-item"
              >
                <div
                  class="playground-hits-image"
                  :style="{ backgroundImage: 'url(' + item.image + ')' }"
                />
                <div class="playground-hits-desc">
                  <p>{{ item.name }}</p>
                  <p>Rating: {{ item.rating }}✭</p>
                  <p>Price: {{ item.price }}$</p>
                </div>
              </li>
            </ol>
          </hits>
          <pagination />
        </div>
      </div>
    </index>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { Index, Configure, Menu, SearchBox, Stats, Hits, Pagination } from 'vue-instantsearch';

export default {
  name: 'app',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    'ais-menu': Menu,
    HelloWorld,
    Index,
    Configure,
    SearchBox,
    Stats,
    Hits,
    Pagination,
  },
};
</script>

<style>
html,
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.hero {
  text-align: center;
  margin-top: 60px;
}

.container {
  position: relative;
  padding: 50px 40px 40px;
}

.container-playground {
  display: flex;
}

.panel-left {
  width: 160px;
  margin-right: 20px;
}

.panel-right {
  flex: 1;
}

.panel-right .ais-Stats {
  margin-top: 5px;
  font-style: italic;
}

.playground-hits {
  list-style: none;
  padding: 0;
  margin: 25px 0;
}

.playground-hits-item {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.playground-hits-item:last-child {
  margin-bottom: 0;
}

.playground-hits-image {
  width: 100px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.playground-hits-desc {
  margin-left: 25px;
}

.playground-hits-desc > p {
  margin: 0 0 10px;
}

.playground-hits-desc > p:last-child {
  margin: 0;
}
</style>
