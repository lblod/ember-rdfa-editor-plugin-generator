ember-rdfa-editor-plugin-generator
==============================================================================

Addon to simplify the creation of a plugin for [https://github.com/lblod/ember-rdfa-editor](ember-rdfa-editor).

This package assumes you follow these conventions:
 - package name: ember-rdfa-editor-*your-name*-plugin
 - package scope: @lblod (to be added to your package name in `package.json` and `index.js`)
 - no default blueprint has been defined (yet) in your plugin
 
Usage:
------------------------------------------------------------------------------

#### create an addon
```
ember addon ember-rdfa-editor-your-name-plugin
```
#### add the package scope to index.js and package.json
```
emacs
```
#### install this addon
```
ember install @lblod/ember-rdfa-editor-plugin-generator
```
#### generate the plugin scaffold
```
ember g editor-plugin your-name
```


## Plugin development
The following - generated - files should be modified to your liking:

#### `blueprints/@lblod/ember-rdfa-editor-your-name-plugin/index.js` 
This is a default blueprint which will add your plugin to the configured profile when it's installed

#### `addon/services/rdfa-editor-your-name-plugin.js` 
The service providing hints to the editor, the execute task will be called when the content of the editor is updated. 

#### `addon/components/editor-plugins/your-name-card.js` and `addon/templates/components/editor-plugins/your-name-card.hbs` 
These components handle the display of hints and perform the necessary actions when they are triggered (eg applying the hint in the editor)

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-rdfa-editor-plugin-generator`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
