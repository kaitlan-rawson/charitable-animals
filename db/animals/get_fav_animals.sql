select animals.name, animals.pic1
from animals
join subscribed_animals on subscribed_animals.animal_id = animals.id 
where subscribed_animals.user_id = $1