import React from 'react';

// TODO: -hassan: Move all loadables to their corresponding modules

const makeLoadable = React.lazy;

export const LoadableLoginScreen = makeLoadable(
  () => import('modules/auth/components/LoginScreen')
);

export const LoadableSignupScreen = makeLoadable(
  () => import('modules/auth/components/SignupScreen')
);

/* Private Routes (Only accessible after login) */
export const LoadablePrivateRoutes = makeLoadable(
  () => import('modules/app/components/PrivateRoutes')
);

/* Dashboard Module */
export const LoadableDashboardModuleTemplateWithRoutes = makeLoadable(
  () => import('modules/dashboard/components/ModuleTemplateWithRoutes')
);

export const LoadableDashboardScreen = makeLoadable(() => import('modules/dashboard'));

/* Users Module */
// Deprecated: This function will be removed in the future version.

export const LoadableUserModule = makeLoadable(() => import('modules/auth/components/UsersScreen'));

export const LoadableMalwareListModule = makeLoadable(
  () => import('modules/malwareList/components/MalwareListScreen')
);
