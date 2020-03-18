import Service from '@ember/service';

/**
 * Service responsible for correct annotation of dates
 *
 * @module editor-<%= dasherizedModuleName %>-plugin
 * @class RdfaEditor<%= classifiedModuleName %>Plugin
 * @constructor
 * @extends EmberService
 */
export default class RdfaEditor<%= classifiedModuleName %>Plugin extends Service {

  who = 'editor-plugins/<%= dasherizedModuleName %>-card'

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
      hintsRegistry.removeHintsInRegion(rdfaBlock.region, hrId, this.who);

      let idx = rdfaBlock.text.toLowerCase().indexOf('hello');
      if( idx !== -1 ) {
        // the hintsregistry needs to know the location with respect to the document
        const absoluteLocation = this.normalizeLocation( [idx, idx + 'hello'.length], rdfaBlock.region );

        hints.push( {
          // info for the hintsRegistry
          location: absoluteLocation,
          card: this.who,
          // any content you need to render the component and handle its actions
          info: {
            hrId, hintsRegistry, editor,
            location: absoluteLocation
          }
        });
      }
    }
    <%= "TODO: document editor.findUniqueRichNodes and reference editor docs" && "" %>
    hintsRegistry.addHints(hrId, this.who, hints);
  }

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
  }
}
