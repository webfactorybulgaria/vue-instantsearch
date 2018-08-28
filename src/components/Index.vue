<template>
  <!-- Index is an empty component that will hold other widgets -->
  <div :class="suit()">
    <slot />
  </div>
</template>

<script>
import instantsearch from 'instantsearch.js/es/';
import suit from '../suit';

export default {
  provide() {
    this.instantSearchInstance =
      this.instance ||
      instantsearch({
        appId: this.appId,
        apiKey: this.apiKey,
        indexName: this.indexName,
        routing: this.routing,
        stalledSearchDelay: this.stalledSearchDelay,
        searchClient: this.searchClient,
      });

    return {
      instantSearchInstance: this.instantSearchInstance,
    };
  },
  props: {
    apiKey: {
      type: String,
    },
    appId: {
      type: String,
    },
    indexName: {
      type: String,
    },
    searchClient: {
      type: Object,
    },
    instance: {
      type: Object,
    },
    routing: {
      type: [Boolean, Object],
      default: null,
    },
    stalledSearchDelay: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      widgetName: 'Index',
    };
  },
  created() {
    console.log('CREATED', this.widgetName);
  },
  mounted() {
    console.log('MOUNTED', this.widgetName);
    // From the documentation: https://vuejs.org/v2/api/#mounted
    // "Note that mounted does not guarantee that all child components have also been mounted. If you want to
    // wait until the entire view has been rendered, you can use vm.$nextTick inside of mounted" - Ensure that
    // the update is triggered on widgets that are already mounted on the page.
    this.$nextTick(() => {
      this.instantSearchInstance.start();
    });
  },
  methods: {
    suit(...args) {
      return suit(this.widgetName, ...args);
    },
  },
};
</script>
