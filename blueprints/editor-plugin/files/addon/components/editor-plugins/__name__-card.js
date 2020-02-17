import Component from '@ember/component';
import layout from '../../templates/components/editor-plugins/<%= dasherizedModuleName %>-card';
import { action } from '@ember/object';

/**
* Card displaying a hint of the Date plugin
*
* @module editor-<%= dasherizedModuleName %>-plugin
* @class <%= classifiedModuleName %>Card
* @extends Ember.Component
*/

export default class Card extends Component {
  get layout() {
    return layout;
  }

  /**
   * Region on which the card applies
   * @property location
   * @type [number,number]
   * @private
  */
  get location() {
    return info.location;
  }

  /**
   * Unique identifier of the event in the hints registry
   * @property hrId
   * @type Object
   * @private
  */
  get hrId() {
    return info.hrId;
  }

  /**
   * The RDFa editor instance
   * @property editor
   * @type RdfaEditor
   * @private
  */
  get editor(){
    return info.editor;
  }

  /**
   * Hints registry storing the cards
   * @property hintsRegistry
   * @type HintsRegistry
   * @private
  */
  get hintsRegistry() {
    return info.hintsRegistry;
  }

  @action
  insert() {
    this.get('hintsRegistry').removeHintsAtLocation(this.get('location'), this.get('hrId'), 'editor-plugins/<%= dasherizedModuleName %>-card');
    const mappedLocation = this.get('hintsRegistry').updateLocationToCurrentIndex(this.get('hrId'), this.get('location'));
    this.get('editor').replaceTextWithHTML(...mappedLocation, this.get('info').htmlString);
  }

}
