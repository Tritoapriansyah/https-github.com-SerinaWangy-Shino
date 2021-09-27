if(body.slice(7).includes('--')) {
    var numberSearchWaifu0 = body.slice(7).trim().split('--')
    var numberSearchWaifu01 = Math.floor(numberSearchWaifu0)
    if(Number.isNaN(numberSearchWaifu01)) return ikyy.sendText(from, 'Parameter -- harus bernomer')
    if(numberSearchWaifu01 >= 6) return ikyy.sendText(from, 'Maks pencarian adalah 5')
    var numberSearchWaifu = numberSearchWaifu0[0]
} else {
    var numberSearchWaifu = body.slice(7)
}
var urlWaifuZeroChan = ''
const waifu1 = []
await fetch('https://www.zerochan.net/'+ encodeURIComponent(numberSearchWaifu) , { 
    method: 'get' 
}) 
.then(res => res.text()) 
.then(res => {
    const $ = cheerio.load(res)
    if($('p#fullMessage').text() == "No such tag. Back to Index") return console.log('Not Found')
    $("head").each((i, data1) => {
        $(data1).find("link").each(function(a, b) {
            if($(b).attr("rel") == ("canonical")) {
                urlWaifuZeroChan = $(b).attr('href')
            }
        })
    })
    $("#thumbs2").each((i, data) => {
        $(data).find("li").each(function(c, d) {
            $(d).find("p").each(function(e, f) {
                $(f).each(function(g, h) {
                    $(h).find("a").each(function(i, j) {
                        if($(j).attr('href').startsWith('http')) {
                            waifu1.push($(j).attr('href'))
                        }
                    })
                })
            })
        })
    })
})

// Jika url Zerochan bukan null, Maka scrape 10 halaman selanjutnya
if(urlWaifuZeroChan != '') {
    for(let i = 0; i < 9; i++) {
        await fetch(urlWaifuZeroChan + `?p=${i+1}` , { 
            method: 'get' 
        }) 
        .then(res => res.text()) 
        .then(res => {
            const $ = cheerio.load(res)
            $("#thumbs2").each((i, data) => {
                $(data).find("li").each(function(c, d) {
                    $(d).find("p").each(function(e, f) {
                        $(f).each(function(g, h) {
                            $(h).find("a").each(function(i, j) {
                                if($(j).attr('href').startsWith('http')) {
                                    waifu1.push($(j).attr('href'))
                                }
                            })
                        })
                    })
                })
            })
        })
    }
} else {
//Jika url Zerochan null, maka lakukan pencarian
await fetch('https://www.zerochan.net/search?q='+ encodeURIComponent(numberSearchWaifu) , { 
    method: 'get' 
}) 
.then(res => res.text()) 
.then(res => {
    const $ = cheerio.load(res)
    $("#content").each((i, data2) => {
        $(data2).find("p").each(function(k, l) {
            if($(l).attr('style') == 'text-align: center;' ) {
                if($(l).text() == 'Some content is for members only, please ') {
                    return console.log('Not Found2')
                }
            }
        })
    })
    $("head").each((i, data1) => {
        $(data1).find("link").each(function(a, b) {
            if($(b).attr("rel") == ("canonical")) {
                urlWaifuZeroChan = $(b).attr('href')
            }
        })
    })
    $("#thumbs2").each((i, data) => {
        $(data).find("li").each(function(c, d) {
            $(d).find("p").each(function(e, f) {
                $(f).each(function(g, h) {
                    $(h).find("a").each(function(i, j) {
                        if($(j).attr('href').startsWith('http')) {
                            waifu1.push($(j).attr('href'))
                        }
                    })
                })
            })
        })
    })
})

if(urlWaifuZeroChan != '') {
for(let i = 0; i < 9; i++) {
    await fetch(urlWaifuZeroChan + `?p=${i+1}` , { 
        method: 'get' 
    }) 
    .then(res => res.text()) 
    .then(res => {
        const $ = cheerio.load(res)
        $("#thumbs2").each((i, data) => {
            $(data).find("li").each(function(c, d) {
                $(d).find("p").each(function(e, f) {
                    $(f).each(function(g, h) {
                        $(h).find("a").each(function(i, j) {
                            if($(j).attr('href').startsWith('http')) {
                                waifu1.push($(j).attr('href'))
                            }
                        })
                    })
                })
            })
        })
    })
}
}
}
if(waifu1[0] == undefined || waifu1[0] == null) return ikyy.sendText(from, `*${body.slice(7)}* Tidak ditemukan`)
var waifu2 = waifu1[Math.floor(Math.random() * waifu1.length)]
if(body.slice(7).includes('--')) {
    const numberSpawnWaifu0 = body.slice(7).trim().split('--')
    const numberSpawnWaifu = Math.floor(numberSpawnWaifu0[1])
    if(numberSpawnWaifu == 'NaN') return ikyy.sendText(from, 'Parameter -- harus bernomer')
    if(numberSpawnWaifu >= 6) return ikyy.sendText(from, 'Maks pencarian adalah 5')
    for (let i = 0; i < numberSpawnWaifu; i++) {
        var waifu2 = waifu1[Math.floor(Math.random() * waifu1.length)]
        await ikyy.sendFileFromUrl(from, waifu2, 'Waifu.jpg', `*${numberSearchWaifu}*\n\n${waifu2}`)
    }
} else {
    await ikyy.sendFileFromUrl(from, waifu2, 'Waifu.jpg', `*${numberSearchWaifu}*\n\n${waifu2}`)
}
ikyy.sendButtons(from, 'Link Button', [{id: 'waifu_', text: `${prefix}waifu ${numberSearchWaifu}`}], '', '')