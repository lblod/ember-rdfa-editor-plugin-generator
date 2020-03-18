import Service from '@ember/service';
import normalizeLocation from '../utils/normalize-location';

/**
 * Service responsible for correct annotation of dates
 *
 * @module editor-<%= dasherizedModuleName %>-plugin
 * @class RdfaEditor<%= classifiedModuleName %>Plugin
 * @constructor
 * @extends EmberService
 */
export default class RdfaEditor<%= classifiedModuleName %>Plugin extends Service {

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
  execute(hrId, rdfaBlocks, hintsRegistry, editor) {
    if (rdfaBlocks.length === 0) return [];

    const hints = [];

    for( const rdfaBlock of rdfaBlocks ){
      hintsRegistry.removeHintsInRegion(rdfaBlock.region, hrId, "<%= /*HINT_SCOPE*/ dasherizedModuleName %>-scope");

      let idx = rdfaBlock.text.toLowerCase().indexOf('hello');
      if( idx !== -1 ) {
        // the hintsregistry needs to know the location with respect to the document
        const absoluteLocation = normalizeLocation( [idx, idx + 'hello'.length], rdfaBlock.region );

        hints.push( {
          // info for the hintsRegistry
          location: absoluteLocation,
          card: "<%= /*HINT_CARD_NAME*/ `editor-plugins/${dasherizedModuleName}-card` %>",
          // any content you need to render the component and handle its actions
          info: {
            hrId, hintsRegistry, editor,
            location: absoluteLocation,
          }
        });
      }
    }
    <%= "TODO: document editor.findUniqueRichNodes and reference editor docs" && "" %>
    hintsRegistry.addHints(hrId, "<%= /*HINT_SCOPE*/ dasherizedModuleName %>-scope", hints);
  }
}
