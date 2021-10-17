var state = {
	selected_tags:new Array(),
	supply:true,
	time:30,
	searchValue:'',
	activities:null
};

// api url
const api_url = 
      "https://employeedetails.free.beeceptor.com/my/api/path";
  
// Defining async function
async function getapi(url) {
    // Storing response
    const response = await fetch('http://localhost:3000/activities');
    // Storing data in form of JSON
    var data = await response.json();
    state.activities = data;
    show(data);
}

// Function to define innerHTML for HTML table
function show() {
    let tab='';
    
    // Loop to access all rows 
    for (let row in state.activities) {
        tab += `<div class="card" style="background-color:white;"><div class="card-body"><h5 style="font-weight:bold; text-align:center;" class="card-title">${state.activities[row].Name}</h5>
		<div class='parent'>
			<div class='children' style="flex: 2;">
				<button style="font-weight:bold;" class='btnTag'>VIRTUAL</button>
				<p><span style='font-weight:bold;'>Time:</span> 30 min<br/><span style='font-weight:bold;'>Supply:</span>${state.activities[row].Supply_tag}</p>
			</div>
			<div class='children' style="flex: 4;">
				<p class="card-text">${state.activities[row].Description}</p>
			</div>
		</div>
	  </div>
	</div></br>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("results").innerHTML = tab;
}

function selectDefaultEvents(){
	// Calling that async function
	getapi(api_url);
	document.getElementById("supply").click();
	document.getElementById('30').click();
}

async function getOriginalData(){
	await getapi(api_url);
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
	updateResults('supply');
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
	updateResults('time');
}

function deleteEntries() {
    // Setting innerHTML as tab variable
    document.getElementById("results").innerHTML = "";
	console.log('delete')
}

async function updateResults(typeSearch){
	await getOriginalData();
	if (typeSearch==='search'){
		for (index in state.activities){
			let name;
			name = state.activities[index].Name;
			if (name.toUpperCase().includes(state.searchValue.toUpperCase()))
				continue;
			else
				delete state.activities[index]
		}
		await deleteEntries();
		await show();
	}
	else if (typeSearch==='supply'){
		for (index in state.activities){
			let supply;
			supply = state.activities[index].Supply_tag;
			if (state.supply===false){
				if (supply==='-')
					continue;
				else
					delete state.activities[index]
			}
			else{
				if (supply==='-')
					delete state.activities[index]
				else
					continue;
			}
		}
		await deleteEntries();
		await show();
	}
}

async function clickSearch(){
	state.searchValue = document.getElementById('searchInput').value;
	console.log(state.searchValue)
	if (state.searchValue===''){
		await deleteEntries();
		getapi(api_url);
	}
	else{
		window.scroll({
		  top: 100,
		  left: 100,
		  behavior: 'smooth'
		});
		updateResults('search');
	}
}

