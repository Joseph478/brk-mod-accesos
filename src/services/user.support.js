const { generateApps, generateAppPolicies, generateUsers, generateDevices, generateUserRoles } = require('../utils/common');

const appSupport = async (pool, apps) => {
    
    const insertedAppsIds = [];
    for (const app of apps) {
        try {
            const result = await pool.query(
                'INSERT INTO apps (setting_id, user_id, name, url, owner, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                [app.setting_id, app.user_id, app.name, app.url, app.owner, app.state]
            );
            console.log('####result', result);
            console.log('####rows', result.rows);
            insertedAppsIds.push(result.rows[0].id);
        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedAppIds', insertedAppsIds);
    return insertedAppsIds;
}

const appPolicieSupport = async (pool, appPolicies) => {
    
    const insertedAppPoliciesIds = [];
    for (const appPolicie of appPolicies) {
        try {
            const result = await pool.query(
                'INSERT INTO app_policie (app_id, policy_id, state) VALUES ($1, $2, $3 ) RETURNING id',
                [appPolicie.app_id, appPolicie.policy_id, appPolicie.state]
            );
            console.log('####result', result);
            console.log('####rows', result.rows);
            insertedAppPoliciesIds.push(result.rows[0].id);
        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedAppPoliciesIds', insertedAppPoliciesIds);
    return insertedAppPoliciesIds;
}

const userSupport = async (pool, users) => {
    
    
    const insertedUsersIds = [];
    
    for (const user of users) {
        try {
            const resultUser = await pool.query(
                'INSERT INTO users (username, date_start, date_end, group_id, state) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [user.username, user.date_start, user.date_end, user.group_id, user.state]
            );
            console.log('####resultUser', resultUser);
            console.log('####rowsUser', resultUser.rows);
            insertedUsersIds.push(resultUser.rows[0].id);

        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedIds', insertedUsersIds);
    return insertedUsersIds;
}

const userRolesSupport = async (pool, roleUsers) => {
    
    const insertedUserRolesIds = [];

    for (const roleUser of roleUsers) {
        try {

            const resultUserRole = await pool.query(
                'INSERT INTO user_role (user_id, role_id, state) VALUES ($1, $2, $3) RETURNING id',
                [roleUser.user_id, roleUser.role_id, roleUser.state]
            );
            console.log('####resultUserRole', resultUserRole);
            console.log('####rowsUserRole', resultUserRole.rows);
            insertedUserRolesIds.push(resultUserRole.rows[0].id);

        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedUserRolesIds', insertedUserRolesIds);
    return insertedUserRolesIds;
}

const deviceSupport = async (pool, devices) => {
    
    const insertedDevicesIds = [];
    for (const device of devices) {
        try {
            const result = await pool.query(
                'INSERT INTO devices (user_id, name, description, store, state) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [device.user_id, device.name, device.description, device.store, device.state]
            );
            console.log('####result', result);
            console.log('####rows', result.rows);
            insertedDevicesIds.push(result.rows[0].id);
        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedDevicesIds', insertedDevicesIds);
    return insertedDevicesIds;
}

module.exports = {
    appSupport,
    appPolicieSupport,
    userRolesSupport,
    userSupport,
    deviceSupport
}