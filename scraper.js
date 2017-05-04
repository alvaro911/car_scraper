const cheerio = require('cheerio')
const aMap = require('async/map')

const url = 'https://boulder.craigslist.org'

function getLinks(html){
  const $ = cheerio.load(html)
  let carsLink = $('.result-row a');
  var hrefs = Array.from(carsLink).map((link, i) => {
    return link.attribs.href.indexOf('.html') > -1 && link.attribs.href.startsWith('/cto') ? `${url}${link.attribs.href}` : null;
  }).filter(item => !!item).filter((item, pos, self) => {
    return self.indexOf(item) == pos
  })
  return hrefs
}


//create that invokes getlinks and then async to map through and start my object asynchronously

function carBuilderInfo(html){
  let page={}
  let $ = cheerio.load(html);
  let title=$('#titletextonly')
  let titleText = title.text()
  let price=$('.price')
  let priceText=price.text()
  let city=$('.postingtitletext small')
  let cityText=city.text()
  let img=$('.swipe-wrap img')
  page.id=url
  page.city=cityText
  page.title=titleText
  page.price=priceText
  page.img=img['0'] && img['0'].attribs.src
  return page
}

module.exports = {getLinks, carBuilderInfo}
