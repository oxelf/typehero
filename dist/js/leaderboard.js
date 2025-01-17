import{showSelect as c}from"./select.js";import{applyTheme as g}from"./theme.js";let m=["rose_pine","rose_pine_dawn","8008","forest","retro_light","carbon"];async function p(o,t,r){return await(await fetch(`https://typehero.oxelf.dev/leaderboard?mode=${o}&wordAmount=${r}&language=${t}`,{})).json()}export async function populateLeaderboard(o,t,r){let l=t+" - ";o=="quote"?l+="Quotes":l+=r.toString()+" Words",document.getElementById("leaderboard-title").innerText=l;let d=await p(o,t,r),i=document.querySelector(".leaderboard-table");i.innerHTML=`
<tr>
          <th>Rank</th>
            <th>Name</th>
            <th style="width: 100px">WPM</th>
            <th style="width: 100px">Accuracy</th>
            <th style="width: 200px">Date</th>
        </tr>
`,d.sort((e,a)=>e.rank-a.rank),d.forEach(e=>{let a=new Date(e.date),h=`${a.getDate()}/${a.getMonth()+1}/${a.getFullYear()}`;i.innerHTML+=`
<tr>
          <td>${e.rank}</td>
            <td>${e.userName}</td>
            <td style="width: 100px;">${e.wpm.toFixed(2)}</td>
            <td style="width: 100px">${e.accuracy.toFixed(2)}</td>
            <td style="width: 200px;">${h}</td>
        </tr>
        `})}let u=document.getElementById("theme-button");u.onclick=function(){let o=localStorage.getItem("theme")||"rose_pine";c(m,o,function(t){console.log("selected theme: ",t),localStorage.setItem("theme",t),g()},function(){})};let w=localStorage.getItem("typing-language")||"english",n=parseInt(localStorage.getItem("typing-words"))||25,s=localStorage.getItem("typing-mode")||"words";n=s=="quote"?0:n,populateLeaderboard(s,w,n);
