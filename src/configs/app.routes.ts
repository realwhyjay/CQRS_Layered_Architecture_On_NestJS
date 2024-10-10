/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const usersRoot = 'users';
const boardRoot = 'boards';

// Api Versions
const v1 = 'v1';

// Api Tags Set
export const ApiTagsSet = {
  user: 'Users',
  board: 'Boards',
} as const;

export const routesV1 = {
  version: v1,
  user: {
    root: usersRoot,
    delete: `/${usersRoot}/:id`,
  },
  board: {
    root: boardRoot,
    detail: `/${boardRoot}/:id`,
    delete: `/${boardRoot}/:id`,
  },
};
