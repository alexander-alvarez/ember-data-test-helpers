import { setupTest } from 'ember-qunit';

/**
 * Method to setup `this.createSnapshot`, and `this.store` methods in the testing context
 * for testing adapters, models, and serializers.
 *
 * @function setupStoreTest
 * @param hooks
 */
function setupStoreTest(hooks) {
  setupTest(hooks);

  hooks.before(function() {
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
    this.createSnapshot = function(model, options) {
      return model._internalModel.createSnapshot(options);
    }
  });
  hooks.beforeEach(function() {
    this.store = function(dasherizedStoreName = 'store') {
      return this.owner.lookup(`service:${dasherizedStoreName}`);
    };
  });

  hooks.afterEach(function() {
    this.store = null;
  });
}


/**
 * Setups the testing context for serializer tests.
 * Provides a `this.serializer` method to properly setup a serializer for testing.
 *
 * @function setupSerializerTest
 * @param hooks
 */
function setupSerializerTest(hooks) {
  setupStoreTest(hooks);

  hooks.beforeEach(function() {
    /**
     * We need to patch the store on the serializer because of:
     * https://emberjs.com/api/ember-data/2.16/classes/DS.JSONSerializer/properties/store?anchor=store&show=inherited%2Cprotected%2Cprivate%2Cdeprecated
     *
     * Theoretically consumers may have multiple stores, so we allow them to override this store implementation although
     * in practice most people only have one store.
     *
     * @param dasherizedSerializerName
     * @param store
     */
    this.serializer = function(dasherizedSerializerName, store = null) {
      let serializer = this.owner.lookup(`serializer:${dasherizedSerializerName}`);
      serializer.store = store || this.store();
      return serializer;
    }
  });
}

export { setupStoreTest, setupSerializerTest };
