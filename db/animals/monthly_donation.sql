update subscribed_animals
set subscribed_donation = true
where animal_id= $1 and user_id = $2
