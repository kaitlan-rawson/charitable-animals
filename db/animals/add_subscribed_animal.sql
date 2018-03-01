insert into subscribed_animals (animal_id, user_id)
values ($1, $2)
returning * 