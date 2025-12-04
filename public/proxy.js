const wisp = "/wisp/";

function encode(url) {
    return wisp + url.replace(/https?:\/\//, "");
}

function isUrl(text) {
    return text.includes(".") || text.startsWith("http");
}

function go() {
    let input = document.getElementById("search").value.trim();

    // If the input is NOT a URL, search DuckDuckGo
    if (!isUrl(input)) {
        input = "https://duckduckgo.com/?q=" + encodeURIComponent(input);
    } 
    // If input is domain only, add https://
    else if (!input.startsWith("http")) {
        input = "https://" + input;
    }

    // Send request through Wisp
    window.location.href = encode(input);
}
