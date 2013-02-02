PostFilter = Backbone.Model.extend({
	initialize: function(e) {
		var skills = e.skills.values;
		skills.forEach(function(s) {
		});
	}
});

Account = Backbone.Model.extend({
});

Post = Backbone.Model.extend({
	initialize: function() {
		this.keywords = this.attributes.content.split(' ');
		this.titleKeys = this.attributes.title.split(' ');

		// @TODO set model values based on data passed from ajax rss reply
	}
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