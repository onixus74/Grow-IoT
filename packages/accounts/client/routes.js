// From: https://medium.com/@satyavh/using-flow-router-for-authentication-ba7bb2644f42#.vty74pkpy

// Routes in this group are public
let exposed = FlowRouter.group({});

exposed.route('/login', {
  name: 'LoginComponent',
  action(params, queryParams) {
    return BlazeLayout.render('MainLayoutComponent',
      {main: 'LoginComponent'});
  }
});

exposed.route('/register', {
  name: 'LoginComponent',
  action(params, queryParams) {
    return BlazeLayout.render('MainLayoutComponent',
      {main: 'LoginComponent'});
  }
});

exposed.route('/reset-password', {
  name: 'ResetPasswordComponent',
  action(params, queryParams) {
    return BlazeLayout.render('MainLayoutComponent',
      {main: 'ResetPasswordComponent'});
  }
});


// Redirect after login to original destination
Accounts.onLogin(function() {
  let redirect = Session.get('redirectAfterLogin');
  if (redirect != null) {
    if (redirect !== '/login') {
      return FlowRouter.go(redirect);
    }
  }
});

// Routes in this group are for logged in users. Unauthenticated users
// will be redirected to login / signup.
let loggedIn = FlowRouter.group({
 triggersEnter: [ function() {
   if (!Meteor.loggingIn() && !Meteor.userId()) {
     let route = FlowRouter.current();
     if (route.route.name !== 'login') {
       Session.set('redirectAfterLogin', route.path);
     }
     return FlowRouter.go('/login');
   }
 }
 ]
});

loggedIn.route('/account', {
  name: 'AccountPageComponent',
  action(params, queryParams) {
    return BlazeLayout.render('MainLayoutComponent',
      {main: 'AccountPageComponent'});
  }
});
  
