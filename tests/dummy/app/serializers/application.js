import DS from 'ember-data';

const { JSONSerializer } = DS;

export default JSONSerializer.extend({
  serializeHasMany(snapshot, json, relationship) {
    if (relationship.key === 'pets') {
      json.pets = snapshot.hasMany('pets', { includeIds: true }).map((a) => a.id);
    }
  }
});
