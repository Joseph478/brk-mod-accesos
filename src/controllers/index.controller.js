const { password } = require('pg/lib/defaults');
const { } = require('../database/queries/queries')
const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'test_brk',
    user: 'postgres',
    password: 'Myanabeth0'
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, response) => {
        if (error) {
            throw error;
        }
        res.status(200).json(response.rows);
    });
}

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
    for (let i = 0; i < count; i++) {
        userRoles.push({
            user_id: faker.number.bigInt({ min: 1, max: userCount }),
            role_id: faker.number.bigInt({ min: 1, max: roleCount }),
            state: faker.datatype.boolean(),
        });
    }
    return userRoles;
}

// Función para generar datos de aplicaciones
const generateApps = (count, policyCount, userCount, setting_id) => {
    const apps = [];
    for (let i = 0; i < count; i++) {
        apps.push({
            policy_id: faker.number.bigInt({ min: 1, max: policyCount }),
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

const populateDatabase = async (req, res) => {
    try {
        // await client.connect();
        // Generar y insertar datos
        const policyCount = 10;
        const groupCount = 20;
        const roleCount = 30;
        const userCount = 1000;
        const appCount = 500;
        const permissionCount = 100;

        const start = performance.now(); // Medir el tiempo total de ejecución

        const generateDataTime = performance.now() - start; // Tiempo de generación de datos

        const insertStart = performance.now(); // Medir el tiempo de inserción en la base de datos
        // TYPES
        const type = await pool.query('INSERT INTO types (name, parameter, state) VALUES ($1, $2, $3) RETURNING id', 
        [
            faker.person.firstName(),
            faker.commerce.productAdjective(),
            faker.datatype.boolean(),
        ]);
        console.log('##type',type);
        console.log('##typeId',type.rows[0].id);
        // END TYPES

        // SETTINGS
        const setting = await pool.query('INSERT INTO settings (user_pool, identity_pool,app_client, value, state) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [
            faker.string.alphanumeric(),
            faker.string.hexadecimal(),
            faker.string.alphanumeric(),
            JSON.stringify({ key: faker.commerce.productMaterial() }),
            faker.datatype.boolean(),
        ]
        );
        console.log('##setting',setting);
        console.log('##settingId',setting.rows[0].id);
        // END SETTINGS

        // POLICIES
        //Insertar datos de políticas
        const policies = generatePolicies(policyCount, type.rows[0].id);
        console.log('##policies',policies)
        const insertedPoliciesIds = [];
        for (const policy of policies) {
            try {
                const result = await pool.query(
                    'INSERT INTO policies (type_id, name, parameter, value, state) VALUES ($1, $2, $3, $4, $5) RETURNING id', 
                    [policy.type_id, policy.name, policy.parameter, policy.value, policy.state]
                );
                console.log('####result', result);
                console.log('####rows', result.rows);
                insertedPoliciesIds.push(result.rows[0].id);
            } catch (err) {
                console.log('##err', err);
                throw err;
            }
        };
        console.log('##insertedIds',insertedPoliciesIds);
        // END POLICIES
        // GRUPOS
        // Insertar datos de grupos
        const groups = generateGroups(groupCount);
        const insertedGroupsIds = [];
        for (const group of groups) {
            try {
                const result = await pool.query(
                    'INSERT INTO groups (name, type, state) VALUES ($1, $2, $3) RETURNING id',
                    [group.name, group.type, group.state]
                );
                console.log('####result', result);
                console.log('####rows', result.rows);
                insertedGroupsIds.push(result.rows[0].id);
            } catch (err) {
                console.log('##err', err);
                throw err;
            }
        };
        console.log('##insertedIds',insertedGroupsIds);
        // END GRUPOS

        // ROLES
        // Insertar datos de roles
        const roles = generateRoles(roleCount);
        const insertedRolesIds = [];
        for (const role of roles) {
            try {
                const result = await pool.query(
                    'INSERT INTO roles (name, parent, child, state) VALUES ($1, $2, $3, $4) RETURNING id',
                    [role.name, role.parent, role.child, role.state]
                );
                console.log('####result', result);
                console.log('####rows', result.rows);
                insertedRolesIds.push(result.rows[0].id);
            } catch (err) {
                console.log('##err', err);
                throw err;
            }
        };
        console.log('##insertedIds',insertedRolesIds);
        // END ROLES
        // USERS
        // Insertar datos de usuarios
        const users = generateUsers(userCount, groupCount);
        const roleUsers = generateUserRoles(roleCount, userCount);

        const insertedUsersIds = [];
        const insertedUserRolesIds = [];
        for (const user of users) {
            try {
                const resultUser = await pool.query(
                    'INSERT INTO users (username, date_start, date_end, group_id, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                    [user.username, user.date_start, user.date_end, user.group_id ,user.state]
                );
                console.log('####resultUser', resultUser);
                console.log('####rowsUser', resultUser.rows);
                insertedUsersIds.push(resultUser.rows[0].id);

                const resultUserRole= await pool.query(
                    'INSERT INTO user_role (user_id, role_id, state) VALUES ($1, $2, $3) RETURNING id',
                    [roleUsers.user_id, roleUsers.role_id, roleUsers.state]
                );
                console.log('####resultUserRole', resultUserRole);
                console.log('####rowsUserRole', resultUserRole.rows);
                insertedUserRolesIds.push(resultUserRole.rows[0].id);
                
            } catch (err) {
                console.log('##err', err);
                throw err;
            }
        };
        console.log('##insertedIds',insertedUsersIds);
        // END USERS
        // APPS
        // Insertar datos de aplicaciones
        const apps = generateApps(appCount, policyCount, userCount, setting.rows[0].id);
        const insertedAppsIds = [];
        for (const app of apps) {
            try {
                const result = await pool.query(
                    'INSERT INTO apps (policy_id, setting_id, user_id, name, url, owner, state) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
                    [app.policy_id, app.setting_id, app.user_id, app.name, app.url, app.owner, app.state]
                );
                console.log('####result', result);
                console.log('####rows', result.rows);
                insertedAppsIds.push(result.rows[0].id);
            } catch (err) {
                console.log('##err', err);
                throw err;
            }
        };
        console.log('##insertedIds',insertedAppsIds);

        // PERMISSIONS
        // Insertar datos de permisos
        const permissions = generatePermissions(permissionCount);
        const insertedPermissionsIds = [];
        for (const permission of permissions) {
            try {
                const result = await pool.query(
                    'INSERT INTO permissions (name, parent, child, state) VALUES ($1, $2, $3, $4) RETURNING id',
                    [permission.name, permission.parent, permission.child, permission.state]
                );
                console.log('####result', result);
                console.log('####rows', result.rows);
                insertedPermissionsIds.push(result.rows[0].id);
            } catch (err) {
                console.log('##err', err);
                throw err;
            }
        };
        console.log('##insertedIds',insertedPermissionsIds);
        // END PERMISSIONS

        const insertTime = performance.now() - insertStart; // Tiempo de inserción en la base de datos

        const totalTime = performance.now() - start; // Tiempo total de ejecución

        console.log('Tiempo total de ejecución:', totalTime, 'ms');
        console.log('Tiempo de generación de datos fake:', generateDataTime, 'ms');
        console.log('Tiempo de inserción en la base de datos:', insertTime, 'ms');

        const dataRes ={
            totalTime: `Tiempo total de ejecución: ${totalTime} ms`,
            generateDataTime: `Tiempo de generación de datos fake: ${generateDataTime} ms`,
            insertTime: `Tiempo de inserción en la base de datos: ${insertTime} ms`
        }

        res.status(200).json(dataRes);
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Error al insertar datos:', err);
    }
}

module.exports = {
    getUsers,
    populateDatabase
}