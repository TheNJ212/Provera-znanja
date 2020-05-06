const http = require('http');
const fs = require('fs');
const url = require('url');
const qs= require('querystring')
const PATH = "www/";

const server =http.createServer(function(request,response){
    let urlObj = url.parse(request.url,true,false);
    if(request.method=='GET'){

        if(urlObj.pathname=='/'){
            fs.readFile(PATH+'index.html',function(err,data){
                if (err){
                    response.writeHead(404);
                    response.end(JSON.stringify(err));
                    return;
                }
                response.writeHead(200,{ 'Content-Type': 'text/html' });
                response.end(data);
                console.log("poslata stranica");
            })
        }

    }
    if(request.method='POST'){
        if (urlObj.pathname == "/sveArtikli"){
            
            var body = '';
            request.on('data', function (data) {
            body += data;
            });
            request.on('end', function () {
            console.log('primljeno: ' + body);
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(sviArtikli(qs.parse(body).imeKompanije));
            });
            
        }

        if (urlObj.pathname == "/dodajArtikal"){
            
            var body = '';
            request.on('data', function (data) {
            body += data;
            });
            request.on('end', function () {
            console.log('primljeno: ' + body);
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(dodajArtikal(qs.parse(body).id,qs.parse(body).naziv,qs.parse(body).cena,qs.parse(body).imeKompanije));
            });
            
        }
        if (urlObj.pathname == "/obrisiArtikal"){
            
            var body = '';
            request.on('data', function (data) {
            body += data;
            });
            request.on('end', function () {
            console.log('primljeno: ' + body);
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(obrisiArtikal(qs.parse(body).id));
            });
            
        }
        if (urlObj.pathname == "/izmeniArtikal"){
            
            var body = '';
            request.on('data', function (data) {
            body += data;
            });
            request.on('end', function () {
            console.log('primljeno: ' + body);
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(izmeniArtiakal(qs.parse(body).id,qs.parse(body).naziv,qs.parse(body).cena,qs.parse(body).imeKompanije));
            });
            
        }
    }
})


const port = 9000;

const host = 'localhost';

server.listen(port,host);
console.log(`Server na adresi: http://${host}:${port}`);

artikli=
[
    {
        "id":"1",
        "naziv":"telefon",
        "cena":"25000",
        "imeKompanije":"gigatron"
    },   
    {
        "id":"2",
        "naziv":"televizor",
        "cena":"20000",
        "imeKompanije":"gigatron"
    },
    {
        "id":"3",
        "naziv":"ves masina",
        "cena":"23000",
        "imeKompanije":"winwin"
    }
]

function sviArtikli(imeKompanije){
    return arrHTML(artikli.filter(x=>x.imeKompanije==imeKompanije));
}

function dodajArtikal(id, naziv, cena, imeKompanije){
    if(artikli.find(x=>x.id==id)==undefined){
        artikal={"id":id,"naziv":naziv,"cena":cena,"imeKompanije":imeKompanije}
        artikli.push(artikal);
        return poruka("dodat artikal")+ objHTML(artikal);
    }
    else return poruka('vec postoji sa tim id');
}

function obrisiArtikal(id){
    if(artikli.find(x=>x.id==id)!=undefined){
        artikal=artikli.find(x=>x.id==id)
        artikli=artikli.filter(x=>x.id!==id)
        return poruka('obrisan artikal')+objHTML(artikal);
    }
    else return poruka('nema trazenog artikla')

}

function izmeniArtiakal(id, naziv, cena, imeKompanije){
    if(artikli.find(x=>x.id==id)!=undefined){
        artikli.find(x=>x.id==id).naziv=naziv;
        artikli.find(x=>x.id==id).cena=cena;
        artikli.find(x=>x.id==id).imeKompanije=imeKompanije;
        return poruka("izmenjen artikal")+ objHTML(artikli.find(x=>x.id==id));
    }
    else return poruka('nema trazenog artikla')
}

function objHTML(obj){
    return `<p>Id: ${obj.id}</p><p>Naziv: ${obj.naziv}</p><p>Cena: ${obj.cena}</p><p>Ime Kompanije: ${obj.imeKompanije}</p><br>`
}

function arrHTML(arr){
    rez=""

    arr.forEach(obj => {
        rez+=objHTML(obj)
    });
    return rez+`<br>`
}

function poruka(str){
return `<h2>${str}</h2>`;
}

