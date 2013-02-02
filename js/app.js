App = Backbone.Router.extend({
	initialize: function () {
		this.cat = new Category('etc');
		this.accounts = new Accounts();
		this.settings = settings;
		console.log('initailized');
		this.posts = new Posts();
		this.header = new HeaderView();
		this.postsList = new PostsList();
		this.renderNav();
		this.loadNumber = new Counter(0);
		this.url = 'http://sfbay.craigslist.org/' + this.cat.get('value') + '/index.rss';

		this.setListeners();
		Backbone.history.start({pushState: true});
	},
	setUrl: function() {
		this.url = 'http://sfbay.craigslist.org/' + this.cat.get('value') + '/index.rss';
		if(this.postsList.$el) {
			this.postsList.$el.masonry('destroy');
			console.log('destoryed');
		}
		this.loadNumber.set({'count': 30})
		console.log('url is now: ' + this.url);
	},
	navToCat: function(c) {
		this.postsList.$el.html('');
		this.posts = new Posts();
		//console.log(this.accounts.models[0].attributes);
		this.posts.filter(this.accounts.models);
		this.cat.set({'value':c});
		this.navigate('cat/' + this.cat.get('value'), {trigger: true});
	},
	checkBottom: function() {
		if($(window).scrollTop() === $(document).height() - $(window).height()) {
			$('#content').append('<img class="loading-gif" src="css/img/359.gif" />');
			newNum = this.loadNumber.get('count') + 30;
			this.loadNumber.set({count:newNum});
		}
	},
	renderNav: function() {
		this.nav = new NavView();
		this.nav.listView.render(this.settings.jobCategories);
	},
	fetchData: function () {
		self = this;
		$.ajax({
			url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + this.loadNumber.get('count') + '&callback=?&q=' + encodeURIComponent(self.url),
			dataType: 'json',
			success: function(data) {
			  self.setData(data.responseData.feed);
			}
		});
	},
	setData: function (data) {
		self = this;
		data.entries.forEach(function(el) {
			self.posts.add(el);
		});
		this.trigger('feedsLoaded');
	},
	routes: {
		'':'index',
		'cat/:cat': 'setUrl',
	},
	setListeners: function() {
		this.listenTo(this,'feedsLoaded', this.renderPosts);
		this.listenTo(this.nav.listView,'category-clicked', this.navToCat);
		this.listenTo(this.header, 'open-nav-request', this.nav.open);
		this.listenTo(this.loadNumber,'change', this.loadMore);
		this.listenTo(this.accounts, 'add', this.login);
	},
	renderPosts: function() {
		skills = this.accounts.models[0].attributes.skills;
		this.relatedPosts = new PostFilter({posts: this.posts, skills: skills});
		this.postsList.renderPosts(this.posts, this.loadNumber.get('count'));
		$('.loading-gif').remove();
	},
	loadMore: function() {
		console.log('updated...');
		this.fetchData();
	},
	index: function() {
	},
	login: function(u) {
		var network = u.get('network');
		this.nav.userIn(u);
		this.getLinkedInProfile();
		this.listenTo(this.nav.userView, 'linkedIn-logout', this.linkedInLogout);
	},
	getLinkedInProfile: function() {
		this.loadNumber.set({count: 90});
	},
	linkedInLogout: function() {
		IN.User.logout();
		this.user.destroy();
		this.user = new User();
		this.nav.userView.remove();
		alert('you have been logged out');
	}
});
$(function(){
	window.CApp = new App();
	$(window).on('scroll', function() {
		window.CApp.checkBottom();
	});
});