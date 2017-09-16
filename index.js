hidenseek = require('./hidenseek');
fs = require('fs');

if (process.argv[2] === 'hide')
{
    fs.readFile(process.argv[4], (err, content) => {
        if (err)
        {
            throw err;
        }
        fs.exists(process.argv[3], (exists) => {
            if (exists)
            {
                hidenseek.hide(process.argv[3], JSON.parse(content));
            }
            else
            {
                fs.mkdir(process.argv[3], err => {
                if (err)
                {
                    throw err;
                }
                hidenseek.hide(process.argv[3], JSON.parse(content));
                })
            }
        })    
    })    
}
if (process.argv[2] === 'seek')
{
    hidenseek.seek(process.argv[3]);
}