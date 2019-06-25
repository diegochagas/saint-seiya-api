var fs = require('fs');

fs.readFile('imagem.jpg', function(error, buffer){
    console.log('arquivo lido');

    fs.writeFile('imagem2.jpg', buffer, function(err){
      console.log('arquivo escrito');
    });

});
