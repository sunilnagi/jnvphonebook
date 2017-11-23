Meteor.startup(function() {
	UploadServer.init(Server.upload.init);
	var cat = [{_id:'1993', name:'Batch 1993'},
		{_id:'1994', name:'Batch 1994'},
		{_id:'1995', name:'Batch 1995'},
		{_id:'1996', name:'Batch 1996'},
		{_id:'1997', name:'Batch 1997'},
		{_id:'1998', name:'Batch 1998'},
		{_id:'1999', name:'Batch 1999'},
		{_id:'2000', name:'Batch 2000'},
		{_id:'2001', name:'Batch 2001'},
		{_id:'2002', name:'Batch 2002'},
		{_id:'2003', name:'Batch 2003'},
		{_id:'2004', name:'Batch 2004'},
		{_id:'2005', name:'Batch 2005'},
		{_id:'2006', name:'Batch 2006'},
		{_id:'2007', name:'Batch 2007'},
		{_id:'2008', name:'Batch 2008'},
		{_id:'2009', name:'Batch 2009'},
		{_id:'2010', name:'Batch 2010'},
		{_id:'2011', name:'Batch 2011'},
		{_id:'2012', name:'Batch 2012'},
		{_id:'2013', name:'Batch 2013'},
		{_id:'2014', name:'Batch 2014'},
		{_id:'2015', name:'Batch 2015'},
		{_id:'2016', name:'Batch 2016'},
		{_id:'2017', name:'Batch 2017'}
		]
		
		for(i in cat){
			Categories.upsert({'_id': cat[i]._id}, cat[i], function(err, id) {
				console.log("creating category", i);
				if (err) {
					console.log("Could not create contact:<br>" + err.reason);
				} else {
					//self._id(id);
				}
			});
		}
});

Meteor.methods({
	// The method expects a valid IPv4 address
	'getAll' : function() {
		
		
		
		
		
		
		console.log('get all users');
		// Construct the API URL
		var apiUrl = 'http://jnvstars.com/list2';
		// query the API
		var response = HTTP.get(apiUrl).data;
		console.log(response);
		for (i in response) {
			response[i].categoryId = response[i].batch;
			Contacts.upsert({'_id': response[i]._id}, response[i], function(err, id) {
				console.log("creating", i);
				if (err) {
					console.log("Could not create contact:<br>" + err.reason);
				} else {
					//self._id(id);
				}
			});
		}

		return response;
	}
}); 