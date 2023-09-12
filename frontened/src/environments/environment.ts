// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
  xAuthToken: "yOy8n41Sagfwo78m77ASiRzxGauTz9W1ZBXHkyA3mpiaQdUl7UX6Wp5QU4HlJfEatDYdBjOmN5xb",
  apiUrl: "https://charlesstanleywebapp.azurewebsites.net/api/v1",
  azure: {
    auth: {
      clientId: '99dc5ccf-394b-41d0-b709-a33beb3afec0',
      authority: 'https://login.microsoftonline.com/b39afc11-407d-4e2c-8d8a-bc3093cf95c3',
      resources: {
        csBackend: {
          url: 'https://charlesstanleywebapp.azurewebsites.net/*',
          scopes: ['api://5a43e599-386b-4783-bf8a-d0e20f4101fd/access_as_user']
        },
        graph: {
          url: 'https://graph.microsoft.com/v1.0/me',
          scopes: ['user.read']
        }
      }
    },

  },
  mode: 'ADMIN'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
