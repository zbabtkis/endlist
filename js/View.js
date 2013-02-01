$(function () {
	var settings = {
		jobCategories: [
			{title: 'accounting & finance', addr: 'acc'},
			{title: 'admin & office', addr: 'ofc'},
			{title: 'architecture & engineering', addr: 'egr'},
			{title: 'art, media & design', addr: 'med'},
			{title: 'biotech & science', addr: 'sci'},
			{title: 'business & management', addr: 'bus'},
			{title: 'customer service', addr: 'csr'},
			{title: 'education', addr: 'edu'},
			{title: 'food beverage & hospitality', addr: 'fbh'},
			{title: 'general labor', addr: 'lab'},
			{title: 'government', addr: 'gov'},
			{title: 'human resources', addr: 'hum'},
			{title: 'internet engineers', addr: 'eng'},
			{title: 'legal, paralegal', addr: 'lgl'},
			{title: 'manufacturing', addr: 'mnu'},
			{title: 'marketing, advertizing & pr', addr: 'mar'},
			{title: 'medical health', addr: 'hea'},
			{title: 'nonprofit sector', addr: 'npo'},
			{title: 'real estate', addr: 'rej'},
			{title: 'retail wholesale', addr: 'ret'},
			{title: 'sales & business development', addr: 'sls'},
			{title: 'salon, spa & fitness', addr: 'spa'},
			{title: 'security', addr: 'sec'},
			{title: 'skilled trade & craft', addr: 'trd'},
			{title: 'software, QA & DBA', addr: 'sof'},
			{title: 'system networks', addr: 'sad'},
			{title: 'technical support', addr: 'tch'},
			{title: 'transportation', addr: 'trp'},
			{title: 'tv, film & radio', addr: 'tfr'},
			{title: 'web development & design', addr: 'web'},
			{title: 'writing and editing', addr: 'wri'},
			{title: 'other', addr: 'etc'},
		],
	};
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
			console.log(this);
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
			console.log(self.url);
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
			var uid = u.get('info').id;
			//this.nav.userIn(network);
			this.getLinkedInProfile(uid);
			//this.listenTo(this.nav.userView, 'linkedIn-logout', this.linkedInLogout);
		},
		getLinkedInProfile: function(uid) {
			console.log(this.accounts);
		},
		/*linkedInLogout: function() {
			IN.User.logout();
			this.user.destroy();
			this.user = new User();
			this.nav.userView.remove();
			alert('you have been logged out');
		}*/
	});
	
	Post = Backbone.Model.extend({
		initialize: function() {
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
	
	Posts = Backbone.Collection.extend({
		model: Post
	});
	
	PostsList = Backbone.View.extend({
		initialize: function () {
			this.$el = $('#content ul');
			this.$el.addClass('masonry');
		},
		renderPosts: function (posts, loadNumber) {
			// @TODO Render posts from collection into this.$el
			for(i = loadNumber -30; i < loadNumber; i++) {
				p = posts.models[i];
				console.log(p);
				post = new PostView(p.attributes);
				this.$el.append(post.$el);
			}
			this.$el.masonry({
				itemSelector: '.masonry-item',
				columnWidth: 240,
				animationOptions: {
			    	duration: 400
				},
				isAnimated: true,
				gutterWidth: 30,
				isResizable: true,
				isFitWidth: true
			});
			this.$el.masonry( 'reload' );
		}
	});
	
	PostView = Backbone.View.extend({
		tagName: 'li',
		className: 'masonry-item',
		initialize: function() {
			this.title = new PostTitle(this.options);
			this.content = new PostContent(this.options);
			this.$el.append(this.title.$el);
			this.$el.append(this.content.$el);
		}
	});
	
	PostTitle = Backbone.View.extend({
		tagName: 'h3',
		className: 'post-title',
		initialize: function() {
			this.$el.html('<a href="' + this.options.link + '">' + this.options.title + '</a>');
		}
	});
	
	PostContent = Backbone.View.extend({
		tagName: 'span',
		className: 'post-content',
		initialize: function() {
			this.$el.html(this.options.content);
		}
	});

	HeaderView = Backbone.View.extend({
		initialize: function() {
			this.$el = $('header');
			this.$el.append(new ButtonView().$el);
			this.$el.append(new TitleView({title: "endlist"}).$el);
		},
		events: {
			'click .toggle-nav': 'openNavRequest'
		},
		openNavRequest: function() {
			this.trigger('open-nav-request');
		}
	});

	TitleView = Backbone.View.extend({
		tagName: 'h1',
		className: 'site-title',
		initialize: function(v) {
			this.$el.html(v.title);
		}
	});

	ButtonView = Backbone.View.extend({
		tagName: 'div',
		className: 'toggle-nav',
		initialize: function() {
			this.$el.html('');
		}
	});

	LinkedInLoginView = Backbone.View.extend({
		tagName: 'script',
		attributes: function() {
			return {
				'type': 'IN/Login',
				'data-onAuth':'onLinkedInAuth',
			};
		},
	});
	
	NavView = Backbone.View.extend({
		initialize: function() {
			this.$el = $('nav');
			this.listView = new NavListView();
			this.$el.html(this.listView.$el);
			this.$el.prepend(new LinkedInLoginView().$el);
			nav = this;
		},
		open: function() {
			nav.$el.slideToggle('fast','easeOutQuad');
		},
		/*userIn: function(u) {
			this.userView = new UserView(u);
			nav.$el.prepend(this.userView.$el);
			this.userView.$el.slideDown('slow');
		}*/
	});

	NavListView = Backbone.View.extend({
		tagName: 'ul',
		render: function(c) {
			self = this;
			c.forEach(function(v){
				var link = new NavCategoryView({name:v.title, addr: v.addr});
				self.$el.append(link.$el);
			});
		},
		events: {
			'click li': 'goToCategory',
		},
		goToCategory: function(e) {
			addr = e.currentTarget.dataset.addr;
			this.trigger('category-clicked', addr);
		},
	});

	NavCategoryView = Backbone.View.extend({
		tagName: 'li',
		classAttributes: 'nav-category',
		attributes: function() {
			return {
				'data-addr': this.options.addr
			};
		},
		initialize: function() {
			console.log(this);
			this.$el.html(this.options.name);
		},
	});

	UserView = Backbone.View.extend({
		tagName: 'div',
		className: 'user',
		initialize: function(u) {
			this.$el.html('Hello, ' + u.name + '! ');
			logout = new UserLogout();
			this.$el.append(logout.$el);
		},
		events: {
			'click .user-logout':'logout',
		},
		logout: function() {
			this.trigger('linkedIn-logout');
		}
	});

	Account = Backbone.Model.extend({
	});

	Accounts = Backbone.Collection.extend({
		model: Account
	});

	UserLogout = Backbone.View.extend({
		tagName: 'a',
		attributes: function () {
			return {
				'href': '#',
				'class': 'user-logout'
			};
		},
		initialize: function() {
			this.$el.html('logout')
		}
	});

	window.CApp = new App();
	$(window).on('scroll', function() {
		window.CApp.checkBottom();
	});
});