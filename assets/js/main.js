
function relogio() {
    const relogio = document.querySelector('.relogio');
    const voltas = document.querySelector('.voltas');
    const volta = document.querySelector('.volta');
    
    function criaHoraDosSegundos(segundos) {
        const data = new Date(segundos * 1000);
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'UTC'
        });
    }

    let segundos = 0;
    let timer;    
    let contaLi = 1;

    function iniciaRelogio() {
        timer = setInterval(function () {
            segundos++;
            relogio.innerHTML = criaHoraDosSegundos(segundos);
            volta.setAttribute('enabled', 'enabled');
        }, 1000)
    }

    function criaLi() {
        const li = document.createElement('li');
        return li;
    }

    function criaVolta(volta) {
        const li = criaLi();
        li.innerHTML = contaLi + 'º - ' + volta;
        voltas.appendChild(li);
    }

    function criaVoltaSalva(volta) {
        const li = criaLi();
        li.innerHTML = volta;
        voltas.appendChild(li);
        contaLi++;
    }

    function salvaVoltas() {
        const liVoltas = voltas.querySelectorAll('li');
        const listaDeVoltas = [];
        
        for (let volta of liVoltas) {
            let voltatexto = volta.innerText;
            listaDeVoltas.push(voltatexto);
        }
        const voltasJSON = JSON.stringify(listaDeVoltas);
        localStorage.setItem('voltas', voltasJSON);
    }

    function adicionaVoltasSalvas() {
        const voltas = localStorage.getItem('voltas');
        const listaDeVoltas = JSON.parse(voltas);
      
        for (let volta of listaDeVoltas) {
          criaVoltaSalva(volta);
        }
    } 

    document.addEventListener('click', function (e) {
        const el = e.target;
       
        if (el.classList.contains('iniciar')) {
            volta.removeAttribute('disabled');
            relogio.classList.remove('pausado');
            clearInterval(timer);
            iniciaRelogio();
        
        }

        if (el.classList.contains('pausar')) {
            if (relogio.innerText !== "00:00:00") { 
            volta.setAttribute('disabled', 'disabled');
            relogio.classList.add('pausado');            
            clearInterval(timer);
            }
        }

        if (el.classList.contains('zerar')) {
            volta.removeAttribute('disabled');
            relogio.classList.remove('pausado');
            voltas.innerHTML = '';
            clearInterval(timer);
            salvaVoltas();
            relogio.innerHTML = '00:00:00';
            segundos = 0;
            contaLi = 1;
        }
        
        if (el.classList.contains('volta')) {  
            if (relogio.innerText !== "00:00:00") {      
            criaVolta(criaHoraDosSegundos(segundos)); 
            contaLi++;
            }    
            salvaVoltas();                     
        }
    });
    adicionaVoltasSalvas();
}
relogio();