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
    const config = getOwner(this).resolveRegistration('config:environment');
  },

  /**
   * task to handle the incoming events from the editor dispatcher
   *
   * @method execute
   *
   * @param {string} hrId Unique identifier of the event in the hintsRegistry
   * @param {Array} rdfaBlocks RDFa blocks giving the context of the text snippets the event applies on
   * @param {Object} hintsRegistry Registry of hints in the editor
   * @param {Object} editor The RDFa editor instance
   *
   * @public
   */
  execute: task(function * (hrId, rdfaBlocks, hintsRegistry, editor) {
    if (rdfaBlocks.length === 0) return [];

    const hints = [];
    /* --- Detect relevant rdfa block --- */
    rdfaBlocks.forEach((rdfaBlock) => {
      let relevantRdfaBlock = this.detectRelevantRdfaBlock(rdfaBlock);
      if (relevantRdfaBlock) {
        hintsRegistry.removeHintsInRegion(rdfaBlock.region, hrId, this.get('who'));
        hints.pushObjects(this.generateHintsForRdfaBlock(rdfaBlock));
      }
    });
    /* --- Or get rich nodes matching with condition --- */
    const uniqueRichNodes = editor.findUniqueRichNodes(rdfaBlocks, { typeof: 'http://data.vlaanderen.be/ns/besluit#Besluit' });
    uniqueRichNodes.forEach((richNode) => {
      hintsRegistry.removeHintsInRegion([richNode.start, richNode.end], hrId, this.get('who'));
      hints.pushObjects(this.generateHintsForRichNode(richNode));
    });
    /* --- End --- */

    const cards = hints.map( (hint) => this.generateCard(hrId, hintsRegistry, editor, hint));
    if(cards.length > 0){
      hintsRegistry.addHints(hrId, this.get('who'), cards);
    }
  }),

  /**
   * Given a rdfa block, tries to detect a block the plugin can work on
   *
   * @method detectRelevantRdfaBlock
   *
   * @param {Object} rdfaBlock Text snippet at a specific location with an RDFa context
   *
   * @return {String} URI of rdfa block if found, else empty string.
   *
   * @private
   */
  detectRelevantRdfaBlock(rdfaBlock) {
    return rdfaBlock.text.toLowerCase().indexOf('hello') >= 0;
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
  normalizeLocation(location, reference) {
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
  generateCard(hrId, hintsRegistry, editor, hint) {
    return EmberObject.create({
      info: {
        label: this.get('who'),
        plainValue: hint.text,
        htmlString: '<b>hello world</b>',
        location: hint.location,
        hrId, hintsRegistry, editor
      },
      location: hint.location,
      card: this.get('who')
    });
  },

  /**
   * Generates a hint, given a rdfa block
   *
   * @method generateHintsForRdfaBlock
   *
   * @param {Object} rdfaBlock Text snippet at a specific location with an RDFa context
   *
   * @return {Object} [{dateString, location}]
   *
   * @private
   */
  generateHintsForRdfaBlock(rdfaBlock) {
    const hints = [];
    const index = rdfaBlock.text.toLowerCase().indexOf('hello');
    const text = rdfaBlock.text.slice(index, index+5);
    const location = this.normalizeLocation([index, index + 5], rdfaBlock.region);
    hints.push({text, location});
    return hints;
  },

  /**
   * Generates a hint, given a rich node
   *
   * @method generateHintsForRichNode
   *
   * @param {Object} richNode A rich node matching with our conditions
   *
   * @return {Object} [{dateString, location}]
   *
   * @private
   */
  generateHintsForRichNode(richNode) {
    const hints = [];
    const uri = richNode.rdfaAttributes.resource;
    hints.push({
      typeof: richNode.rdfaAttributes.typeof,
      location: richNode.region,
      uri
    });
    return hints;
  }
});

RdfaEditor<%= classifiedModuleName %>Plugin.reopen({
  who: 'editor-plugins/<%= dasherizedModuleName %>-card'
});
export default RdfaEditor<%= classifiedModuleName %>Plugin;
