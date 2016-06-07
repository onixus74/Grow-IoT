Package.describe({
  name: 'accounts',
  version: '0.1.0'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  // Core dependencies.
  api.use([
    'coffeescript',
    'underscore',
    'accounts-base',
    'accounts-password',
    'fourseven:scss',
    'ecmascript'
  ]);

  // 3rd party dependencies.
  api.use([
    'peerlibrary:blaze-common-component',
    'peerlibrary:blaze-components@0.15.0',
    'kadira:flow-router@2.7.0',
    'kadira:blaze-layout@2.2.0',
    'themeteorchef:jquery-validation'
  ]);

  // Internal dependencies.
  api.use([
    'core',
    'api',
    'session'
  ]);

  // Client files
  api.addFiles([
    'client/account-page.js',
    'client/account-page.html',
    'client/routes.js',
    'client/sign-in-or-up.js',
    'client/sign-in-or-up.html',
    'client/reset-password.js',
    'client/reset-password.html'
  ], 'client');
});

