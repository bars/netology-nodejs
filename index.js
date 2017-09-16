hidenseek = require('./hidenseek');
fs = require('fs');

pokemonList = ['charm', 'pika', 'meow', 'bulbazaur'];
if (process.argv[2] === 'hide')
{
    fs.readFile(process.argv[4], (err, content) => {
        if (err)
        {
            throw err;
        }
        hidenseek.hide(process.argv[3], JSON.parse(content));
    })
    
}
if (process.argv[2] === 'seek')
{
    hidenseek.seek(process.argv[3]);
}