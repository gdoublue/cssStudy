const rows = document.querySelectorAll('#ui ul li')
const html = document.documentElement
document.addEventListener('scroll',(e)=>{
    let scrolled = html.scrollTop+html.clientHeight
    for(let[index,row] of rows.entries()){
        let cc =  (html.clientHeight - row.getBoundingClientRect().top )
        if ( cc > 0){
            let progress =cc / row.clientHeight
            console.log('>',progress)
            progress =  progress >= 1 ? 1 : progress.toFixed(2)
            row.style.setProperty('--progress',progress)
        }else{
            row.style.setProperty('--progress',0)
        }

    }
})
