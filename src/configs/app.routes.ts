/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const usersRoot = 'users';

// Api Versions
const v1 = 'v1';

// Api Tags Set
export const ApiTagsSet = {
  user: 'User',
} as const;

export const routesV1 = {
  version: v1,
  user: {
    root: usersRoot,
    create: `/${usersRoot}`,
    get: { detail: `/${usersRoot}/:id` },
    delete: `/${usersRoot}/:id`,
  },
};
