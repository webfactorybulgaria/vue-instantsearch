import suit from './suit';

export default {
  inject: {
    instantSearchInstance: {
      name: 'instantSearchInstance',
      default() {
        const tag = this.$options._componentTag;
        throw new TypeError(
          `It looks like you forgot to wrap your Algolia search component
          "<${tag}>" inside of an "<ais-index>" component.`
        );
      },
    },
  },
  data() {
    return {
      state: null,
    };
  },
  created() {
    console.log('CREATED', this.widgetName);

    this.factory = this.connector(this.updateState, () => {});
    this.widget = this.factory(this.widgetParams);

    if (this.$isServer) {
      this.instantSearchInstance.renderWidget(this.widget);
    } else {
      this.instantSearchInstance.addWidget(this.widget);
    }
  },
  mounted() {
    console.log('MOUNTED', this.widgetName);
  },
  beforeDestroy() {
    this.instantSearchInstance.removeWidget(this.widget);
  },
  watch: {
    widgetParams: {
      handler(nextWidgetParams) {
        this.state = null;
        this.instantSearchInstance.removeWidget(this.widget);
        this.widget = this.factory(nextWidgetParams);
        this.instantSearchInstance.addWidget(this.widget);
      },
      deep: true,
    },
  },
  methods: {
    suit(...args) {
      return suit(this.widgetName, ...args);
    },
    updateState(state = {}, isFirstRender) {
      console.log('UPDATE', this.widgetName, isFirstRender);

      if (!isFirstRender) {
        // Avoid updating the state on first render
        // otherwise there will be a flash of placeholder data
        this.state = state;
      }
    },
  },
};
