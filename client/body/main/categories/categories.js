Template.categories.viewmodel({
  share: 'categories',
  onUrl: 'selectedCategory',
  categories: function() {
  	//console.log(Categories.count() )
    return Categories.find( {}, { sort: { name: 1 } } );
  },
  newCategory: '',
  addNewCategory: function() {
    var self = this;
    if (!self.newCategory()) return;
    Categories.insert({ name: this.newCategory() }, function(err, id) {
      if (err) {
        toastr.error("Could not create the category: <br>" + err.reason);
      } else {
        self.selectedCategory(id);
        self.newCategory(null);
      }
    });
  },
  addTitle: function() {
    return "Add category: " + this.newCategory();
  }
});