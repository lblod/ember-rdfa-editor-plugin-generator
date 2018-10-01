/* eslint-env node */
module.exports = {
  description: 'Generates the scaffold for a ember-rdfa-editor plugin',

  afterInstall(options) {
    // Perform extra work here.
    this.addAddonToProject('ember-cli-release');
    this.addAddonToProject('ember-cli-update');
    return this.addAddonToProject('ember-concurrency');
  }
};
