// simple-todos.js
Task = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function () {
      return Task.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    'submit .new-task': function (event) {
      // This function is called when the new task form is submitted

      var text = event.target.text.value;

      Task.insert({
        text: text,
        createdAt: new Date() // Current time
      });

      // Clear form
      event.target.text.value = '';

      // Prevent default form submit
      return false;
    },
    'click .toggle-checked': function () {
      // Set the checked property to the opposite of its current value
      Task.update(this._id, {$set: {checked: ! this.checked}})
    },
    'click .delete': function () {
      Task.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
