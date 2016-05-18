function flashingHidden(fromDiv, toDiv){
    console.log($('.' +fromDiv)[0]);
    $('#' +fromDiv)[0].className= ('animated bounceOutLeft');
    $('#' +fromDiv)[0].style.display='none';
    $('#' +toDiv)[0].style.display='block';
    
}

function hideglobal() {
    $('#global')[0].style.display = 'none';
    $('#hidenTik')[0].style.display = 'block';
}

function unHideglobal() {
    $('#global')[0].style.display = 'block';
    $('#hidenTik')[0].style.display = 'none';
}

function tik() {
    if ($('#fPrice')[0].value>0 && $('#fMarketing')[0].value>0 && $('#fDepresation')[0].value>0 && $('#fQuality')[0].value>0){ 
    hideglobal();
    playerList[gameParameter.playerNow - 1].price = $('#fPrice')[0].value;
    playerList[gameParameter.playerNow - 1].marketing = $('#fMarketing')[0].value;
    playerList[gameParameter.playerNow - 1].deprecation = $('#fDepresation')[0].value;
    playerList[gameParameter.playerNow - 1].quality = $('#fQuality')[0].value;
    if (gameParameter.playerNow == playerOnScreen) {
        gameParameter.playerNow = 0
        startCalcResult();
    }
    gameParameter.playerNow++;
    }
}

function setFormValue() {
    $('#fPrice')[0].value = playerList[gameParameter.playerNow - 1].price;
    $('#fMarketing')[0].value = playerList[gameParameter.playerNow - 1].marketing;
    $('#fDepresation')[0].value = playerList[gameParameter.playerNow - 1].deprecation;
    $('#fQuality')[0].value = playerList[gameParameter.playerNow - 1].quality;
}

function tak() {
    unHideglobal();
       console.log(playerList[gameParameter.playerNow - 1]);
    for (var key in playerList[gameParameter.playerNow - 1] ) {
        if(!$.isNumeric(playerList[gameParameter.playerNow - 1][key])){
            if (typeof playerList[gameParameter.playerNow - 1][key] != 'string') {
                playerList[gameParameter.playerNow - 1][key] = 0;
            console.log(playerList[gameParameter.playerNow - 1][key]);
            }
            
        }
    }
    $('#name')[0].innerHTML = playerList[gameParameter.playerNow - 1].name;
    $('#industryChanges')[0].innerHTML = gameParameter.industryChanges + ' %';
    if ($('#priceSens').length === 0) {
        $('.prediction').append('<p id="priceSens">' + 'price sens : ' + gameParameter.priceSens + '</p>');
        $('.prediction').append('<p id="marketingSens">' + 'marketing sens : ' + gameParameter.marketingSens + '</p>');
        $('.prediction').append('<p id="qualitySens">' + 'quality sens : ' + gameParameter.qualitySens + '</p>');
        $('.company').prepend('<p id="Tax">' + 'Tax  : <strong>' + gameParameter.tax + ' % </strong></p>');
    }
    ////// company
    $('#bankBalance')[0].innerHTML = playerList[gameParameter.playerNow - 1].balance;
    $('#industryPlayer')[0].innerHTML = playerList[gameParameter.playerNow - 1].industryPower;
    $('#productSalent')[0].innerHTML = playerList[gameParameter.playerNow - 1].buferProduct;
    $('#income')[0].innerHTML = playerList[gameParameter.playerNow - 1].income;
    $('#depresation')[0].innerHTML = playerList[gameParameter.playerNow - 1].deprecation;
    /////
    $('#PUS')[0].innerHTML = Math.round(playerList[gameParameter.playerNow - 1].price * 100) / 100;
    $('#TCUS')[0].innerHTML = Math.round(playerList[gameParameter.playerNow - 1].TCUS * 100) / 100;
    $('#MUS')[0].innerHTML = Math.round(playerList[gameParameter.playerNow - 1].MUS * 100) / 100;
    $('#orderReceived')[0].innerHTML = playerList[gameParameter.playerNow - 1].orderReceived;
    $('#playerSales')[0].innerHTML = playerList[gameParameter.playerNow - 1].salesPerPeriod;
    if ($('#orderReceived')[0].innerHTML <= $('#playerSales')[0].innerHTML) {
        $('#UO')[0].innerHTML = 0;
    } else {
        $('#UO')[0].innerHTML = Math.round($('#orderReceived')[0].innerHTML - $('#playerSales')[0].innerHTML);
    }
    $('#PPU')[0].innerHTML = playerList[gameParameter.playerNow - 1].pricePerProduct +' $';
    
    $('#CI')[0].innerHTML = Math.round(playerList[gameParameter.playerNow - 1].capitalInvestment * 100) / 100;
    $('#TA')[0].innerHTML = playerList[gameParameter.playerNow - 1].totalAssets;
    $('#sales')[0].innerHTML = playerList[gameParameter.playerNow - 1].salesPerPeriod * playerList[gameParameter.playerNow - 1].price;
    $('#quality')[0].innerHTML = playerList[gameParameter.playerNow - 1].quality;
    $('#marketing')[0].innerHTML = playerList[gameParameter.playerNow - 1].marketing;
    $('#PBT')[0].innerHTML = playerList[gameParameter.playerNow - 1].profitBeforeTax;
    $('#tax')[0].innerHTML = playerList[gameParameter.playerNow - 1].tax;
    $('#avgPrice')[0].innerHTML = Math.round( gameParameter.avgPrice);
    $('#totalMarketing')[0].innerHTML = Math.round( gameParameter.totalMarketing);
    $('#TQI')[0].innerHTML = Math.round( gameParameter.TQI); 
    /////}
    $('#bankPercentG')[0].innerHTML = gameParameter.bankPercent;
    $('#credit')[0].innerHTML = playerList[gameParameter.playerNow-1].credit;
    function calcDemand() {
        var tempSum = 0;
        for (var i = 0; i < playerList.length; i++) {
            tempSum = tempSum + playerList[i].industryPower;
        }
        return tempSum;
    }
    $('#industySupply')[0].innerHTML = gameParameter.industrySupply;
    $('#industryDemand')[0].innerHTML = calcDemand();
    setFormValue();
}

window.onload = zeroPointFix;
function zeroPointFix(){
        console.log(playerList.length);
    for (var i = 0; i < playerList.length; i++) {
        tik();
        tak();
    }
};
