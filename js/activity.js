var state = {
	selected_tags:new Array(),
	supply:true,
	time:30,
	searchValue:''
};

function selectDefaultEvents(){
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