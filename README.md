# ember-data-test-helpers

This addon provides several APIs to facilitate testing `ember-data` adapters, models, and serializers. 

These APIs are improvements that can now be introduced because of the progress introduced with [RFC-232] as of
[`ember-cli-qunit@4.2.0`](https://github.com/ember-cli/ember-cli-qunit/releases/tag/v4.2.0)

**API**

`import { setupStoreTest } from  'ember-data-test-helpers'`

`setupStoreTest(hooks)` configures:

 - `this.data.store` the default an instance of a `DS.Store`.
 
 - `this.data.createSnapshot(model, options)` -> returns a `DS.Snapshot` of the given `DS.Model` instance
 

## Installation

`ember install ember-data-test-helpers`

## Development

* `git clone git@github.com:alexander-alvarez/ember-data-test-helpers.git`
* `cd ember-data-test-helpers`
* `yarn install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

[RFC-232]: https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md
