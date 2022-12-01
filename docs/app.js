function c(v){console.log(v)}
function t(v){console.table(v)}

function start(){
  if(document.getElementById('finalDiv') != null) document.getElementById('finalDiv').remove();
  var bigDiv = document.createElement('div');
  bigDiv.id = 'finalDiv';
  document.getElementById('finalDivBig').appendChild(bigDiv);

  input = [];
  wins = [];
  yesOrNoMode = false;
  words = realWords.slice();
  base = JSON.parse(JSON.stringify(realBase));;

  for(var i = 1; i < 6; i++){
    var item = document.getElementById(i + 'btn');
    if(i > 2){
      item.classList.add('mainBtn');
      item.classList.add('widthHun');
      item.classList.remove('hide');
    }
    item.innerHTML = i;
  }

  document.getElementById('finalDivBig').classList.add('hide');
  document.getElementById('finalDivBig').classList.remove('main-container');

  document.getElementById('main-div').classList.add('hide');
  document.getElementById('main-div').classList.remove('main-container');

  document.getElementById('quastionCard').classList.remove('hide');
  document.getElementById('quastionCard').classList.add('main-container');

  document.getElementById('theQue').innerHTML = ques[0];
  document.getElementById('theQueDes').innerHTML = quesDes[0];
}

function answerBtn(answer){
  input.push(answer);
  if(yesOrNoMode && answer != 0){
    for(var item in base){
      if(base[item][input.length - 1] != answer) {
        words.splice(words.indexOf(item), 1);
        delete base[item];
        //base[item][input.length - 1] = -5;
      }
    }
  }
  nextQue();
}

function share(){
  document.getElementById('finalDivBig').classList.add('n-s');
  html2canvas(document.querySelector("#finalDivBig")).then(async canvas => {    
    var dataURL = canvas.toDataURL();
    var blobBin = atob(dataURL.split(',')[1]);
    var array = [];
    for(var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));  
    }
    
    const blob = await (await fetch(dataURL)).blob()
    const file = new File([blob], 'results.png', { type: blob.type })
    try {
      await navigator.share({
        files: [file],
        title: 'Image',
        text: "היי, רציתי לשתף אותך בתוצאות שיצאו לי בשאלון הסיטקום\n\nלשאלון:\nhttps://noamzuck.github.io/sitcom"
      })
    } catch (error) {return}
  });
  document.getElementById('finalDivBig').classList.remove('n-s');
}

function showPopWin(id){
  for(var i = 0; i < quesShort.length; i++){
    document.getElementById('des' + i).innerHTML = base[words[id]][i];
  }
  document.getElementById('finalDivBig').classList.add('hide');
  document.getElementById('finalDivBig').classList.remove('main-container');
  document.getElementById('rateDiv').classList.remove('hide');
  document.getElementById('rateDiv').classList.add('modal-content');
}

function hidePopWin(){
  document.getElementById('rateDiv').classList.add('hide');
  document.getElementById('rateDiv').classList.remove('modal-content');
  document.getElementById('finalDivBig').classList.remove('hide');
  document.getElementById('finalDivBig').classList.add('main-container');
}

function showMoreRes(){
  document.getElementById('emptyDiv').classList.remove('hide');

  document.getElementById('showMoreRes').outerHTML = '<button id="showMoreRes" class="closeBtn m-b" onclick="showLessRes()">הסתר תוצאות נוספות</button>';
}

function showLessRes(){
  document.getElementById('emptyDiv').classList.add('hide');

  document.getElementById('showMoreRes').outerHTML = '<button id="showMoreRes" class="closeBtn" onclick="showMoreRes()">הצג תוצאות נוספות</button>';
}

function nextQue(){
  var n = input.length;
  if(n != ques.length){    
    var theCurrentQue = ques[n];
    document.getElementById('theQue').innerHTML = theCurrentQue;

    var theCurrentQueDes = quesDes[n];
    document.getElementById('theQueDes').innerHTML = theCurrentQueDes;

    switch(n){
      case 9:
        yesOrNoMode = true;
        for(var i = 1; i < 6; i++){
          var item = document.getElementById(i + 'btn');
          if(i > 2){
            item.classList.add('hide');
            item.classList.remove('mainBtn');
            item.classList.remove('widthHun');
          }
          else if(i == 1) item.innerHTML = 'כן';
          else item.innerHTML = 'לא';
        }
        break;
      case 11:
        for(var i = 1; i < 3; i++){
          var item = document.getElementById(i + 'btn');
          if(i == 1) item.innerHTML = 'מצולמת';
          else item.innerHTML = 'מצויירת';
        }
    }
  } else {
    var amount = input.length;
    for(var key in base){
        wins.push({name: key, difference: 0});
    }
    
    for(var key in base){
      var i = 0;
      var newKey = words.indexOf(key);
      for(var item in base[key]){
        if(input[item] == 0) i++;
        else wins[newKey].difference += Math.abs(base[key][item] - input[item]);
      }
      wins[newKey].difference = (100 - ((wins[newKey].difference / (amount - i)) / 5 * 100)).toFixed(2);
    }
    
    wins.sort(function(a, b){return b.difference - a.difference});

    if(wins.length == 0) wins.push({name: 'לא נמצאו תוצאות', difference: 100});

    var cou = 0;
    for(var key in wins){
      cou++;
      var newHunBar = document.createElement('div');

      var newBar = document.createElement('div');
      newBar.classList.add('barRes');
      newBar.style.width = wins[key].difference + '%';

      var newRes = document.createElement('p');
      newRes.classList.add('result');
      newRes.innerHTML = '<b>' + (parseInt(key) + 1) + '# - ' + wins[key].name + '</b> (' + wins[key].difference + '% התאמה)';
      
      if(cou < 4) document.getElementById('finalDiv').appendChild(newHunBar);
      else if(cou == 4) {
        var nh = document.createElement('button');
        document.getElementById('finalDiv').appendChild(nh);
        nh.outerHTML = '<button id="showMoreRes" class="closeBtn" onclick="showMoreRes()">הצג תוצאות נוספות</button>';

        var nh = document.createElement('button');
        document.getElementById('finalDiv').appendChild(nh);
        nh.outerHTML = '<button class="closeBtn m-r" onclick="start()">התחל מחדש</button>';
    
        nh = document.createElement('button');
        document.getElementById('finalDiv').appendChild(nh);
        nh.outerHTML = '<button class="closeBtn m-r" onclick="share()">שיתוף תוצאות</button>';

        var newEmptyDiv = document.createElement('div');
        newEmptyDiv.id = 'emptyDiv';
        newEmptyDiv.appendChild(newHunBar);
        newEmptyDiv.classList.add('hide');
        document.getElementById('finalDiv').appendChild(newEmptyDiv);
      }
      else document.getElementById('emptyDiv').appendChild(newHunBar);

      if(wins[key].name != 'לא נמצאו תוצאות') newHunBar.outerHTML = '<div id="hunBar' + key + '" class="barHunRes" onclick="showPopWin(' + key + ')"></div>';
      else newHunBar.outerHTML = '<div id="hunBar' + key + '" class="barHunRes"></div>';
      document.getElementById('hunBar' + key).appendChild(newBar);
      newBar.appendChild(newRes);
    }

    if(document.getElementById('emptyDiv') != null){
      var nh = document.createElement('button');
      document.getElementById('emptyDiv').appendChild(nh);
      nh.outerHTML = '<button class="closeBtn" onclick="showLessRes()">הסתר תוצאות נוספות</button>';
    }

    if(cou < 4){
      var nh = document.createElement('button');
      document.getElementById('finalDiv').appendChild(nh);
      nh.outerHTML = '<button class="closeBtn m-r" onclick="start()">התחל מחדש</button>';
  
      nh = document.createElement('button');
      document.getElementById('finalDiv').appendChild(nh);
      nh.outerHTML = '<button class="closeBtn m-r" onclick="share()">שיתוף תוצאות</button>';
    }

    document.getElementById('quastionCard').classList.add('hide');
    document.getElementById('quastionCard').classList.remove('main-container');
    document.getElementById('finalDivBig').classList.remove('hide');
    document.getElementById('finalDivBig').classList.add('main-container');
  }
}

var input = [];
var wins = [];
var yesOrNoMode = false;

var ques = [
  'עד כמה תרצו שהסדרה תהיה מצחיקה?',
  'עד כמה רומנטית תרצו שהסדרה תהיה?',
  'כמה אקשן תרצו שיהיה בסדרה? (יריות וכו)',
  'עד כמה תרצו שהסדרה תכלול או תעסוק במדע בדיוני?',
  'עד כמה ארוכה תרצו שהסדרה תהיה?',
  'עד כמה דמויות ראשיות תרצו שהסדרה תכלול?',
  'עד כמה תרצו שהסדרה תהיה גסה?',
  'עד כמה תרצו שהסדרה תעסוק בחייהם היומיים של הדמויות?',
  'עד כמה תרצו שהסדרה תהיה ישנה?',
  'האם תרצו שהדמויות בסדרה ישברו את הקיר הרביעי?',
  'האם תרצו שהסדרה תכלול צחוק של קהל ברקע?',
  'האם תרצו שהסדרה תהיה מצולמת או מצויירת?'
];

quesDes = [
  '1 - קצת מצחיקה | 5 - מאוד מצחיקה',
  '1 - בכלל לא | 5 - מאוד רומנטית',
  '1 - בכלל לא | 5 - הרבה אקשן',
  '1 - בכלל לא | 5 - הרבה',
  '1 - עד 3 עונות | 5 - מעל 15 עונות',
  '1 - דמות ראשית אחת | 5 - מעל 7 דמויות ראשיות',
  '1 - בכלל לא גסה | 5 - מאוד גסה',
  '1 - בכלל לא | 5 - הרבה',
  '1 - 2017 ומעלה | 5 - 1980 ומטה',
  'לדוגמא דיבור אל המצלמה או הכרה בעובדה שהם בתוך סדרת טלוויזיה (כמו שעושים בריאליטי ובדוקומנטרי)',
  '',
  ''
];

var quesShort = [
  'מצחיקה',
  'רומנטית',
  'אקשן',
  'מדע בדיוני',
  'אורך',
  'דמויות ראשיות',
  'גסות',
  'חיים יומיומיים',
  'ישנה',
  'שבירת הקיר הרביעי',
  'צחוק של קהל',
  'צילום/ציור'
];

var table = document.createElement('table');
document.getElementById('popWindowData').appendChild(table);
var tr = document.createElement('tr');
table.appendChild(tr);
var th;

for(var i = 0; i < quesShort.length; i++){
  if(i % parseInt(quesShort.length / 3) == 0) {
    th = document.createElement('th');
    tr.appendChild(th);
  }

  var newBox = document.createElement('div');
  newBox.classList.add('boxRate');
  th.appendChild(newBox);

  var newItem = document.createElement('p');
  newItem.classList.add('rateTitle');
  newItem.innerHTML = quesShort[i];

  newBox.appendChild(newItem);

  var newItemDes = document.createElement('p');
  newItemDes.id = 'des' + i;
  newItemDes.classList.add('rateDes');
  newItemDes.innerHTML = 0;

  newBox.appendChild(newItemDes);
}


var realWords = ['המפץ הגדול', 'Harvard', 'Yale', 'Oxford', 'Nosh', 'MIT', 'Noam', 'Dell', 'YK8', 'IL', 'USA', 'Nba', 'Noah', 'HP', 'Friends', 'New Girl', 'Philly', 'NYC', 'LA', 'IDK', 'LOL'];

var words = realWords;

var realBase = {
  "המפץ הגדול": [
    3, 3, 1, 3, 4, 5, 4, 5, 2, 2, 1, 1
  ],
  Harvard: [
    1, 1, 4, 4, 1, 4, 3, 5, 5, 2, 0, 0
  ],
  Yale: [
    5, 1, 2, 3, 3, 3, 1, 5, 1, 3, 0, 0
  ],
  Oxford: [
    3, 5, 4, 1, 1, 5, 3, 4, 3, 1, 0, 0
  ],
  Nosh: [
    5, 5, 4, 1, 4, 2, 2, 2, 3, 5, 0, 0
  ],
  MIT: [
    2, 5, 1, 4, 4, 1, 2, 3, 1, 1, 0, 0
  ],
  Noam: [
    1, 3, 4, 1, 5, 4, 4, 1, 5, 3, 0, 0
  ],
  Dell: [
    4, 1, 3, 1, 4, 2, 5, 5, 4, 2, 0, 0
  ],
  YK8: [
    4, 5, 1, 4, 4, 5, 3, 5, 1, 2, 0, 0
  ],
  IL: [
    5, 4, 3, 4, 2, 1, 5, 1, 4, 2, 0, 0
  ],
  USA: [
    2, 3, 3, 3, 4, 3, 3, 1, 2, 3, 0, 0
  ],
  Nba: [
    1, 3, 2, 4, 4, 2, 2, 1, 5, 4, 0, 0
  ],
  Noah: [
    5, 4, 5, 3, 5, 3, 1, 1, 2, 5, 0, 0
  ],
  HP: [
    2, 2, 1, 3, 1, 3, 5, 2, 3, 3, 0, 0
  ],
  Friends: [
    5, 3, 5, 5, 2, 5, 2, 3, 3, 3, 0, 0
  ],
  'New Girl': [
    3, 3, 1, 1, 3, 3, 1, 4, 5, 2, 2, 1
  ],
  Philly: [
    3, 2, 1, 3, 2, 5, 3, 2, 4, 2, 0, 0
  ],
  NYC: [
    4, 3, 4, 2, 3, 5, 4, 4, 3, 2, 0, 0
  ],
  LA: [
    5, 5, 2, 5, 5, 5, 1, 4, 3, 1, 0, 0
  ],
  IDK: [
    3, 1, 2, 2, 1, 3, 4, 2, 2, 4, 0, 0
  ],
  LOL: [
    3, 3, 4, 4, 3, 1, 5, 3, 2, 5, 0, 0
  ]
};

var base = realBase;