const cheerio = require("cheerio");
const axios = require("axios");

const url = process.env.PATH_LINK;
const baseUrl = process.env.PATH_LINK_BASE;
const room_data = [];

const roomDetail_data = [];

async function getRoomDetail() {
    try {
        const urlDetail = await getData();
        // console.log(urlDetail)
        for (let i = 0; i < urlDetail.length; i++) {
            if(urlDetail[i] != 'https://phongtro123.com/can-sang-gap-ve-bac-tiem-spa-do-moi-khu-nguyen-son-60-trieu-pr610903.html') {
                const response = await axios.get(urlDetail[i]);
                const $ = cheerio.load(response.data);
                const room = $(".the-post");
                // console.log(room)
                room.each(function () {
                    title = $(this).find(".page-header h1 a").attr("title");
                    price = $(this).find(".price span").text();
                    area = $(this).find(".acreage span").text();
                    description = $(this).find(".post-main-content .section-content p").text();
                    address = $(this).find(".post-address").text().split(":")[1];
                    phone = $(this).find(".post-contact .section-content .table tbody tr")[1].children[1].children[0].data
                    nameContact = $(this).find(".post-contact .section-content .table tbody tr")[0].children[1].children[0].data
                    image_link = $(this).find(".images-swiper-container .swiper-slide img");
                    let list_image = [];
                    if (image_link.length != 0) {
                        for (let i = 0; i < image_link.length; i++) {
                            image = $(this).find(image_link)[i].parent.children[0].attribs.src;
                            list_image.push(image);
                        }
                    }
                    roomDetail_data.push([title, address, phone, price, area, nameContact, description, list_image]);
                });
            }
        }
        // console.log(roomDetail_data)
        return roomDetail_data
    }
    catch (err) {
        console.log(err);
    }
}


async function getData() {
    try {
        const urlPage = await getPage(url);
        for (let i = 0; i < urlPage.length; i++) {
            const response = await axios.get(urlPage[i]);
            const $ = cheerio.load(response.data);
            const room = $(".post-item");
            room.each(function () {
                post_room = $(this).find(".post-title a").attr("href");
                if (post_room != undefined) {
                    room_data.push(url + post_room);
                }
            });
        }
        return room_data;
    }
    catch (err) {
        console.log(err);
    }
}

async function getPage(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let pages = [];
        pageURL = $("a[class='page-link'][rel='next']").attr('href');
        // pageNumber = pageURL.split('=')[1]
        for (let i = 1; i < 30; i++) {
            next_page = baseUrl + '?page=' + i;
            pages.push(next_page);
        }
        return pages;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = getRoomDetail
