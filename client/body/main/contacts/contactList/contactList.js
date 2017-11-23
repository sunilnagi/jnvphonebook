Template.contactList.viewmodel({
	share : ['search', 'categories'],
	onRendered : function() {
		this.showSearch(true);
	},
	onDestroyed : function() {
		this.showSearch(false);
	},
	searchObject : function() {
		var searchObject = {};
		if (this.searchText()) {
			var r = new RegExp(".*" + this.searchText() + ".*", "i");
			searchObject['$or'] = [{
				name : r
			}, {
				job : r
			}, {
				jobLocation : r
			}, {
				address : r
			}];
		}
		return searchObject;
	},
	contacts : function() {
		var find = this.searchObject();
		var categoryId = this.selectedCategory();
		if (categoryId) {
			find.categoryId = categoryId.toString();
		}
		console.log(find);
		var cont = Contacts.find(find, {
			sort : {
				name : 1
			}
		}).map(function(document, index) {
			document.index = index +1;
			return document;
		});
	return cont;
	}
});
