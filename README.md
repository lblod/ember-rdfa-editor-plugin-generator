# ember-rdfa-editor-plugin-generator

Addon to simplify the creation of a plugin for [https://github.com/lblod/ember-rdfa-editor](ember-rdfa-editor).

This package assumes you follow these conventions:
 - package name: ember-rdfa-editor-*your-name*-plugin
 - package scope: @lblod (to be added to your package name in `package.json` and `index.js`)
 - no default blueprint has been defined (yet) in your plugin

## Compatibility

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

## Getting started

  The generator helps you create new plugins.  This is the purest and simplest form of creating a new plugin.

### Create an addon

  Each plugin is an Ember addon.  We create a new Ember Addon for the new plugin.

    ember addon ember-rdfa-editor-your-name-plugin

### Add the package scope to package.json

  Generated plugins currently have to live under the @lblod namespace (send a PR or make an issue if that is a problem).

    emacs # (or your editor of choice)

### Install this addon

  Install the generator addon so the generator is available.

    ember install @lblod/ember-rdfa-editor-plugin-generator

### Generate the plugin scaffold

  Generate the scaffold

    ember g editor-plugin your-name

### Hack away

  Check the generated sources and find what you need to edit.

##### `blueprints/@lblod/ember-rdfa-editor-your-name-plugin/index.js`

  This is a default blueprint which will add your plugin to the configured profile when it's installed

##### `addon/services/rdfa-editor-your-name-plugin.js`

  The service providing hints to the editor, the execute task will be called when the content of the editor is updated.

##### `addon/components/editor-plugins/your-name-card.js` and `addon/templates/components/editor-plugins/your-name-card.hbs`

  These components handle the display of hints and perform the necessary actions when they are triggered (eg applying the hint in the editor)


## How To

### Automatically support multiple profiles

  The editor supports multiple profiles.  Each profile may have
  different plugins enabled.  When your plugin is installed it is
  added to the deafult profile automatically.  If you want your plugin
  to be added to multiple profiles, follow this how-to.

  In order to add the plugin to a new profile, we need to overwrite
  the index.js blueprint of your addon.  See
  `@lblod/ember-rdfa-editor-your-name-plugin/index.js`.

  Below the line adding your plugin to the 'default` set, add the
  plugin to a new key.  Because generators don't allow you to add the
  same line twice, you'll need to add a space at the end.  An example would be:

    await this.insertPluginNameAtKey("all", "rdfa-editor-your-name-plugin", " ");

  That's it!  When your plugin is added through `ember install` it
  will now be added to both the `default` and the `all` profiles.


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


# License

This project is licensed under the [MIT License](LICENSE.md).
