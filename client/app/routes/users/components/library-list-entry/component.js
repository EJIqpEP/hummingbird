import Ember from 'ember';
import IsViewingSelfMixin from 'client/mixins/is-viewing-self';

const {
  Component,
  computed,
  computed: { alias },
  get,
  inject: { service }
} = Ember;

// TODO: Update rating to support different rating systems
export default Component.extend(IsViewingSelfMixin, {
  isOpened: false,
  media: alias('entry.anime'),
  user: alias('entry.user'),
  currentSession: service(),

  personalNote: computed('media.canonicalTitle', {
    get() {
      const title = get(this, 'media.canonicalTitle');
      return `Personal notes about ${title}`;
    }
  }),

  episodeCount: computed('media.episodeCount', {
    get() {
      return get(this, 'media.episodeCount') || '?';
    }
  }),

  rating: computed('entry.rating', {
    get() {
      return get(this, 'entry.rating') || '—';
    }
  }),

  type: computed('media.showType', {
    get() {
      const showTypes = ['TV', 'Special', 'ONA', 'OVA', 'Movie', 'Music'];
      const showType = get(this, 'media.showType');
      return showTypes[showType - 1];
    }
  }),

  actions: {
    toggleDisplay() {
      this.toggleProperty('isOpened');
    }
  }
});
