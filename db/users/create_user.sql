insert into users(username, profile_pic, auth_id, first_name)
values($1,$2,$3,$4)
RETURNING *