var keycode = require('keycode'),
    currentSection;

function getAllSections(){
    return Array.prototype.slice.call(document.querySelectorAll('section'));
}

function setCurrentSection(section){
    currentSection && currentSection.classList.remove('current');
    currentSection = section;
    currentSection.classList.add('current');
}

function saveState(){
    var sections = getAllSections();
    var currentSectionIndex = Math.max(sections.indexOf(currentSection), 0);
    window.localStorage.setItem('currentSection', currentSectionIndex);
}

function loadState(){
    var allSections = document.querySelectorAll('section');
        currentSectionIndex = Math.min(parseInt(window.localStorage.getItem('currentSection')) || 0, allSections.length);

    setCurrentSection(allSections[currentSectionIndex]);
}

window.addEventListener('load', function(){
    loadState();

    window.addEventListener('keyup', function(event){
        var key = keycode(event),
            currentSection = document.querySelector('section.current') || document.querySelector('section'),
            nextSection = currentSection.nextElementSibling || currentSection,
            previousSection = currentSection.previousElementSibling || currentSection;

        event.preventDefault();

        if(key === 'left'){
            setCurrentSection(previousSection);
        }

        if(~['right', 'enter', 'space'].indexOf(key)){
            setCurrentSection(nextSection);
        }

        saveState();
    });
});