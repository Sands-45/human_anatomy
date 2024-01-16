const run = (prefix) => {
  let svgObject = document.getElementById(prefix);
  let svgDocument = svgObject.contentDocument;

  // Retrieve or initialize the array from local storage
  let selectedIds = JSON.parse(localStorage.getItem('selectedIds')) || [];

  // Function to update element highlighting
  const updateHighlighting = () => {
    svgDocument.querySelectorAll('.can_interact').forEach(el => {
      el.style.fill = selectedIds.includes(el.id) ? 'orange' : '#DF977D';
      el.style.fillOpacity = selectedIds.includes(el.id) ? '0.9' : '0.3';
    });
  };

  // Now you can manipulate the SVG elements within svgDocument
  let svgElements = svgDocument.getElementsByClassName("can_interact");

  for (let i = 0; i < svgElements.length; i++) {
    const svgElement = svgElements[i];
    const color = svgDocument.getElementById(svgElement.id).style.fill
    const fill_op = svgDocument.getElementById(svgElement.id).style.fillOpacity

    svgElement.addEventListener("mouseover", function () {
      svgDocument.getElementById(svgElement.id).style.fill = 'red';
      svgDocument.getElementById(svgElement.id).style.fillOpacity = '0.9';
      const printElement = document.getElementById("body-part-print");
      const printElementSelected = document.getElementById("body-part-print_selected");
      printElement.innerHTML = svgElement.id?.replace(/_/gmi," ");
      printElementSelected.innerHTML = selectedIds?.toString()?.replace(/_/gmi," ")
    });
    
    svgElement.addEventListener("mouseleave", function () {
      svgDocument.getElementById(svgElement.id).style.fill = color;
      svgDocument.getElementById(svgElement.id).style.fillOpacity = fill_op;
    });

    svgElement.addEventListener("click", function (e) {
      const id = e.target.id;
      if (selectedIds.includes(id)) {
        selectedIds = selectedIds.filter(item => item !== id);
      } else {
        selectedIds.push(id);
      }
      localStorage.setItem('selectedIds', JSON.stringify(selectedIds));

      // Update highlighting
      updateHighlighting();
    });
  }

  // Initial highlighting based on local storage
  updateHighlighting();
};

document.addEventListener("mouseover",()=>{
   run("svg-front")
   run("svg-back")
})
