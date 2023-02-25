window.balance = 0;
window.basic_amount = 0;
window.advanced_amount = 0;
window.ultimate_amount = 0;
window.earning = 0;
window.lifeearning = 0;
window.lifespent = 0;
window.buttonclicks = 0;
window.bitcoin = 0;
window.bitcoinearn = 0;

fetch('/data', {
    method: 'GET'
})
.then(response => response.json())
.then(data => {
    window.balance = data.balance;
    window.basic_amount = data.basicgpu;
    window.advanced_amount = data.advancedgpu;
    window.ultimate_amount = data.ultimategpu;
    window.lifeearning = data.lifetimeearning;
    window.lifespent = data.lifetimespent;
    window.buttonclicks = data.buttonclicks;
})

document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    
    document.querySelector('#play').addEventListener('click', () => load_game());
    document.querySelector('#customization').addEventListener('click', () => load_customization());
    document.querySelector('#statistics').addEventListener('click', () => load_statistics());
    document.querySelector('#settings').addEventListener('click', () => load_settings());
    document.querySelector('#returntomenu').addEventListener('click', () => load_menu());
    document.querySelector('#money_button').addEventListener('click', () => cycle("money"));
    document.querySelector('#basic_gpu').addEventListener('click', () => cycle("basic"));
    document.querySelector('#advanced_gpu').addEventListener('click', () => cycle("advanced"));
    document.querySelector('#ultimate_gpu').addEventListener('click', () => cycle("ultimate"));
    document.querySelector('#save_button').addEventListener('click', () => save());

    // By default, load the main menu
    load_menu();
  });


function load_menu() {
    DisplayBlocks("menu");
}


function load_game() {

    DisplayBlocks("game");
    var infopanel = document.getElementById('infopanel');    

}


function cycle(starter) {

    var infopanel = document.getElementById('infopanel');
    var basicbut = document.getElementById('basic_gpu');
    var advancedbut = document.getElementById('advanced_gpu');
    var ultimatebut = document.getElementById('ultimate_gpu');

    if (window.balance == null)
    {
        window.balance = 0;
        window.basic_amount = 0;
        window.advanced_amount = 0;
        window.ultimate_amount = 0;
    }

    if (starter == "money") {
        window.balance = window.balance + 1;
        window.lifeearning = window.lifeearning + 1;
        window.buttonclicks = window.buttonclicks + 1;
        window.bitcoinearn = window.earning * 0.000032;
        window.bitcoin = window.balance * 0.000032;
        window.bitcoinearn = window.bitcoinearn.toFixed(6)
        window.bitcoin = window.bitcoin.toFixed(6)
        infopanel.innerHTML = `Balance: $${window.balance} &nbsp;&nbsp;&nbsp;&nbsp; BTC Equivalent: ${window.bitcoin}<br> $ earnt per second: $${window.earning} &nbsp;&nbsp;&nbsp;&nbsp; BTC Equivalent: ${window.bitcoinearn}`;
    } else if (starter == "basic") {
        if (window.balance >= 100) {
            window.basic_amount = window.basic_amount + 1;
            window.balance = window.balance - 100;
            window.lifespent = window.lifespent + 100;
            basicbut.innerHTML = `Buy basic GPU<br>$100 (${window.basic_amount})`;
        }
    } else if (starter == "advanced") {
        if (window.balance >= 500) {
            window.advanced_amount = window.advanced_amount + 1;
            window.balance = window.balance - 500;
            window.lifespent = window.lifespent + 500;
            advancedbut.innerHTML = `Buy advanced GPU<br>$500 (${window.advanced_amount})`;
        }
    } else if (starter == "ultimate") {
        if (window.balance >= 1500) {
            window.ultimate_amount = window.ultimate_amount + 1;
            window.balance = window.balance - 1500;
            window.lifespent = window.lifespent + 1500;
            ultimatebut.innerHTML = `Buy ultimate GPU<br>$1500 (${window.ultimate_amount})`;
        }
    }

}


const interval = setInterval(function() {
    window.balance = window.balance + (1 * window.basic_amount) + (7 * window.advanced_amount) + (20 * window.ultimate_amount);
    window.earning = (1 * window.basic_amount) + (7 * window.advanced_amount) + (20 * window.ultimate_amount);
    window.lifeearning = window.lifeearning + (1 * window.basic_amount) + (7 * window.advanced_amount) + (20 * window.ultimate_amount);
    window.bitcoinearn = window.earning * 0.000032;
    window.bitcoin = window.balance * 0.000032;
    window.bitcoinearn = window.bitcoinearn.toFixed(6)
    window.bitcoin = window.bitcoin.toFixed(6)
    infopanel.innerHTML = `Balance: $${window.balance} &nbsp;&nbsp;&nbsp;&nbsp; BTC Equivalent: ${window.bitcoin}<br> $ earnt per second: $${window.earning} &nbsp;&nbsp;&nbsp;&nbsp; BTC Equivalent: ${window.bitcoinearn}`;
    
}, 1000);


function save() {
    fetch('/data', {
        method: 'PUT',
        body: JSON.stringify({
            balance: window.balance,
            basicgpu: window.basic_amount,
            advancedgpu: window.advanced_amount,
            ultimategpu: window.ultimate_amount,
            lifetimeearning: window.lifeearning,
            lifetimespent: window.lifespent,
            buttonclicks: window.buttonclicks
        })
    })
}


function load_statistics() {
    DisplayBlocks("statistics");

    var statpage = document.getElementById('statpage')
        statpage.innerHTML =    `Lifetime Earnings: $${window.lifeearning} <br>
        Lifetime Money Spent: $${window.lifespent} <br><br>
        Current Basic GPU amount: ${window.basic_amount} <br>
        Current Advanced GPU amount: ${window.advanced_amount} <br>
        Current Ultimate GPU amount: ${window.ultimate_amount} <br>
        Current Earnings per minute: $${window.earning} <br>
        # of money button clicks: ${window.buttonclicks} <br>`;
    
}


function load_settings() {
    DisplayBlocks("settings");
}


function load_customization() {
    DisplayBlocks("customization");
}



function DisplayBlocks(scene) {

    document.querySelector('#mainmenu-view').style.display = 'none';
    document.querySelector('#game-view').style.display = 'none';
    document.querySelector('#customization-view').style.display = 'none';
    document.querySelector('#statistics-view').style.display = 'none';
    document.querySelector('#settings-view').style.display = 'none';
    document.querySelector('#returntomenu').style.display = 'none';
    
    if (scene == "menu") {
        document.querySelector('#mainmenu-view').style.display = 'block';
    }
    else if (scene == "game") {
        document.querySelector('#game-view').style.display = 'block';
        document.querySelector('#returntomenu').style.display = 'block';
    }
    else if (scene == "customization") {
        document.querySelector('#customization-view').style.display = 'block';
        document.querySelector('#returntomenu').style.display = 'block';
    }
    else if (scene == "statistics") {
        document.querySelector('#statistics-view').style.display = 'block';
        document.querySelector('#returntomenu').style.display = 'block';
    }
    else if (scene == "settings") {
        document.querySelector('#settings-view').style.display = 'block';
        document.querySelector('#returntomenu').style.display = 'block';
    }

    

}