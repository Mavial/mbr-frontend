/* 


    This module is used at /admin/new-event/submit to
    load the data from uploaded files and create list of 
    image paths to save in the database. 


*/


function createImageList(eventName, uploadedImages) {
    var imgList = []
    for (i in uploadedImages) {
        img = uploadedImages[i]
        var imgPath = '/' + eventName + '/' + img.filename
        imgList.push(imgPath)
    }
    return imgList
}

module.exports = createImageList;