Meteor.publish('main', function(){
  return [
   Categories.find({ }),
   Contacts.find({ })
  ];
});