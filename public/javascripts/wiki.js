$(document).ready(function(){

  // Event handler for search bar
  // On keyup, send ajax request to wikipedia api
  // 
  rivets.bind($('#search-results'), {searchResults: searchResults});

});

var searchResults = {
  results: []
};

var search = _.debounce( function() {
  input = $("#search-input")[0].value;
  if(input.length > 2){
    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      data: { action: 'query', list: 'search', srsearch: input, format: 'json' },
      dataType: 'jsonp',
      success: function (res) {
        searchResults.results = res.query.search;
      }
    });
  }
}, 500);

function goToLink(params){
  window.location.href = "http://en.wikipedia.org/wiki/" + params.text.trim();
}

// rivets
rivets.configure({
  // Attribute prefix in templates
  prefix: 'rv',
  // Preload templates with initial data on bind
  preloadData: true,
  // Root sightglass interface for keypaths
  rootInterface: '.',
  // Template delimiters for text bindings
  templateDelimiters: ['{', '}'],
  // Alias for index in rv-each binder
  iterationAlias : function(modelName) {
    return '%' + modelName + '%';
  },
  // Augment the event handler of the on-* binder
  handler: function(target, event, binding) {
    this.call(target, event, binding.view.models)
  },
  // Since rivets 0.9 functions are not automatically executed in expressions. If you need backward compatibilty, set this parameter to true
  executeFunctions: false
});