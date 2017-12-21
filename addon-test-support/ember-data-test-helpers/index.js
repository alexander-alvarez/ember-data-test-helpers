import { setupTest } from 'ember-qunit';
import { assert } from '@ember/debug';

/**
 * Method to setup `this.data.createSnapshot`, and `this.data.store` methods in the testing context
 * for testing adapters, models, and serializers.
 *
 * @function setupStoreTest
 * @param hooks
 */
function setupStoreTest(hooks) {

  hooks.before(function() {

    assert('ember-data-test-helpers reserves the `this.data` namespace in your tests, yet it has discovered a collision'
        `this.data = ${JSON.stringify(this.data)}`,
      !this.data
    );
    this.data = {};
    /**
     * Method to provide an intimate API to create snapshots during tests. Use `options.adapterOptions` to pass options
     * to the adapter, as one would when calling `store.findAll(type, options)`
     * to the `adapterOptions`
     *
     * @method createSnapshot
     * @param {DS.Model} model
     * @param {Object} options
     * @returns {*}
     */
    this.data.createSnapshot = function(model, options) {
      return model._internalModel.createSnapshot(options);
    }
  });
  hooks.beforeEach(function() {
    this.data.store = this.owner.lookup(`service:store`);
  });

  hooks.afterEach(function() {
    this.data = {};
  });
  hooks.after(function() {
    delete this.data;
  })
}

export { setupStoreTest };
