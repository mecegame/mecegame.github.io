// pre SQL
var gameParameter = {
    priceSens: 50 
    , marketingSens: 25 
    , qualitySens: 25 
    , bankPercent: 25 
    , industryChanges: 3
    , tax: 25
    , fullSales: 30
    , zeroSales: 50
    , dayNow: 0
    , allDay: 10
    , stepOfPlayer: 0
    , industrySupply: 2000
    , playerNow: 1
    , totalMarketing: 0
    , TQI: 0
    , avgPrice: 0
, }

var playerList = [
    // {
    // 	name:'1',
    // 	industryPower:1000,
    // 	marketing:100,
    // 	quality:0,
    // 	balance:10000,
    // 	price:40,
    // 	deprecation:2000,
    // 	buferProduct:0,
    // 	pointsPerPeriod:0,
    // 	salesPerPeriod:0,
    // },

]
    //for dom changing
var playerOnScreen = 0;

function addNewPlayer() {
    playerOnScreen++;
    $('.playerList').append('<div class="oneOfPlayer" id=s' + playerOnScreen + '><p>Player Name ' + playerOnScreen + '</p><form action=""><input id="a' + playerOnScreen + '" value="name' + playerOnScreen + '" type="text"></form></div>');

}
//addNewPlayer();
addNewPlayer();
addNewPlayer();

function nextStep() {

    $('#playerCreate')[0].style.display = 'none';
    $('#gameParameter')[0].style.display = 'block';


}

function goButton() {
    $('#gameParameter')[0].style.display = 'none';
    $('#playPeriod')[0].style.display = 'block';
    //changing game parameter
    gameParameter.industryChanges = +$('#industryInNextPeriod')[0].value;
    gameParameter.tax = +$('#TaxLevel')[0].value;
    gameParameter.industrySupply = +$('#supply')[0].value;
    gameParameter.bankPercent = +$('#bankPercent')[0].value;
    var tempIndustryPower = +$('#productPerPlayer')[0].value;
    for (var i = 1; i <= playerOnScreen; i++) {
        playerList.push({
            name: $('#a' + i)[0].value
            , industryPower: +$('#productPerPlayer')[0].value
            , marketing: 100
            , quality: 100
            , balance: 0
            , price: 30
            , deprecation: +$('#productPerPlayer')[0].value * 2
            , buferProduct: 0
            , pointsPerPeriod: 0
            , salesPerPeriod: 0
            , income: 0
            , maxSales: 0
            , PUS: 0
            , TCUS: 0
            , MUS: 0
            , capitalInvestment: 0
            , totalAssets: 0
            , orderReceived: 0
            , cogs: 0
            , grossMargin: 0
            , tax: 0
            , profitBeforeTax: 0
        , });

    }
    setFormValue();
    tak();

}
//nextStep();
//goButton();
//////////////////////////////////////////////////
//////////////////////////////////////////////////

function hideglobal() {
    $('.global')[0].style.display = 'none';
    $('#hidenTik')[0].style.display = 'block';
}


function unHideglobal() {
    $('.global')[0].style.display = 'block';
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


//tak();
function setFormValue() {

    $('#fPrice')[0].value = playerList[gameParameter.playerNow - 1].price;
    $('#fMarketing')[0].value = playerList[gameParameter.playerNow - 1].marketing;
    $('#fDepresation')[0].value = playerList[gameParameter.playerNow - 1].deprecation;
    $('#fQuality')[0].value = playerList[gameParameter.playerNow - 1].quality;

}

function tak() {
    unHideglobal();
    $('#name')[0].innerHTML = playerList[gameParameter.playerNow - 1].name;
    ////prediction
    $('#industryChanges')[0].innerHTML = gameParameter.industryChanges + ' %';

    if ($('#priceSens').length === 0) {
        $('.prediction').append('<p id="priceSens">' + 'price sens : ' + gameParameter.priceSens + '</p>');
        $('.prediction').append('<p id="marketingSens">' + 'marketing sens : ' + gameParameter.marketingSens + '</p>');
        $('.prediction').append('<p id="qualitySens">' + 'quality sens : ' + gameParameter.qualitySens + '</p>');
        $('.prediction').append('<p id="Tax">' + 'tax  : ' + gameParameter.tax + '</p>');
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
    $('#CI')[0].innerHTML = Math.round(playerList[gameParameter.playerNow - 1].capitalInvestment * 100) / 100;
    $('#TA')[0].innerHTML = playerList[gameParameter.playerNow - 1].totalAssets;
    $('#sales')[0].innerHTML = playerList[gameParameter.playerNow - 1].salesPerPeriod * playerList[gameParameter.playerNow - 1].price;
    $('#quality')[0].innerHTML = playerList[gameParameter.playerNow - 1].quality;
    $('#marketing')[0].innerHTML = playerList[gameParameter.playerNow - 1].marketing;
    $('#PBT')[0].innerHTML = playerList[gameParameter.playerNow - 1].profitBeforeTax;
    $('#tax')[0].innerHTML = playerList[gameParameter.playerNow - 1].tax;
    function calcIndustry(){
        //sum price
        var priceSum = 0;
        for (var i = 0; i < playerList.length; i++) {
            priceSum = priceSum + playerList[i].price;
        }
        gameParameter.avgPrice = priceSum/playerList.length;
        var marketingSum = 0;
        for (var i = 0; i < playerList.length; i++) {
            marketingSum = marketingSum + playerList[i].marketing;
        }
        gameParameter.totalMarketing = marketingSum;
        var qualitySum = 0;
        for (var i = 0; i < playerList.length; i++) {
            qualitySum = qualitySum + playerList[i].quality;
        }
        gameParameter.TQI = qualitySum;
    }   

    calcIndustry();
    $('#avgPrice')[0].innerHTML = gameParameter.avgPrice;
    $('#totalMarketing')[0].innerHTML = gameParameter.totalMarketing;
    $('#TQI')[0].innerHTML = gameParameter.TQI; 

    /////}

    $('#industySupply')[0].innerHTML = gameParameter.industrySupply;

    function calcDemand() {
        var tempSum = 0;
        for (var i = 0; i < playerList.length; i++) {
            tempSum = tempSum + playerList[i].industryPower;
        }
        return tempSum;
    }

    $('#industryDemand')[0].innerHTML = calcDemand();

    setFormValue();

}




function startCalcResult() {
    'use strict'
    var priceSum = 0;
    var marketingSum = 0;
    var qualitySum = 0;
    for (var a = 0; a < playerList.length; a++) {
        marketingSum = marketingSum + +playerList[a].marketing;
        playerList[a].salesPerPeriod = 0;
        playerList[a].pointsPerPeriod = 0;
    }
    for (var b = 0; b < playerList.length; b++) {
        qualitySum = qualitySum + +playerList[b].quality;

        //////////////////////////////////////
    }


    for (var i = 0; i < playerList.length; i++) {
        // calc sales for each player
        if (playerList[i].price < gameParameter.zeroSales && playerList[i].price > 0) {
            var pricePoint = calcPricePoint(playerList[i]);
            priceSum = priceSum + pricePoint;
            playerList[i].pointsPerPeriod = playerList[i].pointsPerPeriod + pricePoint;

            playerList[i].maxSales = tempQuatity;
        }
    }
    for (var i = 0; i < playerList.length; i++) {
        if (playerList[i].pointsPerPeriod == 0) {
            continue;
        }
        console.log(marketingSum);
        var marketingPoint = calcMarketingPoint(playerList[i], marketingSum, priceSum);

        playerList[i].pointsPerPeriod = playerList[i].pointsPerPeriod + marketingPoint;
    }
    for (var i = 0; i < playerList.length; i++) {
        if (playerList[i].pointsPerPeriod == 0) {
            continue;
        }
        var qualityPoint = calcQualityPoint(playerList[i], qualitySum, priceSum);
        playerList[i].pointsPerPeriod = playerList[i].pointsPerPeriod + qualityPoint;
    }



    function salesTime() {
        var calcAllPoint = 0;
        for (var i = 0; i < playerList.length; i++) {
            calcAllPoint = calcAllPoint + playerList[i].pointsPerPeriod;
        }

        // product per player 
        for (var i = 0; i < playerList.length; i++) {
            var percentOfIndustry = (playerList[i].pointsPerPeriod / calcAllPoint).toFixed(3);
            playerList[i].salesPerPeriod = Math.round(gameParameter.industrySupply * percentOfIndustry);
            if (playerList[i].salesPerPeriod > (playerList[i].industryPower + playerList[i].buferProduct)) {
                playerList[i].salesPerPeriod = (playerList[i].industryPower + playerList[i].buferProduct);
            }
            if ((gameParameter.industrySupply * percentOfIndustry) > playerList[i].maxSales) {
                playerList[i].salesPerPeriod = playerList[i].maxSales;
            }
            playerList[i].orderReceived = Math.round(gameParameter.industrySupply * percentOfIndustry);
            console.log(playerList[i].salesPerPeriod);

        }
    }
    salesTime();

    function industryChanges() {
        gameParameter.industrySupply = Math.round(gameParameter.industrySupply * (1 + (gameParameter.industryChanges / 100)));
    }
    industryChanges();


    function calcBuffer() {
        for (var i = 0; i < playerList.length; i++) {
            playerList[i].buferProduct = +playerList[i].buferProduct + (+playerList[i].industryPower - +playerList[i].salesPerPeriod);

        }
    }
    calcBuffer();

    function calcInvesting() {
        for (var i = 0; i < playerList.length; i++) {

            var tempDepresation = playerList[i].deprecation;
            var deprecationNeed = playerList[i].industryPower * 2;

            var deltaDepresation = tempDepresation - deprecationNeed;
            var destoyedIndustry = Math.floor(deltaDepresation / 40);

            playerList[i].industryPower = playerList[i].industryPower + destoyedIndustry;

        }
    }
    calcInvesting();

    function calcIncome() {
        for (var i = 0; i < playerList.length; i++) {
            var tempSales = +playerList[i].salesPerPeriod * playerList[i].price;
            playerList[i].sales = tempSales;
            var tempWaste = +playerList[i].industryPower * 18;
            playerList[i].cogs = tempWaste;
            var tempBufferCost = +playerList[i].buferProduct * 2;
            var tempWasteMarketingAndOther = +(+playerList[i].marketing) + (+playerList[i].quality);
            var tempWasteForDepresation = (+playerList[i].deprecation);
            var allWaste = +tempWaste + tempBufferCost + +tempWasteMarketingAndOther + +tempWasteForDepresation;
            playerList[i].TCUS = Math.round((+tempWaste + +tempWasteMarketingAndOther) / playerList[i].salesPerPeriod * 100) / 100;

            playerList[i].MUS = playerList[i].price - playerList[i].TCUS;

            var profitBeforeTax = +tempSales - +allWaste;
            console.log(profitBeforeTax);
            playerList[i].profitBeforeTax = profitBeforeTax;
            if(playerList[i].profitBeforeTax > 0){
            	playerList[i].tax = profitBeforeTax * gameParameter.tax / 100;
            var netProfit = profitBeforeTax * (100 - gameParameter.tax) / 100;
        	}else{
        		playerList[i].tax = 0;
        		netProfit = profitBeforeTax;
        	}

            console.log(netProfit);
            playerList[i].income = netProfit;
        }

    }
    calcIncome();

    function calcBalance() {
        for (var i = 0; i < playerList.length; i++) {
            playerList[i].balance = playerList[i].balance + playerList[i].income;
            playerList[i].capitalInvestment = playerList[i].industryPower * 40;
            playerList[i].totalAssets = playerList[i].capitalInvestment + playerList[i].balance;
        }
    }

    calcBalance();

}




// tik();
// tak();
// tik();
// tak();
// tik();
// tak();
var tempQuatity = 0;

function calcPricePoint(playerStat) {
    tempQuatity = 0;
    'use strict'
    var price = playerStat.price;
    var productPerDaltaPoor = Math.round(gameParameter.industrySupply / (gameParameter.zeroSales - gameParameter.fullSales));


    var quantity = (gameParameter.zeroSales - price) * productPerDaltaPoor;
    tempQuatity = quantity;
    console.log(quantity);
    return Math.round(quantity * gameParameter.priceSens);
}

function calcMarketingPoint(playerStat, Msum, Psum) {
    'use strict'
    var marketing = playerStat.marketing;
    var percentOfIndustry = marketing / Msum;
    Psum = Psum * (100 / gameParameter.priceSens);
    var allPointsOfMarkiting = Psum * gameParameter.marketingSens / 100;
    console.log(allPointsOfMarkiting);
    var marketingPoint = allPointsOfMarkiting * percentOfIndustry;
    return Math.round(marketingPoint);
}

function calcQualityPoint(playerStat, Msum, Psum) {
    'use strict'
    var quality = playerStat.quality;
    var percentOfIndustry = quality / Msum;
    Psum = Psum * (100 / gameParameter.priceSens);

    var allPointsOfMarkiting = Psum * gameParameter.qualitySens / 100;
    // console.log(allPointsOfMarkiting);
    var qualityPoint = allPointsOfMarkiting * percentOfIndustry;

    return Math.round(qualityPoint);
}
