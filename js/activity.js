var state = {
	selected_tags:new Array(),
	supply:true,
	time:30,
	searchValue:'',
	activities:null,
	updatedActivities:null
};

// Defining async function
async function getapi() {
    // Storing response
    const response = await fetch('http://localhost:3000/activities');
    // Storing data in form of JSON

    var data = await response.json();
	state.activities = await data;
	console.log('updated activities', state.updatedActivities)
	for (let row in state.activities){
		state.activities[row].tags = [];
		await console.log(state.activities[row].Activity_id)
		let tagsToId = await fetch(`http://localhost:3000/activities/id/${state.activities[row].Activity_id}`);
		var tags = await tagsToId.json();
		for (let tag in tags){
			console.log(tags[tag].tag_name);
			await state.activities[row].tags.push(tags[tag].tag_name);
		}
	}
	await getOriginalData();
    console.log(state.updatedActivities);
    show(state.updatedActivities);
}

// Function to define innerHTML for HTML table
async function show(data) {
	console.log('updated',data);
    let tab='';
    let tagsToId;
    // Loop to access all rows 
    for (let row in data) {
		let tags = '';
		for (let i=1; i<data[row].tags.length; i++){
			tags += `<button style="font-weight:bold;" class='btnTag'>${data[row].tags[i]}</button>`
		}
        tab += `<div class="card" style="background-color:white;"><div class="card-body"><h5 style="font-weight:bold; text-align:center;" class="card-title">${data[row].Name}</h5>
		<div class='parent'>
			<div class='children' style="flex: 2;">`+tags+`
				<p><span style='font-weight:bold;'>Time:</span>${data[row].tags[0]}<br/><span style='font-weight:bold;'>Supply:</span>${data[row].Supply_tag}</p>
			</div>
			<div class='children' style="flex: 3;">
				<p class="card-text">${data[row].Description}</p>
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
	getapi();
	document.getElementById("supply").click();
	document.getElementById('30').click();
}

async function getOriginalData(){
	state.updatedActivities = JSON.parse(JSON.stringify(state.activities))
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
	updateResults('tag');
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
	let index;
	if (typeSearch==='search'){
		await getOriginalData();	
		for (index in state.updatedActivities){
			console.log(index);
			let name;
			name = state.updatedActivities[index].Name;
			console.log('name',name)
			if (name.toUpperCase().includes(state.searchValue.toUpperCase()))
				continue;
			else
				delete state.updatedActivities[index]
		}
		
		console.log(state.updatedActivities)
		await deleteEntries();
		show(state.updatedActivities);
	}
	else if (typeSearch==='supply'){
		await getOriginalData();
		for (index in state.updatedActivities){
			let supply;
			supply = state.updatedActivities[index].Supply_tag;
			if (state.supply===false){
				if (supply==='-')
					continue;
				else
					delete state.updatedActivities[index]
			}
			else{
				if (supply==='-')
					delete state.updatedActivities[index]
				else
					continue;
			}
		}
		deleteEntries();
		show(state.updatedActivities);
	}
	else if(typeSearch==='tag'){
		await getOriginalData();
		for (index in state.updatedActivities){
			let tags;
			tags = state.updatedActivities[index].tags;
			console.log("tags",tags, state.selected_tags)
			if(isSubset(tags, state.selected_tags))
				continue;
			else
				delete state.updatedActivities[index]
		}
		deleteEntries();
		show(state.updatedActivities);
	}
	else if(typeSearch==='time'){
		await getOriginalData();
		for (index in state.updatedActivities){
			let time;
			time = state.updatedActivities[index].tags[0];
			if(parseInt(time, 10)<=state.time && parseInt(time, 10)>state.time-15)
				continue;
			else
				delete state.updatedActivities[index]
		}
		deleteEntries();
		show(state.updatedActivities);
	}
}

async function clickSearch(){
	state.searchValue = document.getElementById('searchInput').value;
	console.log(state.searchValue)
	if (state.searchValue===''){
		deleteEntries();
		await getOriginalData();
		show(state.updatedActivities)
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

 function isSubset(arr1, arr2)
    {
	m = arr1.length
	n = arr2.length
        let i = 0;
        let j = 0;
        for (i = 0; i < n; i++) {
            for (j = 0; j < m; j++)
                if (arr2[i].toUpperCase() === arr1[j].toUpperCase())
                    break;
 
            /* If the above inner loop
            was not broken at all then
            arr2[i] is not present in
            arr1[] */
            if (j == m)
                return false;
        }
 
        /* If we reach here then all
        elements of arr2[] are present
        in arr1[] */
        return true;
    }

