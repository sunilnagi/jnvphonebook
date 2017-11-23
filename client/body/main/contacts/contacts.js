Template.contacts.viewmodel({
  share: ['search', 'categories', 'edited'],
  onUrl: ['getListMode', '_id'],
  vmTag: 'contacts',
  getListText:  function() {
    return "UPDATE LIST FROM SERVER";
  },
  getContactHeading: function() {
    return "Contacts (" + this.selectedCategory() + ")";
  },
 
  showContacts: function() {
    this._id('');
    this.getListMode(false);
  },
  
  getListMode: function(x) {
    console.log('getting into getListMode', x);
    
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
