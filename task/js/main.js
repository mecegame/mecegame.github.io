// localStorage.removeItem('vim');
var tempObj = {
    // vim: [] ,
    // imp: [],
    // nim: [],
    // rut: [],
}
var preStartArr = ['vim','imp','nim','rut'];
    for (var a = 0; a < preStartArr.length; a++) {
if (localStorage.getItem(preStartArr[a])) {
    tempObj[preStartArr[a]] = JSON.parse(localStorage.getItem(preStartArr[a]));
    for (var i = 0; i < tempObj[preStartArr[a]].length; i++) {
        // if (tempObj.vim[i] == null) {
        //     tempObj.vim.splice(i,1);
        // }
       if (typeof tempObj[preStartArr[a]][i] =='string' && tempObj[preStartArr[a]][i].length != 0 ) {
      console.log(tempObj);
        $('#'+preStartArr[a]+'B').append('<div class="nothing col-lg-3"></div><div class="col-lg-6"><div class="input-group"><span class="input-group-addon"><input id="'+preStartArr[a]+'C'+i+'" onclick="crossLine(event);" type="checkbox" aria-label="..."></span><p  id="'+preStartArr[a]+'P'+i+'" class="form-control" aria-label="...">'+tempObj[preStartArr[a]][i] +'</p></div></div>');
       }
        continue;   
    }
}else{
    console.log('eeu');
    tempObj[preStartArr[a]] = [];
}
    }
function addNewTask(a, b) {
   console.log(a,b);
        tempObj[b].push($(a)[0].value);
        console.log( $('#'+b+'B'));
        $('#'+b+'B').append('<div class="nothing col-lg-3"></div><div class="col-lg-6"><div class="input-group"><span class="input-group-addon"><input id="'+b+'C'+ tempObj[b].length+'" onclick="crossLine(event);" type="checkbox" aria-label="..."></span><p  id="'+b+'P'+tempObj[b].length+'" class="form-control" aria-label="...">'+tempObj[b][tempObj[b].length-1] +'</p></div></div>');
        localStorage.setItem(b,JSON.stringify(tempObj[b]));
    
    refreshList();
}
function refreshList(){
}
function crossLine(event){
    $('#'+$(event.target.id).selector.substr(0,3)+'P'+$(event.target.id).selector.substr(4,3) )[0].style.textDecoration ='line-through';
    console.log($(event.target.id).selector.substr(0,3));
    delete tempObj[$(event.target.id).selector.substr(0,3)][$(event.target.id).selector.substr(4,3)];//.splice(+($(event.target.id).selector.substr(4,3)-1),1) ;
        localStorage.setItem($(event.target.id).selector.substr(0,3),JSON.stringify(tempObj[$(event.target.id).selector.substr(0,3)]));
    }