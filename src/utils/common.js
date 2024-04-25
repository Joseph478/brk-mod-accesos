const { faker } = require('@faker-js/faker');

const generatePolicies = (count, type_id) => {
    const policies = [];
    for (let i = 0; i < count; i++) {
        policies.push({
            type_id: faker.number.int({ min: 1, max: type_id }),
            name: faker.commerce.productName(),
            parameter: faker.commerce.productAdjective(),
            value: JSON.stringify({ key: faker.commerce.productMaterial() }),
            state: faker.datatype.boolean(),
        });
    }
    return policies;
}

// Función para generar datos de grupos
const generateGroups = (count) => {
    const groups = [];
    for (let i = 0; i < count; i++) {
        groups.push({
            name: faker.company.name(),
            type: faker.company.buzzAdjective(),
            state: faker.datatype.boolean(),
        });
    }
    return groups;
}

// Función para generar datos de roles
const generateRoles = (count) => {
    const roles = [];
    for (let i = 0; i < count; i++) {
        roles.push({
            name: faker.person.jobTitle(),
            parent: faker.number.bigInt({ min: 1, max: Math.floor(count / 2) }),
            child: faker.number.bigInt({ min: Math.floor(count / 2) + 1, max: count }),
            state: faker.datatype.boolean(),
        });
    }
    return roles;
}

const generateRolesV2 = (count) => {
    const roles = [];
    for (let i = 0; i < count; i++) {
        roles.push({
            name: faker.person.jobTitle(),
            state: faker.datatype.boolean(),
        });
    }
    return roles;
}

const subGenerateRolesV2 = (count, roleCount) => {
    const subRoles = [];
    for (let i = 0; i < count; i++) {
        subRoles.push({
            name: faker.person.jobTitle(),
            role_id: faker.number.int({ min: 1, max: roleCount }),
            state: faker.datatype.boolean(),
        });
    }
    return subRoles;
}

// Función para generar datos de usuarios
const generateUsers = ( count, groupCount ) => {
    
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            username: faker.internet.userName(),
            date_start: faker.date.past(),
            date_end: faker.date.future(),
            group_id: faker.number.bigInt({ min: 1, max: groupCount }),
            state: faker.datatype.boolean(),
        });
    }
    return users;
}

const generateUserRoles = (userCount, roleCount) => {

    const userRoles = [];
    for (let i = 0; i < userCount; i++) {
        userRoles.push({
            user_id: faker.number.bigInt({ min: 1, max: userCount }),
            role_id: faker.number.bigInt({ min: 1, max: roleCount }),
            state: faker.datatype.boolean(),
        });
    }
    return userRoles;
}

const generateAppPolicies = (policieCount, appCount) => {

    const appPolicies = [];
    for (let i = 0; i < appCount; i++) {
        appPolicies.push({
            policy_id: faker.number.bigInt({ min: 1, max: policieCount }),
            app_id: faker.number.bigInt({ min: 1, max: appCount }),
            state: faker.datatype.boolean(),
        });
    }
    return appPolicies;
}

const generateRoleGroups = (roleCount, groupCount) => {

    const roleGroups = [];
    for (let i = 0; i < roleCount; i++) {
        roleGroups.push({
            role_id: faker.number.bigInt({ min: 1, max: roleCount }),
            group_id: faker.number.bigInt({ min: 1, max: groupCount }),
            state: faker.datatype.boolean(),
        });
    }
    return roleGroups;
}

const generateRolePermissions = (roleCount, permissionCount) => {

    const rolePermissions = [];
    for (let i = 0; i < roleCount; i++) {
        rolePermissions.push({
            role_id: faker.number.bigInt({ min: 1, max: roleCount }),
            permission_id: faker.number.bigInt({ min: 1, max: permissionCount }),
            state: faker.datatype.boolean(),
        });
    }
    return rolePermissions;
}

// Función para generar datos de aplicaciones
const generateApps = (count, userCount, setting_id) => {
    const apps = [];
    for (let i = 0; i < count; i++) {
        apps.push({
            setting_id: faker.number.bigInt({ min: 1, max: setting_id }),
            user_id: faker.number.bigInt({ min: 1, max: userCount }),
            name: faker.company.name(),
            url: faker.internet.url(),
            owner: faker.person.fullName(),
            state: faker.datatype.boolean(),
        });
    }
    return apps;
}

// Función para generar datos de permisos
const generatePermissions = (count) => {
    const permissions = [];
    for (let i = 0; i < count; i++) {
        permissions.push({
            name: faker.system.fileName(),
            parent: faker.number.bigInt({ min: 1, max: Math.floor(count / 2) }),
            child: faker.number.bigInt({ min: Math.floor(count / 2) + 1, max: count }),
            state: faker.datatype.boolean(),
        });
    }
    return permissions;
}
const generatePermissionsV2 = (count) => {
    const permissions = [];
    for (let i = 0; i < count; i++) {
        permissions.push({
            name: faker.system.fileName(),
            state: faker.datatype.boolean(),
        });
    }
    return permissions;
}

const subGeneratePermissionsV2 = (count, permissionCount) => {
    const subPermissions = [];
    for (let i = 0; i < count; i++) {
        subPermissions.push({
            name: faker.person.jobTitle(),
            permission_id: faker.number.int({ min: 1, max: permissionCount }),
            state: faker.datatype.boolean(),
        });
    }
    return subPermissions;
}

// Función para generar datos de devices
const generateDevices = (count, userCount) => {
    const devices = [];
    for (let i = 0; i < count; i++) {
        devices.push({
            user_id: faker.number.bigInt({ min: 1, max: userCount }),
            name: faker.system.fileName(),
            description: faker.string.alphanumeric({length: 40}),
            store: faker.string.alphanumeric({length: 60}),
            state: faker.datatype.boolean(),
        });
    }
    return devices;
}

module.exports = {
    generatePolicies,
    generateGroups,
    generateRoles,
    generateRolesV2,
    subGenerateRolesV2,
    generateUsers,
    generateUserRoles,
    generateRoleGroups,
    generateApps,
    generatePermissions,
    generatePermissionsV2,
    subGeneratePermissionsV2,
    generateAppPolicies,
    generateDevices,
    generateRolePermissions
}