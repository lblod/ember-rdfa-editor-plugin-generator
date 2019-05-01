ember-rdfa-editor-plugin-generator
==============================================================================

Addon to simplify the creation of a plugin for [https://github.com/lblod/ember-rdfa-editor](ember-rdfa-editor).

This package assumes you follow these conventions:
 - package name: ember-rdfa-editor-*your-name*-plugin
 - package scope: @lblod (to be added to your package name in `package.json` and `index.js`)
 - no default blueprint has been defined (yet) in your plugin
 
Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Usage
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
See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
