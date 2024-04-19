const { } = require('../database/queries/queries')
const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');
const { typeSupport, settingSupport, policieSupport } = require('../services/settings.support');
const { roleSupportV2, subRoleSupportV2, groupSupport, roleGroupSupport, permissionSupportV2,subPermissionSupportV2 , rolePermissionsSupport } = require('../services/role.support');
const { appSupport, appPolicieSupport, userRolesSupport, userSupport, deviceSupport } = require('../services/user.support')
const { generateApps, generateGroups, generateUsers, generateDevices, generateRolePermissions, generateAppPolicies, generatePermissions, generatePermissionsV2, generatePolicies, generateRolesV2, subGenerateRolesV2, generateRoleGroups, generateRoles, generateUserRoles, subGeneratePermissionsV2} = require('../utils/common');

const pool = new Pool({
    host: 'localhost',
    port: 5433,
    database: 'test_brk2',
    user: 'postgres',
    password: 'laravel20'
});

const getUsers2 = (req, res) => {
    pool.query('SELECT * FROM users', (error, response) => {
        if (error) {
            throw error;
        }
        res.status(200).json(response.rows);
    });
}

const populateDatabase2 = async (req, res) => {
    try {
        const start = performance.now(); // Medir el tiempo total de ejecución
        // await client.connect();
        // Generar y insertar datos
        const policyCount = 10;
        const groupCount = 20;
        const roleCount = 30;
        const subRoleCount = 30;
        const userCount = 50;
        const appCount = 10;
        const permissionCount = 35;
        const subPermissionCount = 35;
        const deviceCount = 10;

        // TYPES
        const typeId = await typeSupport(pool);
        // END TYPES

        // SETTINGS
        const settingId = await settingSupport(pool)
        // END SETTINGS
        // START FAKE DATA
        const generateDataTime = performance.now() - start; // Tiempo de generación de datos fake

        const policiesGenerated = generatePolicies(policyCount, typeId);
        const rolesGenerated = generateRolesV2(roleCount);
        const subRolesGenerated = subGenerateRolesV2(subRoleCount, roleCount);
        const groupsGenerated = generateGroups(groupCount);
        const roleGroupsGenerated = generateRoleGroups(roleCount, groupCount);
        const usersGenerated = generateUsers(userCount, groupCount);
        const roleUsersGenerated = generateUserRoles(userCount, roleCount);
        const appsGenerated = generateApps(appCount, userCount, settingId);
        const appPoliciesGenerated = generateAppPolicies(appCount, policyCount);
        const devicesGenerated = generateDevices(deviceCount, userCount);
        const permissionsGenerated = generatePermissionsV2(permissionCount);
        const rolePermissionsGenerated = generateRolePermissions(roleCount, permissionCount);
        const subPermissionsGenerated = subGeneratePermissionsV2(subPermissionCount, permissionCount);

        const insertStart = performance.now(); // Medir el tiempo de inserción en la base de datos
        // END FAKE DATA

        // POLICIES
        //Insertar datos de políticas
        const policies = await policieSupport(pool, policiesGenerated);
        // END POLICIES
        // ROLES
        // Insertar datos de roles
        const roles = await roleSupportV2(pool, rolesGenerated);
        
        const subRoles = await subRoleSupportV2(pool, subRolesGenerated);
        // END ROLES
        // GRUPOS
        // Insertar datos de grupos
        const groups = await groupSupport(pool, groupsGenerated);
        
        const roleGroups = await roleGroupSupport(pool, roleGroupsGenerated);
        // END GRUPOS
        // USERS
        // Insertar datos de usuarios
        const users = await userSupport(pool, usersGenerated);
        
        const roleUser = await userRolesSupport(pool, roleUsersGenerated);
        // END USERS
        // APPS
        // Insertar datos de aplicaciones
        
        const apps = await appSupport(pool, appsGenerated);
        
        const appPolicies = await appPolicieSupport(pool, appPoliciesGenerated);
        // END APPS
        // DEVICES
        // Insertar datos de dispositivos
        
        const devices = deviceSupport(pool, devicesGenerated);
        // END DEVICES
        
        // PERMISSIONS
        // Insertar datos de permisos
        
        const permissions = await permissionSupportV2(pool, permissionsGenerated);
        
        const permissionRoles = await rolePermissionsSupport(pool, rolePermissionsGenerated);
        
        const subPermissions = await subPermissionSupportV2(pool, subPermissionsGenerated);
        // END PERMISSIONS

        const insertTime = performance.now() - insertStart; // Tiempo de inserción en la base de datos

        const totalTime = performance.now() - start; // Tiempo total de ejecución

        console.log('Tiempo total de ejecución:', totalTime, 'ms');
        console.log('Tiempo de generación de datos fake:', generateDataTime, 'ms');
        console.log('Tiempo de inserción en la base de datos:', insertTime, 'ms');

        const dataRes ={
            database: 'test_brk2',
            totalTime: `Tiempo total de ejecución: ${totalTime} ms`,
            generateDataTime: `Tiempo de generación de datos fake: ${generateDataTime} ms`,
            insertTime: `Tiempo de inserción en la base de datos: ${insertTime} ms`,
            typeId,
            settingId,
            policies,
            apps,
            appPolicies,
            roles,
            subRoles,
            users,
            roleUser,
            devices,
            groups,
            roleGroups,
            permissions,
            permissionRoles,
            subPermissions
        }

        res.status(200).json(dataRes);
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Error al insertar datos:', err);
    }
}

module.exports = {
    getUsers2,
    populateDatabase2
}