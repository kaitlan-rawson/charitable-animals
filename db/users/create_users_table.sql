create table if not exists users (
    id serial primary key,
    username text,
    profile_pic text,
    auth_id text
)