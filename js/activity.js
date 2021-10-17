// api url
const api_url = 
      "https://employeedetails.free.beeceptor.com/my/api/path";
  
// Defining async function
async function getapi(url) {
    // Storing response
    const response = await fetch('https://localhost:3000/activities/');
    
    // Storing data in form of JSON
    var data = await response.json();
	console.log(data)
    //data = JSON.parse(data);
    //show(data);
}

// Function to define innerHTML for HTML table
function show(data) {
    let tab = `<div class="card"><div class="card-body">`;
    
    // Loop to access all rows 
    for (let key in data) {
		console.log(r);
        tab += `<h5 style="font-weight:bold; text-align:center;" class="card-title">${data[key]}</h5>
		<div class='parent'>
			<div class='children' style="flex: 2;">
				<button style="font-weight:bold;" class='btnTag'>VIRTUAL</button>
				<p><span style='font-weight:bold;'>Time:</span> 30 min<br/><span style='font-weight:bold;'>Supply:</span> Pen</p>
			</div>
			<div class='children' style="flex: 4;">
				<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			</div>
		</div>
	  </div>
	</div>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("results").innerHTML = tab;
}

var state = {
	selected_tags:new Array(),
	supply:true,
	time:30,
	searchValue:''
};

function selectDefaultEvents(){
	// Calling that async function
	getapi(api_url);
	document.getElementById("supply").click();
	document.getElementById('30').click();
}

function changeTag(e) {
	let event = e || window.event;
	let value = event.target.value;
	//change color
	if (document.getElementById(value).style.backgroundColor==='orange'){
		const index = state.selected_tags.indexOf(value);
		if (index > -1) {
		  state.selected_tags.splice(index, 1);
		}
		document.getElementById(value).style = "background-color:white !important;";
	}
	else{
		state.selected_tags.push(value);
		document.getElementById(value).style = "background-color:orange !important;";
	}
	console.log(state);
}

function changeSupply(e) {
	let event = e || window.event;
	let value = event.target.value;
	if (value==='supply'){
		document.getElementById(value).style = "background-color:orange !important;";
		document.getElementById('no-supply').style = "background-color:white !important;";
		state.supply = true;
	}
	else if (value==='no-supply'){
		state.supply = false;
		document.getElementById(value).style = "background-color: orange !important;";
		document.getElementById('supply').style = "background-color: white !important;";
	}
	console.log(state);
}

function changeTime(e) {
	let event = e || window.event;
	let value = event.target.value;
	for (let i = 0; i<4; i++){
		document.getElementsByClassName('btn time')[i].style = "background-color:white !important;";
	}
	document.getElementById(value).style = "background-color:orange !important;";
	state.time = parseInt(value,10);
	console.log(state);
}

function clickSearch(){
	searchValue = document.getElementById('searchInput').value;
	window.scroll({
	  top: 100,
	  left: 100,
	  behavior: 'smooth'
	});
}