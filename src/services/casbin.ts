import { newEnforcer, newModelFromString, StringAdapter } from "casbin";

const model = newModelFromString(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && keyMatch2(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

const policy = `
p, admin, /dashboard, GET
p, admin, /dashboard/*, GET
p, admin, /dashboard/*, POST
p, admin, /dashboard/*, PUT
p, admin, /dashboard/*, DELETE

p, user, /dashboard, GET
p, user, /dashboard/forms, GET
p, user, /dashboard/charts, GET

g, alice, admin
g, bob, user
`;

const adapter = new StringAdapter(policy);

export const getEnforcer = async () => {
  const e = await newEnforcer(model, adapter);
  return e;
};

export const checkPermission = async (sub: string, obj: string, act: string) => {
  const e = await getEnforcer();
  return await e.enforce(sub, obj, act);
};

export const getRolesForUser = async (user: string) => {
  const e = await getEnforcer();
  return await e.getRolesForUser(user);
};

export const getImplicitPermissionsForUser = async (user: string) => {
  const e = await getEnforcer();
  return await e.getImplicitPermissionsForUser(user);
};
