Posts = Backbone.Collection.extend({
	model: Post,
	filter: function(f) {

		/** @TODO Implement filter method

		/*skills = f[0].attributes.skills.values;
		console.log('hello');
		self = this;
		for(i in skills) {
			console.log('there');
			var skillName = skills[i].skill.name;
			for(v in skillName) {
				//var kwds = f.models[v].keywords;
				console.log(self);
				for(k in kwds) {
					if(skillName[i] == kwds[k]) {
						console.log(skillName[i] + '==' + kwds[k]);
					}
					else {
						console.log(skillName[i] + '!=' + kwds[k]);
					}
				}
			}
		}*/
	}
});

Accounts = Backbone.Collection.extend({
	model: Account
});