App = Backbone.Router.extend({
	routes: {
		'':'index',
		'cat/:cat':'cat',
		'accounts':'accounts',
	},
	initialize: function () {
		this.settings = settings;
		this.setInitSettings();
		this.buildInitView();
	},
	setInitSettings: function() {
		var category = this.settings.defaults.category;
		var location = this.settings.defaults.location;
		var loadNumber = this.settings.defaults.loadNum;

		this.cat = new Category(category);
		this.rssURL = new RSSURL({location: location, category: category});
		this.loadNumber = new Counter(loadNumber);
	},
	buildInitView: function() {
		this.contentView = new ContentView();
		this.header = new HeaderView();
		this.accounts = new Accounts();
		this.posts = new Posts();
		this.postsList = new PostsList();
		this.renderNav();
		this.setListeners();
		Backbone.history.start({pushState: false});
	},
	index: function() {
		this.postsList.$el.show();
		this.setRSS('jjj');
		this.on('bottom-reached',this.beginLoad);
	},
	cat: function(c) {
		this.postsList.$el.show();
		if(this.postsList.$el.masonry()) {
			this.postsList.$el.masonry('destroy');
		}
		this.setRSS(c);
		this.on('bottom-reached',this.beginLoad);
	},
	accounts: function() {
		this.off('bottom-reached', this.beginLoad)
		this.postsList.$el.hide();
		console.log('rendering accounts...');
		console.log(this.accounts);
	},
	setRSS: function(c) {
		var l = this.settings.location;
		this.rssURL = new RSSURL({location: l, category: c});
		this.listenTo(this.rssURL, 'change', this.fetchData);
		this.rssURL.setValue();
	},
	navToCat: function(c) {
		this.posts = new Posts();
		this.cat.set({'value':c});
		this.postsList.$el.html('');
		this.navigate('cat/' + this.cat.get('value'), {trigger: true});
	},
	checkBottom: function() {
		if($(window).scrollTop() === $(document).height() - $(window).height()) {
			this.trigger('bottom-reached');
		}
	},
	beginLoad: function() {
		var loaderView = new LoaderView().$el;
		this.contentView.$el.append(loaderView);
		newNum = this.loadNumber.get('count') + 100;
		this.loadNumber.set({count:newNum});
	},
	renderNav: function() {
		this.nav = new NavView();
		this.nav.listView.render(this.settings.jobCategories);
	},
	fetchData: function () {
		console.log('fetching feeds...');

		var self = this;

		var protocol = document.location.protocol;
		var googleFeedBase = "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num="
		var interval = this.loadNumber.get('count');
		var url = self.rssURL.attributes.value;
		var callback = '&q=' + encodeURIComponent(url);

		var googleFeedLoader = protocol + googleFeedBase + interval + callback;
		console.log(googleFeedLoader);
		$.ajax({
			url: googleFeedLoader,
			dataType: 'jsonp',
			success: function(data) {
				console.log(data);
				if(data.responseData.feed.length != 0) {
					self.setData(data.responseData.feed);
					console.log('Feed dataset has been added');
				} else {
					console.log('no feed items have been selected');
				}
			},
			error: function() {
				console.log('feed data could not be retrieved. check the rss url');
			}
		});
	},
	setData: function (feed) {
		self = this;
		feed.entries.forEach(function(el) {
			self.posts.add(el);
		});
		this.filterData();
	},
	filterData: function() {
		this.posts.filter(this.accounts.models);
	},
	setListeners: function() {
		this.listenTo(this.posts,'data-filtered', this.renderPosts);
		this.listenTo(this.nav.listView,'category-clicked', this.navToCat);
		this.listenTo(this.header, 'open-nav-request', this.nav.open);
		this.listenTo(this.loadNumber,'change', this.loadMore);
	},
	renderPosts: function() {
		this.postsList.renderPosts(this.posts, this.loadNumber.get('count'));
		$('.loading-gif').remove();
	},
	loadMore: function() {
		console.log('displaying next ' + this.loadNumber.get('count') + ' results.');
		this.fetchData();
	},
	addAccount: function(profile) {
	    window.CApp.accounts.add({profile: profile.values[0],network:'linkedin'});
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