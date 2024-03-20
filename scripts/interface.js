function initializeInterfaceWindows(){
    
    changeInterfaceState("map2D-tab");
    document.getElementById('map2D-tab').style.opacity = 0.9;
    document.getElementById('map2D-tab').style.borderBottomStyle = "dashed";
    document.getElementById('map2D-tab').style.borderWidth = "3px 3px 0.1px 3px";
    document.getElementById('map2D-tab').style.fontWeight = 500;

    changeDataDisplayState("output-tab");
    document.getElementById('output-tab').style.opacity = 0.9;
    document.getElementById('output-tab').style.borderBottomStyle = "dashed";
    document.getElementById('output-tab').style.borderWidth = "3px 3px 0.1px 3px";
    document.getElementById('output-tab').style.fontWeight = 500;
    
    // Making data-display and main-window elements have the same height.
    makeSameHeightByID("data-display", "main-window");
    window.onresize = function() {
        makeSameHeightByID("data-display", "main-window");
    };

}

function selectTab(event) {

    elementClass = event.target.className;

    tabs = document.getElementsByClassName(elementClass);

    for (let index = 0; index < tabs.length; index++) {
        tabs[index].style.opacity = 0.5;
        tabs[index].style.borderBottomStyle = "solid";
        tabs[index].style.borderWidth = "0.1px 0.1px 3px 0.1px";
        tabs[index].style.fontWeight = 300;
    }

    event.target.style.opacity = 0.9;
    event.target.style.borderBottomStyle = "dashed";
    event.target.style.borderWidth = "3px 3px 0.1px 3px";
    event.target.style.fontWeight = 500;

    changeInterfaceState(event.target.id);

}

// Possible states: specs, map2D, map3D, altitude, statistics, forecast.
function changeInterfaceState(tab_ID){

    newState = tab_ID.substring(0, tab_ID.indexOf('-'));

    for (child of document.getElementsByClassName("display-system")) {
        child.style.display = 'none';
    }

    document.getElementById(newState + "-container").style.display = 'flex';
    
    pageStates['interface_state'] = newState;

    if (["specs", "statistics", "forecast", "altitude"].includes(pageStates['interface_state'])) {

        for (child of document.getElementsByClassName("label")) {
            child.style.opacity = 0;
        }

        document.getElementById("date-panel").style.color = "transparent";
        document.getElementById("date-panel").style.backgroundColor = "transparent";
        document.getElementById("date-panel").style.borderWidth = "0 3px 0 3px";
    }
    else {

        for (child of document.getElementsByClassName("label")) {
            child.style.opacity = 1;
        }

        document.getElementById("date-panel").style.color = "rgb(255,255,255)";
        document.getElementById("date-panel").style.backgroundColor = "rgba(31, 28, 28, 0.754)";
        document.getElementById("date-panel").style.borderWidth = "0 3px 2px 3px";
    }


}

function selectDataTab(event) {

    elementClass = event.target.className;

    tabs = document.getElementsByClassName(elementClass);

    for (let index = 0; index < tabs.length; index++) {
        tabs[index].style.opacity = 0.5;
        tabs[index].style.borderBottomStyle = "solid";
        tabs[index].style.borderWidth = "0.1px 0.1px 3px 0.1px";
        tabs[index].style.fontWeight = 300;
    }

    event.target.style.opacity = 0.9;
    event.target.style.borderBottomStyle = "dashed";
    event.target.style.borderWidth = "3px 3px 0.1px 3px";
    event.target.style.fontWeight = 500;

    changeDataDisplayState(event.target.id);

}

function changeDataDisplayState(tab_ID){

    newState = tab_ID.substring(0, tab_ID.indexOf('-'));

    for (child of document.getElementsByClassName("data-container")) {
        child.style.display = 'none';
    }

    document.getElementById(newState + "-container").style.display = 'flex';
    
    pageStates['data_display'] = newState;



}
