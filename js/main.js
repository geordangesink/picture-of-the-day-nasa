document.querySelector("#form").addEventListener("keypress", function(event)
{
    if (event.key === "Enter")
    {
        event.preventDefault();
        getFetch();
    }
});

document.querySelector("#request").addEventListener("click", function(event)
{
    event.preventDefault();
    getFetch();
});

function getFetch()
{
    document.querySelector("img").src = "";
    document.querySelector("iframe").src = "";
    const choice = document.querySelector("#search-query").value.toLowerCase();
    const url = `https://api.nasa.gov/planetary/apod?api_key=ObdEBTvaVIHVkPcwQ2DgSiCvneYh6t0QNZu2gTNd&date=${choice}`;
    const options = {
        method : "GET"
    }

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.media_type == "image")
            {
                document.querySelector("img").src = data.hdurl;
            }
            else
            {
                document.querySelector("iframe").src = data.url;
            }

            document.querySelector("h3").innerText = "Explanation: ";
            document.querySelector("p").innerText = data.explanation;
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}



