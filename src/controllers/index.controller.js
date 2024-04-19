const { } = require('../database/queries/queries')
const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');
const { typeSupport, settingSupport, policieSupport } = require('../services/settings.support');
const { roleSupport, groupSupport, roleGroupSupport, permissionSupport, rolePermissionsSupport } = require('../services/role.support');
const { appSupport, appPolicieSupport, userRolesSupport, userSupport, deviceSupport } = require('../services/user.support')
const { generateApps, generateGroups, generatePermissions, generatePolicies, generateRoleGroups, generateRoles, generateUserRoles} = require('../utils/common');

const pool = new Pool({
    host: 'localhost',
    port: 5433,
    database: 'test_brk',
    user: 'postgres',
    password: 'laravel20'
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, response) => {
        if (error) {
            throw error;
        }
        res.status(200).json(response.rows);
    });
}

const populateDatabase = async (req, res) => {
    try {
        // await client.connect();
        // Generar y insertar datos
        const policyCount = 10;
        const groupCount = 20;
        const roleCount = 30;
        const userCount = 50;
        const appCount = 10;
        const permissionCount = 35;
        const deviceCount = 10;

        const start = performance.now(); // Medir el tiempo total de ejecución

        const generateDataTime = performance.now() - start; // Tiempo de generación de datos

        const insertStart = performance.now(); // Medir el tiempo de inserción en la base de datos
        // TYPES
        const typeId = await typeSupport(pool);
        // END TYPES

        // SETTINGS
        const settingId = await settingSupport(pool)
        // END SETTINGS

        // POLICIES
        //Insertar datos de políticas
        const policies = await policieSupport(pool, policyCount, typeId);
        // END POLICIES
        // ROLES
        // Insertar datos de roles
        const roles = await roleSupport(pool, roleCount);
        // END ROLES
        // GRUPOS
        // Insertar datos de grupos
        const groups = await groupSupport(pool, groupCount);
        const roleGroups = await roleGroupSupport(pool, roleCount, groupCount);
        // END GRUPOS
        // USERS
        // Insertar datos de usuarios
        const users = await userSupport(pool, userCount, groupCount);
        const roleUser = await userRolesSupport(pool, userCount, roleCount);
        // END USERS
        // APPS
        // Insertar datos de aplicaciones
        const apps = await appSupport(pool, appCount, policyCount, userCount, settingId);
        const appPolicies = await appPolicieSupport(pool, appCount, policyCount);
        // END APPS
        // DEVICES
        // Insertar datos de dispositivos
        const devices = deviceSupport(pool, deviceCount, userCount);
        // END DEVICES
        
        // PERMISSIONS
        // Insertar datos de permisos
        const permissions = await permissionSupport(pool, permissionCount);
        const permissionRoles = await rolePermissionsSupport(pool, roleCount, permissionCount);
        // END PERMISSIONS

        const insertTime = performance.now() - insertStart; // Tiempo de inserción en la base de datos

        const totalTime = performance.now() - start; // Tiempo total de ejecución

        console.log('Tiempo total de ejecución:', totalTime, 'ms');
        console.log('Tiempo de generación de datos fake:', generateDataTime, 'ms');
        console.log('Tiempo de inserción en la base de datos:', insertTime, 'ms');

        const dataRes ={
            database: 'test_brk',
            totalTime: `Tiempo total de ejecución: ${totalTime} ms`,
            generateDataTime: `Tiempo de generación de datos fake: ${generateDataTime} ms`,
            insertTime: `Tiempo de inserción en la base de datos: ${insertTime} ms`,
            typeId,
            settingId,
            policies,
            apps,
            appPolicies,
            roles,
            users,
            roleUser,
            devices,
            groups,
            roleGroups,
            permissions,
            permissionRoles
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