var playerInput = document.getElementById("player-input");
var addPlayerBtn = document.getElementById("add-player-btn");
var playerListHtml = document.getElementById("player-list");
var generateTeamsBtn = document.getElementById("generate-teams-btn");

if(localStorage.getItem('playerList')){
    var playerList = localStorage.getItem('playerList').split(',');
    displayPlayerList(playerList);
}else{
    var playerList = [];
}

addPlayerBtn.addEventListener('click', e => {
    if (playerInput.value !== '') {

        playerList.push(playerInput.value);
        playerInput.value = '';

        displayPlayerList(playerList)
    }
})

generateTeamsBtn.addEventListener('click', e => {
    generateTeam(playerList);
})

function displayPlayerList(players) {
    playerListHtml.innerHTML = '';
    players.forEach(player => {
        playerListHtml.innerHTML += `<li>${player} <button class="danger-btn" onclick="deleteUser('${player}')">Delete</button></li>`
    });
}

function generateTeam(playersList) {
    var randomPlayerList = [...playersList].sort(() => Math.random() - 0.5);
    var team1 = document.getElementById('team-1');
    team1.innerHTML = '';

    for (var i = 0; i <= Math.round(randomPlayerList.length / 2); i++) {
        team1.innerHTML += `<p>${randomPlayerList[0]}</p>`
        randomPlayerList.shift()
    }

    document.getElementById('team-2').innerHTML = randomPlayerList.map(player => `<p>${player}</p>`).join('')
}

const deleteUser = (userToDelete) => {
    playerList = playerList.filter(player => player !== userToDelete)
    displayPlayerList(playerList)
    generateTeam(playerList)
}

const savePlayerList = () => {
    localStorage.setItem('playerList', playerList);
}

const deletePlayerList = () => {
    localStorage.removeItem('playerList');
}
