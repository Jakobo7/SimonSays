window.onload=function(e){
    init();
};

var simon = [];
var simonStored = [];
var start;
var reset;
var purple = {};
var blue = {};
var red = {};
var green = {};
var answer = false;

function init() {
    window.events = new window.pubsub();

    window.events.on(
        'ask',
        askHandler
    );

    window.events.on(
        'correct',
        correctHandler
    );

    window.events.on(
        'wrong',
        wrongHandler
    );

    var start = document.querySelector('.start');
    var reset = document.querySelector('.reset');
    red.button = document.querySelector('.red');
    purple.button = document.querySelector('.purple');
    blue.button = document.querySelector('.blue');
    green.button = document.querySelector('.green');

    red.name = 'red';
    purple.name = 'purple';
    blue.name = 'blue';
    green.name = 'green';

    start.addEventListener(
        'click',
        startGame
    );

    red.button.addEventListener(
        'click',
        clickHandler
    );

    purple.button.addEventListener(
        'click',
        clickHandler
    );

    blue.button.addEventListener(
        'click',
        clickHandler
    );

    green.button.addEventListener(
        'click',
        clickHandler
    );

    reset.addEventListener(
        'click',
        resetGame
    );
}

function startGame(){
    add();
}

function resetGame(){
    console.log('the game will be reset');
}

function clickHandler(e){
    console.log(this.className);
    if(answer === true){
        play(200);
        answer = false;
        answerHandler(0);
    }
}


function add(){

    simonStored.unshift(Math.round((Math.random() * 100) % 3));
    simon = simonStored.slice();

    console.log('stored array :',simonStored);

    window.events.trigger(
        'ask'
    );
}

function askHandler(){
    if(simon.length === 0){
        simon = simonStored.slice();
        answer = true;
        return;
    }
    switch (simon[0]) {
        case 0:
            purple.button.classList.toggle('on');
            play(200);
            setTimeout(
                function(){
                    purple.button.classList.toggle(
                        'on'
                    );
                    simon.shift();
                    window.events.trigger(
                        'ask'
                    );
                },
                800
            );
            break;
        case 1:
            red.button.classList.toggle('on');
            play(225);
            setTimeout(
                function(){
                    red.button.classList.toggle(
                        'on'
                    );
                    simon.shift();
                    window.events.trigger(
                        'ask'
                    );
                },
                800
            );
            break;
        case 2:
            blue.button.classList.toggle('on');
            play(250);
            setTimeout(
                function(){
                    blue.button.classList.toggle(
                        'on'
                    );
                    simon.shift();
                    window.events.trigger(
                        'ask'
                    );
                },
                800
            );
            break;
        case 3:
            green.button.classList.toggle('on');
            play(275);
            setTimeout(
                function(){
                    green.button.classList.toggle(
                        'on'
                    );
                    simon.shift();
                    window.events.trigger(
                        'ask'
                    );
                },
                800
            );
            break;
    }
}

function answerHandler(answer){
    if (Number(answer) == simon[0]){
        window.events.trigger(
            'correct'
        );
    }else{
        window.events.trigger(
            'wrong'
        );
    }
}

function correctHandler(){
    simon.shift();
    answer = true;
    if(simon.length === 0){
        add();
        return;
    }
}

function wrongHandler(){
    console.log('wrong');
    simonStored = [];
    simon = [];
    add();
}

function play(freq){
    window.AudioContext = window.AudioContext;
    var context = new AudioContext();
    var sound = context.createOscillator();
    sound.connect(context.destination);
    sound.frequency.value = freq;

    sound.start(0);
    sound.stop(0.5);
    sound.onended = function closeContext(){
        context.close();
    };
}
