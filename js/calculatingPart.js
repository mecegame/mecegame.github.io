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
        gameParameter.dayNow++;
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
            var tempWaste = +playerList[i].industryPower * playerList[i].pricePerProduct;
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
            if (playerList[i].balance<0) {
                var tempCredit = playerList[i].balance*(-1);
                tempCredit = tempCredit *(1+(gameParameter.bankPercent/100));
                playerList[i].credit = tempCredit;
                playerList[i].balance = playerList[i].balance*(1+(gameParameter.bankPercent/100));
            }else{
                playerList[i].credit = 0;
            }

            if (playerList[i].balance< (-1)*gameParameter.creditLine && gameParameter.dayNow >0 && playerList[i].lose == false ) {
                playerList[i].lose = 1;
                playerList[i].name = playerList[i].name + ' lose';
            }
            playerList[i].capitalInvestment = playerList[i].industryPower * 40;
            playerList[i].totalAssets = playerList[i].capitalInvestment + playerList[i].balance;
        }
    }

    calcBalance();
    function calcIndustry(){
        //sum price
        var priceSum = 0;
        for (var i = 0; i < playerList.length; i++) {
            priceSum = priceSum + +playerList[i].price;
            console.log(priceSum);
        }
        gameParameter.avgPrice = +priceSum/playerList.length;
        var marketingSum = 0;
        for (var i = 0; i < playerList.length; i++) {
            marketingSum = marketingSum + +playerList[i].marketing;
            console.log(marketingSum);
        }
        gameParameter.totalMarketing = marketingSum;
        var qualitySum = 0;
        for (var i = 0; i < playerList.length; i++) {
            qualitySum = qualitySum + +playerList[i].quality;
        }
        gameParameter.TQI = qualitySum;
    }   

    calcIndustry();

}


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
