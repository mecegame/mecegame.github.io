function addNewPlayer() {
    playerOnScreen++;
    $('.playerList').append('<div class="oneOfPlayer" id=s' + playerOnScreen + '><p>Player Name ' + playerOnScreen + '</p><form action=""><input id="a' + playerOnScreen + '" value="name' + playerOnScreen + '" type="text"></form></div>');

}
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
    gameParameter.creditLine = +$('#creditLine')[0].value;
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
            , credit: 0
            , pricePerProduct: 18
            , lose: 0
        , });

    }
    setFormValue();
    tak();
}
