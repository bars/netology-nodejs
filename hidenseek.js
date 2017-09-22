function createDir(path)
{
    return new Promise((done, fail) => {
         fs.mkdir(path, err => {
             if (err)
             {
                 fail(err);
             }
             else
             {
                  done(path);
             }
         })     
    });
}

function createFile(path, cap, pokemons)
{
    let promises = []
    for (let i = 0; i < cap; i++)
    {
        let promise = new Promise((done, fail) => {
            fs.appendFile(`${path.splice(Math.floor(Math.random() * path.length), 1)}/pokemon.txt`, pokemons[i], err => {
                    if (err)
                    {
                        fail(err);
                    }
                    done();
            });
        });
        promises.push(promise);
    }
    return Promise.all(promises);
}

function hide(path, pokemonList)
{
    let pokemons = [],
        cap = 3,
        promisesDir = [];

    if (pokemonList.length < 3)
    {
        cap = pokemonList.length;
    }
    
    for (let i = 0; i < cap; i++)
    {
        pokemons.push(pokemonList.splice(Math.floor(Math.random() * pokemonList.length), 1));
    }
    
    for (let i = 1; i <= 10; i++)
    {
        i < 10 ? promisesDir.push(createDir(`${path}/0${i}`)) : promisesDir.push(createDir(`${path}/${i}`))
    }

    function showMessage(data)
    {
        if (data)
        {
            console.log(`Покемоны ${pokemons.join(',')} спрятались`);
        }
    }
    
    return Promise.all(promisesDir)
            .then(done => createFile(done, cap, pokemons))
            .then(showMessage)
            .catch(console.log)
}

function readFiles(pokemons) {
    pokemons.forEach(pokemon => {
        let path = `${pokemon[0]}/${pokemon[1]}`
        fs.readFile(path, (err, content) => {
             if (err)
             {
                 throw err;
             }
             console.log(`Покемон "${content}" найден в папке ${pokemon[0]}`)
        })
    })
}

function seek(path)
{
    let promises = [],
        pokemons = [];
    for (let i = 1; i < 11; i++)
    {
        let currentPath;        
        i < 10 ? currentPath = `${path}/0${i}` : currentPath = `${path}/${i}`;            
        promises.push(findFiles(currentPath));        
    }

    function findFiles(path)
    {
        return new Promise((done, fail) => {
            fs.readdir(path, (err, files) => {
                if (err)
                {
                    throw (err);
                }
                if (files.length === 1)
                {
                    pokemons.push([path, files]);
                }
                done();                
            })
        })
    }
    return Promise.all(promises).then(() => readFiles(pokemons));
}

exports.hide = hide;
exports.seek = seek;
