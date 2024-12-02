 

const serachForm = document.getElementById("Search-form");
const serachBox = document.getElementById("Search-box");
const serachResult = document.getElementById("search-result");
const serachMore = document.getElementById("show-more-btn");

let keyword = "";
//This declares a variable keyword and initialize it with an empty sting. it is intended to store the search keyword enteres by the user
let page = 1;

async function serachImage(){
    //This define an asynchronous function named serachImage. 
    keyword = serachBox.value;
    //This is where the user's search query will be stored.
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=UuA3zlP_LLHMq1AoXkBL_2-jOGG-Sl3JwToDYoWgEQw&per_page=12`;

    const response = await fetch(url);
    //The fetch function is used to send the HTTP request to the URL constructed earlier.
    //The await keyword is used to pause the execution of the function until the fetch request is completed. The response from the API is stored in the response variable.
    const data = await response.json();
    //The response.json() method is used to parse the JSON data from the response. Since the fetch request is asynchronous, await pauses the function until the JSON data is fully parsed and stored in the data variable.
    
    if(page===1){
        serachResult.innerHTML ="";
    }
    //This block checks if the current page is 1 (the first page). If so, it clears the content inside the serachresult element (like a div or container that will hold the serach results). This ensures that previous serach results are cleared when a new serach is initiated, preventing old result from accumulating when a new search is made.


    const results = data.results;
    // map  is a javascript array method that loops through each Item.This will allow you to process each result once at a Time.
    results.map((result)=>{
        const image = document.createElement("img");
        //this creates a new HTML <img> elements that will be used to display an image//
        image.src = result.urls.small;
        //This sets the src attribut of the newly created <img> elements to the URL of the image.Specifically, it uses result.urls.small, which likely points to a smaller version of the image.//
        const imageLink = document.createElement("a");
        //This create a new html <a> elements, which acts as a hyperlink that wraps around the image.Clicking on the image wil lead a different webpage(int this case, the full image page).//
        imageLink.href= result.links.html;
        //This set the href atrribute of the <a>  tag to the url where the full image can be viewed. result.links.html likely contains a UR to the page where the image is hpsted.
        imageLink.target="_blank";

     imageLink.appendChild(image);
     //This append the <img> alememnts (craete earlier) as a child of the<a> elements. This ,eans the image is now inside the link, so when you click the image, the browser will navigate to the Url specified in the href of the Link.
     serachResult.appendChild(imageLink);
    })
    serachMore.style.display="block";
}

serachForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1;
    serachImage();
})
serachMore.addEventListener("click", ()=>{
    page++;
    serachImage();
})
