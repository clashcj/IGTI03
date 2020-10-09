import { promises as fs } from 'fs';

var estados;
var cidades;
var siglas = [];
var ufMaiorNome = [];
var cidadeNome = [];

try {
  init();
} catch (err) {
  console.log(e);
}

async function init() {
  estados = JSON.parse(await fs.readFile('Estados.json'));
  cidades = JSON.parse(await fs.readFile('Cidades.json'));

  estados.forEach((estado) => {
    var cidadesFiltradas = cidades.filter((cidade) => {
      return cidade.Estado === estado.ID;
    });
    var obj = {
      cidades: cidadesFiltradas,
    };
    fs.writeFile(estado.Sigla + '.json', JSON.stringify(obj));
    siglas.push(estado.Sigla.toString());

    obj = {
      uf: estado.Sigla,
      cidades: cidadesFiltradas,
    };

    ufMaiorNome.push(obj);
    cidadesFiltradas.forEach((cidade) => {
      obj = {
        nome: cidade.Nome,
        uf: estado.Sigla,
      };
      cidadeNome.push(obj);
    });
  });

  var cidadesPorEstado = [];
  for (const sigla of siglas) {
    var obj = {
      uf: sigla,
      qtdeCidade: await getQtdeCidades(sigla),
    };
    cidadesPorEstado.push(obj);
  }
  //Tópico 3
  console.log('\nTópico 3');
  cidadesPorEstado.sort((a, b) => b.qtdeCidade - a.qtdeCidade);
  for (var i = 0; i < 5; i++) {
    console.log(
      cidadesPorEstado[i].uf + ' - ' + cidadesPorEstado[i].qtdeCidade
    );
  }

  //Tópico 4
  console.log('\nTópico 4');
  cidadesPorEstado.sort((a, b) => a.qtdeCidade - b.qtdeCidade);
  for (var i = 4; i >= 0; i--) {
    console.log(
      cidadesPorEstado[i].uf + ' - ' + cidadesPorEstado[i].qtdeCidade
    );
  }

  //Tópico 5
  console.log('\nTópico 5');
  ufMaiorNome.forEach((uf) => {
    uf.cidades.sort((a, b) => {
      return b.Nome.length - a.Nome.length || a.Nome.localeCompare(b.Nome);
    });
    console.log(uf.cidades[0].Nome + ' - ' + uf.uf);
  });

  //Tópico 7
  console.log('\nTópico 7');
  ufMaiorNome.forEach((uf) => {
    uf.cidades.sort((a, b) => {
      return b.Nome.length - a.Nome.length || a.Nome.localeCompare(b.Nome);
    });
    console.log(uf.cidades[0].Nome + ' - ' + uf.uf);
  });

  //Tópico 8
  console.log('\nTópico 8');
  cidadeNome.sort((a, b) => {
    return a.nome.length - b.nome.length || a.nome.localeCompare(b.nome);
  });
  console.log(cidadeNome[0]);

  //Tópico 9
  console.log('\nTópico 9');
  cidadeNome.sort((a, b) => {
    return b.nome.length - a.nome.length || a.nome.localeCompare(b.nome);
  });
  console.log(cidadeNome[0]);
}

async function getQtdeCidades(uf) {
  const cidades = JSON.parse(await fs.readFile(uf + '.json'));

  return Object.keys(cidades.cidades).length;
}
