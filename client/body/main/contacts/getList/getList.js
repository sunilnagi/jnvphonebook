Template.getList.viewmodel({
	
	share : ['categories', 'edited'],
	
	getListText : function() {
		console.log('Template.getList.viewmodel')
		return "Update List from Server";
	},
	getListFromServer : function() {
		Meteor.call('getAll', '', function(err, res) {
			// The method call sets the Session variable to the callback value
			if (err) {
				//Session.set('location', {error: err});
			} else {
				//console.log(res)
				return res;
			}
		});
	}
});
