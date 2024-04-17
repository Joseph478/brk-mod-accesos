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
const generateUsers = (count, groupCount, roleCount) => {
    
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            username: faker.internet.userName(),
            group_id: faker.number.bigInt({ min: 1, max: groupCount }),
            role_id: faker.number.bigInt({ min: 1, max: roleCount }),
            date_start: faker.date.past(),
            date_end: faker.date.future(),
            state: faker.datatype.boolean(),
        });
    }
    return users;
}

// Función para generar datos de aplicaciones
const generateApps = (count, policyCount, userCount) => {
    const apps = [];
    for (let i = 0; i < count; i++) {
        apps.push({
            policy_id: faker.number.bigInt({ min: 1, max: policyCount }),
            setting_id: faker.number.bigInt({ min: 1, max: 10 }),
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
        const type = await pool.query('INSERT INTO types (name, parameter) VALUES ($1, $2) RETURNING id', ['Policy', 'parameter']);
        console.log('type',type);
        console.log('typeId',type.rows[0].id);
        
        // POLICIES
        //Insertar datos de políticas
        const policies = generatePolicies(policyCount, type.rows[0].id);
        console.log('##policies',policies)
        const insertedPoliciesIds = [];
        for (const policy of policies) {
            try {
                const result = await pool.query(
                    'INSERT INTO policies (type_id, name, parameter, value) VALUES ($1, $2, $3, $4) RETURNING id', 
                    [policy.type_id, policy.name, policy.parameter, policy.value]
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
        const users = generateUsers(userCount, groupCount, roleCount);
        const insertedUsersIds = [];
        for (const user of users) {
            try {
                const result = await pool.query(
                    'INSERT INTO users (username, group_id, role_id, date_start, date_end, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                    [user.username, user.group_id, user.role_id, user.date_start, user.date_end, user.state]
                );
                console.log('####result', result);
                console.log('####rows', result.rows);
                insertedUsersIds.push(result.rows[0].id);
            } catch (err) {
                console.log('##err', err);
                throw err;
            }
        };
        console.log('##insertedIds',insertedUsersIds);
        // END USERS
        // APPS
        // Insertar datos de aplicaciones
        const apps = generateApps(appCount, policyCount, userCount);
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