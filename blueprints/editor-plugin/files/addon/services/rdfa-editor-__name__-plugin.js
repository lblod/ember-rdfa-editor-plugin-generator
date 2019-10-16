import { getOwner } from '@ember/application';
import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import { task } from 'ember-concurrency';

/**
 * Service responsible for correct annotation of dates
 *
 * @module editor-<%= dasherizedModuleName %>-plugin
 * @class RdfaEditor<%= classifiedModuleName %>Plugin
 * @constructor
 * @extends EmberService
 */
const RdfaEditor<%= classifiedModuleName %>Plugin = Service.extend({

  init(){
    this._super(...arguments);
    getOwner(this).resolveRegistration('config:environment');
    this.set('keyword', 'hello');
    this.set('relevantRdfType', 'http://xmlns.com/foaf/0.1/Person');
  },

  /**
   * task to handle the incoming events from the editor dispatcher
   *
   * @method execute
   *
   * @param {string} hrId Unique identifier of the event in the hintsRegistry
   * @param {Array} contexts RDFa contexts of the text snippets the event applies on
   * @param {Object} hintsRegistry Registry of hints in the editor
   * @param {Object} editor The RDFa editor instance
   *
   * @public
   */
  execute: task(function * (hrId, contexts, hintsRegistry, editor) {
    const hints = [];
    contexts
      .filter(this.detectRelevantContext)
      .forEach(context => {
        hintsRegistry.removeHintsInRegion(context.region, hrId, this.get('who'));
        hints.pushObjects(this.generateHintsForContext(context));
      });

    const cards = hints.map( (hint) => this.generateCard(hrId, hintsRegistry, editor, hint));
    if(cards.length > 0){
      hintsRegistry.addHints(hrId, this.get('who'), cards);
    }
  }),

  /**
   * Given context object, tries to detect a context the plugin can work on
   *
   * @method detectRelevantContext
   *
   * @param {Object} context Text snippet at a specific location with an RDFa context
   *
   * @return {String} URI of context if found, else empty string.
   *
   * @private
   */
  detectRelevantContext(context){
    return this.detectKeywordInContext(context);
  },

  /**
   * Given context object, tries to detect a keyword in it
   *
   * @method detectKeywordInContext
   *
   * @param {Object} context Text snippet at a specific location with an RDFa context
   *
   * @private
   */
  detectKeywordInContext(context){
    return context && context.text.toLowerCase().indexOf(this.keyword) >= 0;
  },

  /**
   * Given context object, checks if the context is of a given type
   *
   * @method detectContextOfRdfType
   *
   * @param {Object} context Text snippet at a specific location with an RDFa context
   *
   * @private
   */
  detectContextOfRdfType(context){
    const lastTriple = context.context.slice(-1)[0];
    return lastTriple.predicate === 'a' &&
           lastTriple.object === this.relevantRdfType;
  },

  /**
   * Maps location of substring back within reference location
   *
   * @method normalizeLocation
   *
   * @param {[int,int]} [start, end] Location withing string
   * @param {[int,int]} [start, end] reference location
   *
   * @return {[int,int]} [start, end] absolute location
   *
   * @private
   */
  normalizeLocation(location, reference){
    return [location[0] + reference[0], location[1] + reference[0]];
  },

  /**
   * Generates a card given a hint
   *
   * @method generateCard
   *
   * @param {string} hrId Unique identifier of the event in the hintsRegistry
   * @param {Object} hintsRegistry Registry of hints in the editor
   * @param {Object} editor The RDFa editor instance
   * @param {Object} hint containing the hinted string and the location of this string
   *
   * @return {Object} The card to hint for a given template
   *
   * @private
   */
  generateCard(hrId, hintsRegistry, editor, hint){
    return EmberObject.create({
      info: {
        label: this.get('who'),
        plainValue: hint.text,
        htmlString: '<b>hello world</b>',
        location: hint.location,
        typeof: this.relevantRdfType,
        hrId, hintsRegistry, editor
      },
      location: hint.location,
      card: this.get('who')
    });
  },

  /**
   * Generates a hint, given a context
   *
   * @method generateHintsForContext
   *
   * @param {Object} context Text snippet at a specific location with an RDFa context
   *
   * @return {Object} [{dateString, location}]
   *
   * @private
   */
  generateHintsForContext(context){
    const hints = [];
    const index = context.text.toLowerCase().indexOf(this.keyword);
    const text = context.text.slice(index, index + this.keyword.length);
    const location = this.normalizeLocation([index, index + this.keyword.length], context.region);
    hints.push({text, location});
    return hints;
  }
});

RdfaEditor<%= classifiedModuleName %>Plugin.reopen({
  who: 'editor-plugins/<%= dasherizedModuleName %>-card'
});
export default RdfaEditor<%= classifiedModuleName %>Plugin;
