const { generateRoles, generateRolesV2, subGenerateRolesV2, generateGroups, generatePermissions, generatePermissionsV2, subGeneratePermissionsV2, generateRoleGroups, generateRolePermissions } = require('../utils/common');

const roleSupport = async (pool, roles) => {
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
    console.log('##insertedRolesIds', insertedRolesIds);
    return insertedRolesIds;
}

const roleSupportV2 = async (pool, roles) => {
    
    const insertedRolesIds = [];
    for (const role of roles) {
        try {

            const result = await pool.query(
                'INSERT INTO roles (name, state) VALUES ($1, $2) RETURNING id',
                [role.name, role.state]
            );
            console.log('####result', result);
            console.log('####rows', result.rows);
            insertedRolesIds.push(result.rows[0].id);
            
        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedRolesIds', insertedRolesIds);
    return insertedRolesIds;
}

const subRoleSupportV2 = async (pool, subRoles) => {
    
    const insertedSubRolesIds = [];
    for (const subRole of subRoles) {
        try {

            const result = await pool.query(
                'INSERT INTO sub_roles (name, role_id ,state) VALUES ($1, $2, $3) RETURNING id',
                [subRole.name, subRole.role_id, subRole.state]
            );
            console.log('####result', result);
            console.log('####rows', result.rows);
            insertedSubRolesIds.push(result.rows[0].id);
            
        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedSubRolesIds', insertedSubRolesIds);
    return insertedSubRolesIds;
}

const groupSupport = async (pool, groups) => {
    
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
    console.log('##insertedGroupsIds', insertedGroupsIds);
    return insertedGroupsIds;
}
const roleGroupSupport = async (pool, roleGroups) => {
    
    const insertedRoleGroupsIds = [];
    for (const roleGroup of roleGroups) {
        try {
            const result = await pool.query(
                'INSERT INTO role_group (role_id, group_id, state) VALUES ($1, $2, $3) RETURNING id',
                [roleGroup.role_id, roleGroup.group_id, roleGroup.state]
            );
            console.log('####result', result);
            console.log('####rows', result.rows);
            insertedRoleGroupsIds.push(result.rows[0].id);
        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedRoleGroupsIds', insertedRoleGroupsIds);
    return insertedRoleGroupsIds;
}
const permissionSupport = async (pool, permissions) => {
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
    console.log('##insertedPermissionsIds', insertedPermissionsIds);
    return insertedPermissionsIds;
    
}
const permissionSupportV2 = async (pool, permissions) => {
    
    const insertedPermissionsIds = [];
    for (const permission of permissions) {
        try {
            const result = await pool.query(
                'INSERT INTO permissions (name, state) VALUES ($1, $2) RETURNING id',
                [permission.name, permission.state]
            );
            console.log('####result', result);
            console.log('####rows', result.rows);
            insertedPermissionsIds.push(result.rows[0].id);
        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedPermissionsIds', insertedPermissionsIds);
    return insertedPermissionsIds;
    
}

const subPermissionSupportV2 = async (pool, subPermissions) => {
    
    const insertedSubPermissionsIds = [];
    for (const subPermission of subPermissions) {
        try {

            const result = await pool.query(
                'INSERT INTO sub_permissions (name, permission_id ,state) VALUES ($1, $2, $3) RETURNING id',
                [subPermission.name, subPermission.permission_id, subPermission.state]
            );
            console.log('####result', result);
            console.log('####rows', result.rows);
            insertedSubPermissionsIds.push(result.rows[0].id);
            
        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedSubPermissionsIds', insertedSubPermissionsIds);
    return insertedSubPermissionsIds;
}

const rolePermissionsSupport = async (pool, rolePermissions) => {
    
    const insertedRolePermissionsIds = [];
    for (const rolePermission of rolePermissions) {
        try {
            const result = await pool.query(
                'INSERT INTO role_permission (role_id, permission_id, state) VALUES ($1, $2, $3) RETURNING id',
                [rolePermission.role_id, rolePermission.permission_id, rolePermission.state]
            );
            console.log('####result', result);
            console.log('####rows', result.rows);
            insertedRolePermissionsIds.push(result.rows[0].id);
        } catch (err) {
            console.log('##err', err);
            throw err;
        }
    };
    console.log('##insertedRolePermissionsIds', insertedRolePermissionsIds);
    return insertedRolePermissionsIds;
}

module.exports = {
    roleSupport,
    roleSupportV2,
    subRoleSupportV2,
    groupSupport,
    roleGroupSupport,
    permissionSupport,
    permissionSupportV2,
    subPermissionSupportV2,
    rolePermissionsSupport
}