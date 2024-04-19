const { faker } = require('@faker-js/faker');
const { generatePolicies } = require('../utils/common');


const typeSupport = async (pool) => {
    const type = await pool.query('INSERT INTO types (name, parameter, state) VALUES ($1, $2, $3) RETURNING id',
        [
            faker.person.firstName(),
            faker.commerce.productAdjective(),
            faker.datatype.boolean(),
        ]);
    console.log('##type', type);
    console.log('##typeId', type.rows[0].id);
    return type.rows[0].id;
}

const settingSupport = async (pool) => {
    const setting = await pool.query('INSERT INTO settings (user_pool, identity_pool,app_client, value, state) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [
            faker.string.alphanumeric(),
            faker.string.hexadecimal(),
            faker.string.alphanumeric(),
            JSON.stringify({ key: faker.commerce.productMaterial() }),
            faker.datatype.boolean(),
        ]
    );
    console.log('##setting', setting);
    console.log('##settingId', setting.rows[0].id);
    return setting.rows[0].id;
}

const policieSupport = async (pool, policies) => {
    console.log('##policies', policies)
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
    console.log('##insertedPoliciesIds', insertedPoliciesIds);
    return insertedPoliciesIds;
}

module.exports = {
    typeSupport,
    settingSupport,
    policieSupport,
}