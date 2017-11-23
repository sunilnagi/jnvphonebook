Template.editContact.viewmodel({
  mixin: 'email',
  share: ['categories', 'edited'],
  onRendered: function() {
    var that = this;
    if (this._id()) {
      this.load( Contacts.findOne(this._id()) );
    } else {
      this.categoryId( this.selectedCategory() );
    }
    this.categoriesDropdown.dropdown('set selected', this.categoryId());

    this.categoriesDropdown.on('change', function(e) { that.categoryId(e.target.value) })
  },
  cardViewModel: function() {
    return this;
  },
  _id: '',
  name: '',
  number: '',
  job: '',
  jobLocation:'',
  address:'',
  categoryId: '',
  categories: function () {
    return Categories.find();
  },
  upsertText: function () {
    return this._id() ? "Update Information" : "Create Contact";
  },
  canUpsert: function () {
    return this.name() && this.number() && this.job() && this.jobLocation() && this.address() && this.categoryId();
  },
  upsert: function () {
  	console.log("in upsert");
    var self = this;
    if (!self.canUpsert()) {
    	console.log("cannot update");
      return;
    }
    var contact = {
      name: this.name(),
      number: this.number(),
      job: this.job(),
      jobLocation: this.jobLocation(),
      address: this.address(),
      categoryId: this.categoryId()
    };
	console.log("contact",contact);
    if (self._id()) {
    	console.log("updating");
      Contacts.update(self._id(), {$set: contact}, function (err) {
        if (err) {
          toastr.error("Could not update contact:<br>" + err.reason);
        }
      });
    } else {
      Contacts.insert(contact, function (err, id) {
      	console.log("creating");
        if (err) {
          toastr.error("Could not create contact:<br>" + err.reason);
        } else {
          self._id(id);
        }
      });
    }
  },
  uploaderEvents: function() {
    return {
      finished: function (index, fileInfo, templateContext) {
        var id = templateContext.data.formData._id;
        Contacts.update( id, { $set: { imageFile: fileInfo.name }, $inc: { imageVersion: 1 } }, function(err) {
          if (err) {
            toastr.error("Could not update contact:<br>" + err.reason);
          }
        });
      }
    };
  },
  uploaderData: function() {
    return {
      _id: this._id()
    };
  }
});
