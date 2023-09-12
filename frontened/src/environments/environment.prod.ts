import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
  xAuthToken: "yOy8n41Sagfwo78m77ASiRzxGauTz9W1ZBXHkyA3mpiaQdUl7UX6Wp5QU4HlJfEatDYdBjOmN5xb",
  apiUrl: "https://charlesstanleywebapp.azurewebsites.net/api/v1",
  azure: {
    auth: {
      // clientId: '6b5d2f00-8fdc-4ca6-83da-30ce90c5abbd', // CUSTOMER
      clientId: '92b18780-86ee-419c-b684-6ea2ad31f281', // ADMIN
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
