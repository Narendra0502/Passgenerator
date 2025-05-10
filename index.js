const passdisplay=document.querySelector('[ data-passwordDisplay]');
const lengthNumber=document.querySelector('[data-lengthNumber]');
const slider=document.querySelector('[ data-lengthslider]');
const copymsg=document.querySelector('[ data-copyMsg]');
const copybtn=document.querySelector('[ data-copy]');
const upparcasecheck=document.querySelector('#uppercase');
const lowercasecheck=document.querySelector('#lowercase');
const numberscheck=document.querySelector('#numbers');
const symbolscheck=document.querySelector('#symbols');
const strengthindicator=document.querySelector('[ data-strength]');
const genbtn=document.querySelector('.generate-btn');
const allcheck=document.querySelectorAll('input[type="checkbox"]');
let password="";
let passlen=10;
let checkcount=0;
let symbols="!@#$%^&*()_+";
handleslider();
function handleslider(){
    slider.value=passlen;
    lengthNumber.innerText=passlen;
    const min=slider.min;
    const max=slider.max;
    slider.style.backgroundSize=((passlen-min)*100/(max-min))+"% 100%";
}
colorindicator("#ccc");
function colorindicator(color){
      strengthindicator.style.backgroundColor=color;
}
function getranint(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function getrannum(){
    return getranint(0,9);
}
function getlowran(){
    return String.fromCharCode(getranint(97,123));
}
function getupran(){
    return String.fromCharCode(getranint(65,91));
}
function getsymbolran(){
    const randind=getranint(0,symbols.length);
    return symbols.charAt(randind);
}
function shufflepassword(password){
    for(let i=password.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
      const temp=password[i];;
      password[i]=password[j];
        password[j]=temp;
    }
    let str="";
    password.forEach(char=>str+=char);
    return str;
}

function generatepassword(){
    let upr=false;
    let low=false;
    let num=false;
    let sym=false;
    if(upparcasecheck.checked){
        upr=true;
    }   
    if(lowercasecheck.checked){
        low=true;
    }   
    if(numberscheck.checked){   
        num=true;
    }   
    if(symbolscheck.checked){
        sym=true;
    }   
    if(upr && low && (num||sym)&& passlen>=8){
        colorindicator("green");
    }
    else if((upr || low) && (num||sym)&& passlen>=6){
    
        colorindicator("red");
    }
    else{
        colorindicator("grey");
    }
}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passdisplay.value);
        copymsg.innerText="Copied";
    }
    catch(e){
        copymsg.innerText="Failed";
    }
    copymsg.classList.add('active');
    setTimeout(()=>{
        copymsg.classList.remove('active');
        
    },3000);
}
function checkboxcnt(){
  checkcount=0;
  allcheck.forEach((checkbox)=>{
    if(checkbox.checked){
        checkcount++;
    }
  });
  if(checkcount>passlen){
    passlen=checkcount;
    handleslider();
  }
}
allcheck.forEach((checkbox)=>{
    checkbox.addEventListener('click',checkboxcnt);
});
slider.addEventListener('input',(e)=>{
    passlen = parseInt(e.target.value);  // Convert to integer
    handleslider();
});
copybtn.addEventListener('click',()=>{
    if(passdisplay.value){
        copycontent();
    }
});
genbtn.addEventListener('click',()=>{
    if(checkcount<=0) return;
    if(passlen<checkcount){
        passlen=checkcount;
        handleslider();
    }
    password="";
    let funarr=[];
    if(upparcasecheck.checked){
        funarr.push(getupran);
    }
    if(lowercasecheck.checked){ 
        funarr.push(getlowran);
    }
    if(numberscheck.checked){
        funarr.push(getrannum);
    }
    if(symbolscheck.checked){
        funarr.push(getsymbolran);
    }
    for(let i=0;i<passlen-funarr.length;i++){
       let randidx=getranint(0,funarr.length);
       password+=funarr[randidx]();
    }
    password=shufflepassword(Array.from(password));
    passdisplay.value=password;
    generatepassword();
});