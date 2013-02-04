Posts = Backbone.Collection.extend({
	model: Post,
	comparator: function(p) {
		return p.get('matches');
	},
	filter: function(f) {

		// @TODO Implement filter method
		self = this;
		matches = 0;
		f.forEach(function(n) {
			skills = n.attributes.profile.skills.values;
			for(i in skills) {
				var skillName = skills[i].skill.name;
				for(v in self.models) {
					var kwds = self.models[v].keywords;
					for(k in kwds) {
						if(skillName == kwds[k]) {
							currMatch = self.models[v].get('matches');
							self.models[v].set({matches: currMatch+1});
							self.models[v].matched.push(skillName);
						}
						else {
							//console.log(skillName + '!=' + kwds[k]);
						}
					}
				}
			}
		});
		this.sort();
		this.trigger('data-filtered');
	}
});

Accounts = Backbone.Collection.extend({
	model: Account
});