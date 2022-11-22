function c(v){console.log(v)}
function t(v){console.table(v)}

function start(){
  document.getElementById('main-div').classList.add('hide');
  document.getElementById('main-div').classList.remove('main-container');
  document.getElementById('quastionCard').classList.remove('hide');
  document.getElementById('quastionCard').classList.add('main-container');

  document.getElementById('theQue').innerHTML = ques[0];
  document.getElementById('theQueDes').innerHTML = quesDes[0];
}

function answerBtn(answer){
  input.push(answer);
  nextQue();
}

function showPopWin(id){
  for(var i = 0; i < quesShort.length; i++){
    document.getElementById('des' + i).innerHTML = base[words[id]][i];
  }
  document.getElementById('finalDiv').classList.add('hide');
  document.getElementById('finalDiv').classList.remove('main-container');
  document.getElementById('rateDiv').classList.remove('hide');
  document.getElementById('rateDiv').classList.add('modal-content');
}

function hidePopWin(){
  document.getElementById('rateDiv').classList.add('hide');
  document.getElementById('rateDiv').classList.remove('modal-content');
  document.getElementById('finalDiv').classList.remove('hide');
  document.getElementById('finalDiv').classList.add('main-container');
}

function nextQue(){
  var n = input.length;
  if(n != ques.length){
    var theCurrentQue = ques[n];
    document.getElementById('theQue').innerHTML = theCurrentQue;

    var theCurrentQueDes = quesDes[n];
    document.getElementById('theQueDes').innerHTML = theCurrentQueDes;

    if(n == 10) {
      for(var i = 1; i < 6; i++){
        var item = document.getElementById(i + 'btn');
        if(i > 2) item.remove();
        else if(i == 1) item.innerHTML = 'כן';
        else item.innerHTML = 'לא';
      }
    } else if(n == 11) {
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

    for(var key in wins){
      var newHunBar = document.createElement('div');

      var newBar = document.createElement('div');
      newBar.classList.add('barRes');
      newBar.style.width = wins[key].difference + '%';

      var newRes = document.createElement('p');
      newRes.classList.add('result');
      newRes.innerHTML = (parseInt(key) + 1) + '# - ' + wins[key].name + ' (' + wins[key].difference + '% התאמה)';
      
      document.getElementById('finalDiv').appendChild(newHunBar);
      newHunBar.outerHTML = '<div id="hunBar' + key + '" class="barHunRes" onclick="showPopWin(' + key + ')"></div>';
      document.getElementById('hunBar' + key).appendChild(newBar);
      newBar.appendChild(newRes);
    }

    document.getElementById('quastionCard').classList.add('hide');
    document.getElementById('quastionCard').classList.remove('main-container');
    document.getElementById('finalDiv').classList.remove('hide');
    document.getElementById('finalDiv').classList.add('main-container');
  }
}

var input = [];
var wins = [];

var ques = [
  'מה',
  'העדה',
  'שלמה',
  'I',
  'afraid',
  'from',
  'the',
  'monster',
  'in',
  'the',
  'closet',
  'Rain'
];

ques = [
'עד כמה תרצו שהסדרה תהיה מצחיקה?',
'עד כמה רומנטית תרצו שהסדרה תהיה?',
'כמה אקשן תרצו שיהיה בסדרה?',
'עד כמה תרצו שהסדרה תכלול או תעסוק במדע בדיוני?',
'עד כמה ארוכה תרצו שהסדרה תהיה? (הכוונה למספר העונות)',
'עד כמה דמויות ראשיות תרצו שהסדרה תכלול?',
'עד כמה תרצו שהדמויות בסדרה ידברו אל המצלמה? (שבירת הקיר הרביעי - כמו שעושים בריאליטי ובדוקומנטרי)',
'עד כמה תרצו שהסדרה תהיה גסה?',
'עד כמה תרצו שהסדרה תעסוק בחייהם היומיים של הדמויות?',
'עד כמה תרצו שהסדרה תהיה ישנה?',
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
  '1 - בכלל לא | 5 - תדירות גבוהה',
  '1 - בכלל לא גסה | 5 - מאוד גסה',
  '1 - בכלל לא | 5 - הרבה',
  '1 - 2017 ומעלה | 5 - 1980 ומטה',
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
'שבירת הקיר הרביעי',
'גסות',
'חיים יומיומיים',
'ישנה',
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


var words = ['המפץ הגדול', 'Harvard', 'Yale', 'Oxford', 'Nosh', 'MIT', 'Noam', 'Dell', 'YK8', 'IL', 'USA', 'Nba', 'Noah', 'HP', 'Friends', 'New Girl', 'Philly', 'NYC', 'LA', 'IDK', 'LOL'];

var base = {
  "המפץ הגדול": [
    3, 3, 1, 3, 4, 5, 1, 4, 5, 2, 1, 1
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
