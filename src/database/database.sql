-- "F:\Programs\Postgres\14\pgAdmin 4\runtime\psql.exe" "host=localhost port=5432 dbname=test_
-- brk user=postgres sslmode=prefer connect_timeout=10"

-- TRUNCATE TABLE policies RESTART IDENTITY CASCADE;

CREATE DATABASE test_brk;


CREATE TABLE types(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(40),
    parameter VARCHAR(40) NULL 
);

CREATE TABLE policies(
    id BIGSERIAL PRIMARY KEY,
    type_id BIGINT,
    name VARCHAR(40),
    parameter VARCHAR(40) NULL,
    value JSONB NULL 
);

CREATE TABLE groups(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(40),
    type VARCHAR(40),
    state boolean default true 
);

CREATE TABLE roles(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(40),
    parent BIGINT,
    child BIGINT,
    state boolean default true 
);

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    group_id BIGINT,
    username VARCHAR(40),
    date_start TIMESTAMP NULL,
    date_end TIMESTAMP NULL,
    state boolean default true 
);

CREATE TABLE settings(
    id BIGSERIAL PRIMARY KEY,
    user_pool VARCHAR(80),
    identity_pool VARCHAR(90),
    app_client VARCHAR(100),
    value JSONB NULL,
    state boolean default true 
);

CREATE TABLE apps(
    id BIGSERIAL PRIMARY KEY,
    setting_id BIGINT,
    user_id BIGINT,
    name VARCHAR(40),
    url TEXT,
    owner VARCHAR(40),
    state boolean default true 
);

CREATE TABLE permissions(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(40),
    parent BIGINT,
    child BIGINT,
    state boolean default true 
);

CREATE TABLE devices(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR(40),
    description TEXT,
    store TEXT,
    state boolean default true 
);

CREATE TABLE user_role(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    role_id BIGINT,
    state boolean default true 
);

CREATE TABLE permission_role(
    id BIGSERIAL PRIMARY KEY,
    permission_id BIGINT,
    role_id BIGINT,
    state boolean default true 
);

CREATE TABLE app_policie(
    id BIGSERIAL PRIMARY KEY,
    app_id BIGINT,
    policy_id BIGINT,
    state boolean default true 
);


CREATE TABLE group_policie(
    id BIGSERIAL PRIMARY KEY,
    group_id BIGINT,
    policy_id BIGINT,
    state boolean default true 
);

CREATE table role_group(
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT,
    group_id BIGINT,
    state boolean default true 
);

--- Relaciones

ALTER TABLE policies
ADD CONSTRAINT policies_type_id_fkey FOREIGN KEY (type_id) REFERENCES types(id);

ALTER TABLE users
ADD CONSTRAINT users_group_id_fkey FOREIGN KEY (group_id) REFERENCES groups(id);

ALTER TABLE apps
ADD CONSTRAINT apps_setting_id_fkey FOREIGN KEY (setting_id) REFERENCES settings(id),
ADD CONSTRAINT apps_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE user_role
ADD CONSTRAINT user_role_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
ADD CONSTRAINT user_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id);


ALTER TABLE permission_role
ADD CONSTRAINT permission_role_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES permissions(id),
ADD CONSTRAINT permission_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id);

ALTER TABLE app_policie
ADD CONSTRAINT app_policie_app_id_fkey FOREIGN KEY (app_id) REFERENCES apps(id),
ADD CONSTRAINT app_policie_policy_id_fkey FOREIGN KEY (policy_id) REFERENCES policies(id);

ALTER TABLE group_policie
ADD CONSTRAINT group_policie_group_id_fkey FOREIGN KEY (group_id) REFERENCES groups(id),
ADD CONSTRAINT group_policie_policy_id_fkey FOREIGN KEY (policy_id) REFERENCES policies(id);

ALTER TABLE role_group
ADD CONSTRAINT role_group_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id),
ADD CONSTRAINT role_group_group_id_fkey FOREIGN KEY (group_id) REFERENCES groups(id);