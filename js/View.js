PostsList = Backbone.View.extend({
	initialize: function () {
		this.$el = $('#content ul');
		this.$el.addClass('masonry');
	},
	renderPosts: function (posts, loadNumber) {
		// @TODO Render posts from collection into this.$el
		for(i = loadNumber -30; i < loadNumber; i++) {
			p = posts.models[i];
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
	userIn: function(u) {
		this.userView = new UserView(u);
		nav.$el.prepend(this.userView.$el);
		this.userView.$el.slideDown('slow');
	}
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
		this.$el.html(this.options.name);
	},
});

UserView = Backbone.View.extend({
	tagName: 'div',
	className: 'user',
	initialize: function(u) {
		this.$el.html('Hello, ' + u.attributes.firstName + '! ');
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


