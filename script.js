//elementos
const player_1_name = document.getElementById("player_1_name");
const player_1_score = document.getElementById("player_1_score");
const player_1_save = document.getElementById("player_1_save");
const player_1_symbol = document.getElementById("player_1_symbol");

const player_2_name = document.getElementById("player_2_name");
const player_2_score = document.getElementById("player_2_score");
const player_2_save = document.getElementById("player_2_save");
const player_2_symbol = document.getElementById("player_2_symbol");
//

const camps = document.getElementsByName("camp");
const turn = document.getElementById("turn");
const turn_meta = document.getElementById("turn_meta");
let player_1 = {
    name : "Jogador 1",
    onGame : {
        status : false,
        turn : false,
    },
    score : 0,
    symbol : "⭕"
};
let player_2 = {
    name : "Jogador 2",
    onGame : {
        status : false,
        turn : false,
    },
    score : 0,
    symbol : "❌"
}

let turn_number = 0;

player_1_name.value = player_1.name;
player_2_name.value = player_2.name;
player_1_symbol.value = player_1.symbol;
player_2_symbol.value = player_2.symbol;

const hadleWinner = setInterval(() =>{
    if(Number(player_1_score.children[0].textContent) > Number(player_2_score.children[0].textContent)){
        player_1_score.classList = "camp_subtitle winner";
        player_2_score.classList = "camp_subtitle loser";
        return 0;
    }
    else if(Number(player_1_score.children[0].textContent) == Number(player_2_score.children[0].textContent)){
        return 1;
    }
    player_2_score.classList = "camp_subtitle winner";
    player_1_score.classList = "camp_subtitle loser";
},1);

const addPoint = (callback) =>{
    eval(`${callback.winner}.score++`);
    eval(`${callback.winner}_score.children[0].textContent = ${callback.winner}.score`);
    camps.forEach((value) =>{
        value.textContent = "";
    })
    turn_number = 0
};

const checkGame = (target) =>{
    const mirror = target.textContent;
    if(camps[0].textContent == mirror && camps[1].textContent == mirror && camps[2].textContent == mirror){

    }
    else if(camps[3].textContent == mirror && camps[4].textContent == mirror && camps[5].textContent == mirror){

    }
    else if(camps[6].textContent == mirror && camps[7].textContent == mirror && camps[8].textContent == mirror){

    }
    else if(camps[0].textContent == mirror && camps[3].textContent == mirror && camps[6].textContent == mirror){

    }
    else if(camps[1].textContent == mirror && camps[4].textContent == mirror && camps[7].textContent == mirror){

    }
    else if(camps[2].textContent == mirror && camps[5].textContent == mirror && camps[8].textContent == mirror){

    }
    else if(camps[0].textContent == mirror && camps[4].textContent == mirror && camps[8].textContent == mirror){

    }
    else if(camps[2].textContent == mirror && camps[4].textContent == mirror && camps[6].textContent == mirror){

    }
    else{
        return false
    }
    const callback = {type : true, winner : turn_meta.textContent};
    return callback
};

player_1_save.addEventListener("click",(event) =>{
    event.preventDefault();
    player_1.name = player_1_name.value;
    player_1.symbol = player_1_symbol.value;
    player_1_score.firstChild.textContent = player_1.name + ": ";
    if(player_1.symbol == "❌"){player_2.symbol = "⭕"; player_2_symbol.value = player_2.symbol; return 0}
    player_2.symbol = "❌";
    player_2_symbol.value = player_2.symbol;
});
player_2_save.addEventListener("click",(event) =>{
    event.preventDefault();
    player_2.name = player_2_name.value;
    player_2.symbol = player_2_symbol.value;
    player_2_score.firstChild.textContent = player_2.name + ": ";
    if(player_2.symbol == "❌"){player_1.symbol = "⭕"; player_1_symbol.value = player_1.symbol; return 0}
    player_1.symbol = "❌";
    player_1_symbol.value = player_1.symbol;
});

camps.forEach((value) =>{
    value.addEventListener("click",({target}) =>{
        if(player_1.onGame.status && player_2.onGame.status && target.textContent == ""){
            if(player_2.onGame.turn){
                turn.textContent = player_1.name
                turn_meta.textContent = "player_1";
            }
            else{
                turn.textContent = player_2.name
                turn_meta.textContent = "player_2";
            }
            target.textContent = eval(`${turn_meta.textContent}.symbol`);
            player_1.onGame.turn = !player_1.onGame.turn;
            player_2.onGame.turn = !player_2.onGame.turn;
            turn_number++
            const callback = checkGame(target)
            callback.type == true ? addPoint(callback) : false;
            if(turn_number == 9){
                camps.forEach((value) =>{
                    value.textContent = "";
                })
                turn_number = 0
            }
            return 0;
        }
        else if(player_1.onGame.status && player_2.onGame.status && target.textContent != ""){alert("esta casa já está marcada");return false}
        player_1.onGame.status = true;
        player_1.onGame.turn = true;
        player_2.onGame.status = true;
        target.click();
    });
});