const run = (prefix) => {
  let svgObject = document.getElementById(prefix);
  let svgDocument = svgObject.contentDocument;

  // Now you can manipulate the SVG elements within svgDocument
  let svgElements = svgDocument.getElementsByClassName("can_interact");

  for (let i = 0; i < svgElements.length; i++) {
    const svgElement = svgElements[i];

    svgElement.addEventListener("mouseover", function () {
      const printElement = document.getElementById("body-part-print");
      printElement.innerHTML = svgElement.id?.replace(/_/gmi," ");
    });
  }
};

document.addEventListener("mouseover",()=>{
   run("svg-front")
   run("svg-back")
})