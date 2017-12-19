import { module, test } from 'qunit';
import { setupSerializerTest } from 'ember-data-test-helpers';
import { run } from '@ember/runloop';

module('application:pet', 'Unit | Serializer | application', function(hooks) {
  setupSerializerTest(hooks);

  test('this.serializer returns a serializer that can be tested', function(assert) {
    let store = this.store();
    let serializer = this.serializer('application');

    let model = run(() => store.createRecord('store', { name: 'spot' }));
    let petA = run(() => store.createRecord('pet', { id: 3, name: 'spot' }));
    let petB = run(() => store.createRecord('pet', { id: 10, name: 'spot' }));
    run(() => model.set('pets', [petA, petB]));

    let snapshot = this.createSnapshot(model);


    let json = {};
    let relationship;
    snapshot.eachRelationship((name, rel) => {
      if (name === 'pets') {
        relationship = rel;
      }
    });

    serializer.serializeHasMany(snapshot, json, relationship);

    assert.deepEqual(json, {
      'pets': [
        '3',
        '10'
      ]
    }, 'We can call serializer.serializeHasMant directly');
  });


  test('Who needs the store and service APIs anyways... the snapshot ones are useful though', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = this.owner.factoryFor('serializer:application').create({ store });

    let model = run(() => store.createRecord('store', { name: 'spot' }));
    let petA = run(() => store.createRecord('pet', { id: 3, name: 'spot' }));
    let petB = run(() => store.createRecord('pet', { id: 10, name: 'spot' }));
    run(() => model.set('pets', [petA, petB]));

    let snapshot = this.createSnapshot(model);


    let json = {};
    let relationship;
    snapshot.eachRelationship((name, rel) => {
      if (name === 'pets') {
        relationship = rel;
      }
    });

    serializer.serializeHasMany(snapshot, json, relationship);

    assert.deepEqual(json, {
      'pets': [
        '3',
        '10'
      ]
    }, 'We can call serializer.serializeHasMant directly');
  });
});
