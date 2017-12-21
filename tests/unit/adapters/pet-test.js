import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupStoreTest } from 'ember-data-test-helpers';
import { run } from '@ember/runloop';

module('adapters:pet', 'Unit | Adapter | pet', function(hooks) {
  setupTest(hooks);
  setupStoreTest(hooks);

  test('this.store, and this.createSnapshot', function(assert) {
    let model = run(() => this.data.store.createRecord('pet', { name: 'spot' }));
    let options = { adapterOptions: { user_id: 25 } };
    let snapshot = this.data.createSnapshot(model, options);
    let adapter = this.owner.lookup('adapter:pet');

    let url = adapter.urlForFindRecord(1, 'pet', snapshot);
    assert.equal(url, `/user/${options.adapterOptions.user_id}/pets/${1}`);
  });
});
