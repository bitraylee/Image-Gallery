let galleryImages = document.querySelectorAll(".gallery-image");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
   galleryImages.forEach(function (image, index) {
      image.onclick = function () {
         //alert("It works!!!");
         let getElementCss = window.getComputedStyle(image);
         let getFullImgUrl = getElementCss.getPropertyValue("background-image");
         let getImgUrlPos = getFullImgUrl.match(/thumbs\/(\w+\d)/);
         getImgUrlPos[1] += ".png";
         // let setNewImgUrl = getImgUrlPos[1].replace('")', '');
         //alert(getImgUrlPos[1]);

         getLatestOpenedImg = index + 1;

         let container = document.body;
         let newImgWindow = document.createElement("div");
         newImgWindow.setAttribute("class", "img-window");
         newImgWindow.setAttribute("onclick", "closeImg()");
         container.appendChild(newImgWindow);

         let newImg = document.createElement("img");
         newImg.setAttribute("src", "../images/" + getImgUrlPos[1]);
         newImg.setAttribute("id", "current-img");
         newImgWindow.appendChild(newImg);


         newImg.onload = function () {
            let imgWidth = this.width;
            let calcImgToEdge = ((windowWidth - imgWidth) / 2);


            let newPrevBtn = document.createElement("a");
            let newPrevText = document.createTextNode("Prev");
            newPrevBtn.appendChild(newPrevText);
            newPrevBtn.setAttribute("class", "img-btn-prev");
            newPrevBtn.setAttribute("onclick", "changeImg(0)");
            container.appendChild(newPrevBtn);
            newPrevBtn.style.cssText = "left: " + (calcImgToEdge - 80) + "px";

            let newNextBtn = document.createElement("a");
            let newNextText = document.createTextNode("Next");
            newNextBtn.appendChild(newNextText);
            newNextBtn.setAttribute("class", "img-btn-next");
            newNextBtn.setAttribute("onclick", "changeImg(1)");
            container.appendChild(newNextBtn);
            newNextBtn.style.cssText = "right: " + (calcImgToEdge - 100) + "px";

         }
      }
   });
}

function closeImg() {
   document.querySelector(".img-window").remove();
   document.querySelector(".img-btn-next").remove();
   document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
   document.querySelector("#current-img").remove();

   let getImgWindow = document.querySelector(".img-window");
   let newImg = document.createElement("img");
   //getImgWindow.appendChild(newImg);

   let calcNewImg;
   if (changeDir === 1) {
      calcNewImg = getLatestOpenedImg + 1;
      if (calcNewImg > galleryImages.length) {
         calcNewImg = 1;
      }
   }
   else if (changeDir === 0) {
      calcNewImg = getLatestOpenedImg - 1;
      if (calcNewImg < 1) {
         calcNewImg = galleryImages.length;
      }
   }

   newImg.setAttribute("src", "../images/img" + calcNewImg + ".png");
   newImg.setAttribute("id", "current-img");


   getLatestOpenedImg = calcNewImg;

   newImg.onload = function () {
      let imgWidth = this.width;
      let calcImgToEdge = ((windowWidth - imgWidth) / 2);

      let nextBtn = document.querySelector(".img-btn-next");
      nextBtn.style.cssText = "right: " + (calcImgToEdge - 100) + "px";

      let prevBtn = document.querySelector(".img-btn-prev");
      prevBtn.style.cssText = "left: " + (calcImgToEdge - 80) + "px";

   }
   getImgWindow.appendChild(newImg);

}

