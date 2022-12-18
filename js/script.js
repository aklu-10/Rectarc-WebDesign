
let menu=document.querySelector(".menu");
let nav=document.querySelector("nav");
let watermark_top=document.querySelector(".company_watermark .top");
let watermark_bottom=document.querySelector(".company_watermark .bottom");
let image_counter=document.querySelector(".image_counter");
let header=document.querySelector("header");
let framecontainer=document.querySelector(".frames");
let frame=document.querySelectorAll(".frame");
let left=document.querySelector(".leftarrow");
let right=document.querySelector(".rightarrow");
let currentImageCount=document.querySelector(".image_counter .current_count");
let totalImageCount=document.querySelector(".image_counter .total_count");
let indicatorContainer=document.querySelector(".currentframe_indicator");

let totalFrames=frame.length;
let currentFrame=1,incrementValue=2,slidekey=2;

totalImageCount.innerHTML=totalFrames;
// 0  2*70  4*70  6*70      8*70        10*70
// 0  140   280   420       560         700
// 2  4    6   8  10

for(let i=0;i<totalFrames;i++)
{
    let box=document.createElement("span");
    i==0?box.className="active":'';
    box.classList.add(slidekey);
    indicatorContainer.appendChild(box);
    slidekey+=2;
}

let boxes=document.querySelectorAll(".currentframe_indicator span");

for(let b of boxes)
{

    b.addEventListener("click",function(e)
    {
       updateImageButtons(e);
    })

}

function updateImageButtons(e)
{
    e.target.classList.length>1?getSlide(e.target.classList[1]):getSlide(e.target.classList[0]);
    e.target.classList.add("current");
    removeActive();
}

function removeActive()
{
    for(let b of boxes)
    {
        if(b.classList.contains("current"))
        {
            b.classList.add("active");
            b.classList.remove("current");
        }   

        else
            b.classList.remove("active")

    }
}
    

function getSlide(slide)
{
    framecontainer.style.transform=`translateX(-${(slide-2)*70}%)`;
    currentFrame=slide/2;
    incrementValue=slide;
    currentImageCount.innerHTML=currentFrame;
}

function nextFrame()
{
    framecontainer.style.transform=`translateX(-${incrementValue*70}%)`;
    incrementValue+=2;
    currentFrame++;
    currentImageCount.innerHTML=currentFrame;
}

function getFirstFrame()
{
    framecontainer.style.transform=`translateX(0)`;
    currentFrame=1;
    incrementValue=2;
    currentImageCount.innerHTML=currentFrame;

}


function prevFrame()
{
    framecontainer.style.transform=`translateX(-${(incrementValue-2)*70}%)`;
    incrementValue-=2;
    currentFrame--;
    currentImageCount.innerHTML=currentFrame;

}

function getLastFrame()
{
    framecontainer.style.transform=`translateX(-${(totalFrames*2-2)*70}%)`;
    currentFrame=totalFrames;
    incrementValue=totalFrames*2-2;
    currentImageCount.innerHTML=currentFrame;

}

right.addEventListener("click",function()
{
    currentFrame < totalFrames?nextFrame():getFirstFrame();
})

left.addEventListener("click",function()
{
    currentFrame > 1 ? prevFrame():getLastFrame();
})





menu.addEventListener("click",function()
{
    nav.classList.toggle("show");
})

document.onscroll=()=>
{
    if(window.scrollY)
    {
        watermark_top.style.transform=`translateX(-${window.scrollY*7}%)`;
        watermark_bottom.style.transform=`translateX(${window.scrollY*9}%)`;
        image_counter.style.opacity="0";
    }
    if(window.scrollY==0)
    {
        watermark_top.style.transform=`translateX(0px)`;
        watermark_bottom.style.transform=`translateX(0px)`;
        image_counter.style.opacity="1";

    }


}

let products=
[
    {
        category:"sunglass",
        source:"img/sunglass.jpg"
    }
    ,
    {
        category:"watch",
        source:["img/watch.jpg","img/watch2.jpg","img/watch.jpg"]

    }
    ,
    {
        category:"bag",
        source:"img/bag.jpg"

    }
    ,
    {
        category:"bottle",
        source:"img/bottle.jpg"

    }
    ,
    {
        category:"headphone",
        source:["img/headphone.jpg","img/headphone2.jpg","img/headphone.png",]

    }
    ,
    {
        category:"other",
        source:"img/cream.jpg"
    }
]

let imagesContainer=document.querySelector(".gallery .images");
let buttons=document.querySelectorAll(".gallery .btn");


for(let p of products)
{
    if(Array.isArray(p.source))
    {
        for(let src of p.source)
        {
            let img=document.createElement("img");
            img.src=src;
            img.className=p.category;
            img.classList.add("image");
            imagesContainer.appendChild(img);

        }
    }
    else
    {
        let img=document.createElement("img");
        img.src=p.source;
        img.className=p.category;
        img.classList.add("image");
        imagesContainer.appendChild(img);

    }

            }

let allImages=document.querySelectorAll(".image");

for(let image of allImages){ image.addEventListener("click",modelView); }

function filterProduct(category,e)
{
    
    for(let button of buttons)
    {
        button.classList.remove("active");
    }
    e.target.classList.add("active");

    for(let image of allImages)
    {
        if(category==="all")
        {
            image.style.display="initial";
        }
        else
        {
            if(image.classList.contains(category))
            {
                image.style.display="initial";
            }
            else if(image.classList.contains(category))
            {
                image.style.display="initial";
            }
            else
            {
                image.style.display="none";
            }


        }

    }
}

let modelContainer;
function modelView(e)
{
    modelContainer=document.querySelector(".modelViewContainer");
    modelContainer.style.display="flex";
    let image_p=e.target.cloneNode();
    modelContainer.appendChild(image_p);
    
    document.querySelector(".modelViewContainer span").onclick=()=>
    {
        modelContainer.removeChild(image_p);
        modelContainer.style.display="none";
    }
}

