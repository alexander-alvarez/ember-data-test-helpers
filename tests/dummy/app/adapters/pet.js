import DS from 'ember-data';

export default DS.RESTAdapter.extend({

  urlForFindRecord(id, modelName, snapshot) {
    let baseUrl = this.buildURL();
    return `${baseUrl}/user/${snapshot.adapterOptions.user_id}/pets/${id}`;
  }
});
