function includeHTML() {
  console.log( 'includeHTML' );
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  //z = document.getElementsByClassName("markdown-body");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      console.log('file: ' + file);
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) { //success
            elmnt.innerHTML = this.responseText;
            console.log('this.responseText: ' + this.responseText);
            //filterContent(); // custom function
            //figureItOut();  // custom function from figure.js
          }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function filterContent() {
  console.log( 'filterContent' );
  var z, i, elmnt, filterVal, sources, clone;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    if (elmnt.hasAttribute("data-filter")) {
      filterVal = elmnt.getAttribute("data-filter");
      if (filterVal) {
        console.log( 'filterVal ' + filterVal );
        sources = elmnt.getElementsByClassName( String(filterVal) );
        console.log( 'source.length ' + sources.length );
        source = sources[0].innerHTML;
        console.log( 'source ' + source );
        elmnt.innerHTML = source;
        //Object.assign(clone, source);
        //elmnt.innerHTML = clone;
      }
    }
  }
}

$( document ).ready(function() {
  includeHTML();
  //filterContent();
});
