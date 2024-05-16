document.querySelector("#options").addEventListener("click", toggleOptions)

document.querySelector("#form").addEventListener("keypress", function(event)
{
    if (event.key === "Enter")
    {
        event.preventDefault();
        getFetch();
    }
});

document.querySelector("#date").oninput = function(){
    getFetch();
}

// document.querySelector("#request").addEventListener("click", function(event)
// {
//     event.preventDefault();
//     getFetch();
// });

function getFetch()
{
    document.querySelector("img").src = "";
    document.querySelector("iframe").src = "";
    const choice = document.querySelector("#date").value.toLowerCase();
    const url = `https://api.nasa.gov/planetary/apod?api_key=ObdEBTvaVIHVkPcwQ2DgSiCvneYh6t0QNZu2gTNd&date=${choice}`;
    const options = {
        method : "GET",
        signal: AbortSignal.timeout(5000)
    }

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.media_type == "image")
            {
                document.querySelector("iframe").classList.add("hide");
                document.querySelector("img").classList.remove("hide");
                document.querySelector("img").src = data.hdurl;
            }
            else
            {
                document.querySelector("img").classList.add("hide");
                document.querySelector("iframe").classList.remove("hide");
                document.querySelector("iframe").src = data.url;
            }
            document.querySelector("p").innerText = data.explanation;
        })
        .catch(err => {
            document.querySelector("#options").classList.add("hide");
            document.querySelector("#date").classList.add("hide");
            document.querySelector("img").classList.add("hide");
            document.querySelector("iframe").classList.add("hide");
            document.querySelector("iframe").style.height = "0px";
            document.getElementById("error").classList.remove("hide");
            console.log(`error ${err}`)
        });
}
getFetch();

function toggleOptions(){
    document.querySelectorAll(".show").forEach(element =>{
        element.classList.toggle("hide");
    });
}