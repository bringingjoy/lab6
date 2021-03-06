'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
    // concatenate path
    var path = "/project" + "/" + idNumber;
    var projectSelector = "#project" + idNumber;
	
    console.log("User clicked on project " + idNumber);
    console.log("Going to " + path);

    $.get(path, endpointFunc);

}


/*
 * Callback function after AJAX get
 */
function endpointFunc(result) {
    console.log(result);
    var projectHTML = '<a href="#" class="details">' + '<img src="' + 
        result['image'] + '" class="detailsImage">' + '<p>' + result['title'] 
        + '</p>' + '<p><small>' + result['date'] + '</small></p>' + '<p><small>'
        + result['summary'] + '</small></p></a>';
    var projectSelector = "#project" + result['id'];
    
    $(projectSelector).html(projectHTML);

}



/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
    var path = "/palette";    
    $.get(path, colorResult);
}


function colorResult(result) {
    console.log(result);
    var colorsArr = result['colors'];
    var pageColors = colorsArr['hex'];
    $('body').css('background-color', pageColors[0]);
    $('.thumbnail').css('background-color', pageColors[1]);
    $('h1, h2, h3, h4, h5, h5').css('color', pageColors[2]);
    $('p').css('color', pageColors[3]);
    $('.project img').css('opacity', .75);
}


