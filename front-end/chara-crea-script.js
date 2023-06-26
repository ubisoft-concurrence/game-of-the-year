function selectText(Slasher) {
    document.getElementByValue("slasher").innerHTML = "Slasher<br> HP : 50<br> ATK : 15";
    input.focus();
    input.select(Slasher);
  }

function selectText(Wall) {
    document.getElementById("wall").innerHTML = "Wall<br> HP : 70<br> ATK : 20";
    input.focus();
    input.select(Wall);
}

function update() {
    var select = document.getElementById('jobs-select');
    var option = select.options[select.selectedIndex];

    document.getElementById('chara-skin').value = option.value;
    document.getElementById('stats-jobs').value = option.text;
    document.getElementsByValue("slasher").innerHTML = "Slasher<br> HP : 50<br> ATK : 15";
    document.getElementsByValue("Wall").innerHTML = "Slasher<br> HP : 50<br> ATK : 15";
}
