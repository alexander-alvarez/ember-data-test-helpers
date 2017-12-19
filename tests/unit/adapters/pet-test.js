import { module, test } from 'qunit';
import { setupStoreTest } from 'ember-data-test-helpers';
import { run } from '@ember/runloop';

module('adapters:pet', 'Unit | Adapter | pet', function(hooks) {
  setupStoreTest(hooks);

  test('this.store, and this.createSnapshot', function(assert) {
    let store = this.store();
    let model = run(() => store.createRecord('pet', { name: 'spot' }));
    let options = { adapterOptions: { user_id: 25 } };
    let snapshot = this.createSnapshot(model, options);
    let adapter = this.owner.lookup('adapter:pet');

    let url = adapter.urlForFindRecord(1, 'pet', snapshot);
    assert.equal(url, `/user/${options.adapterOptions.user_id}/pets/${1}`);
  });
});
