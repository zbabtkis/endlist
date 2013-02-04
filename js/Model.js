Account = Backbone.Model.extend({
});

Post = Backbone.Model.extend({
	initialize: function() {
		keywords = this.attributes.content.split(/[-\(\)\/,\s]+/);
		titleKeys = this.attributes.title.split(/[-\(\)\/,\s]+/);
		this.keywords = keywords.concat(titleKeys);
		this.set('matches', 0);
		this.matched = [];
	},
});

Counter = Backbone.Model.extend({
	initialize: function(count) {
		this.set({count:count});
	}
});

Category = Backbone.Model.extend({
	initialize: function(cat) {
		this.set({value:cat});
	}
});

RSSURL = Backbone.Model.extend({
	setValue: function() {
		this.set('value', 'http://' + this.attributes.location + '.craigslist.org/' + this.attributes.category + '/index.rss');
	}
});