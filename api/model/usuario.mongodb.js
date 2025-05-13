use('estoque')
db.usuarios.insertOne({
    'nome': 'Maria José',
    'email' : 'maria@gmail.com',
    'senha' :  '123Mudar',
    'tipo' : 'Cliente', //ou Admin
    'avatar' : 'https://ui-avatar.com/api?name=Maria+José&background==F00&color=FFF'
});
db.usuarios.createIndex({email:1},{unique:true})

use('estoque')
db.usuarios.find({},{senha:0})


