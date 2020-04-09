// Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе
var activePlayer = 0;
var score;
var roundScore;
var diceDome = document.querySelector(".dice");

function startNewGame() {
  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  activePlayer = 0;
  score = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө
  //var diceNumber = Math.floor(Math.random() * 6) + 1;

  // <div class="player-score" id="score-0">43</div>
  //window.document.querySelector("#score-0").textContent = dice;

  //document.querySelector("#score-1").innerHTML = "<em> Yes!</em>";

  // Программ эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("name-0").textContent = "player-0";
  document.getElementById("name-1").textContent = "player-1";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
  diceDome.style.display = "none";
}
startNewGame();
// шоог шидэх эвент лестенер
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1-6 хүртэл санамсаргүй тоо гаргана.
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  // Шооны зургыг вэб дээр гаргаж ирнэ.
  diceDome.style.display = "block";
  //Буусан санамсаргүй шоог вэб дээр гаргана.
  diceDome.src = "dice-" + diceNumber + ".png";

  // Тоглогчийн ээлжийн оноог нэмж өгнө  Буусан тоо нь нэгээс ялгаатай бол ихэвхитэй тооны оноог нэмэгдүүлнэ
  if (diceNumber != 1) {
    // 1-ээс ялгаатай тоо буулаа
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    // энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
    // нэг тоглгчийг нөгөө тоглогч руу шилжүүллээ
    switchToNextPlayer();
  }
});
// Hold button event listener
document.querySelector(".btn-hold").addEventListener("click", function () {
  //уг тоглогчийн цуглуулсан оноог глобал оноон дээр нэмж өгнө
  score[activePlayer] = score[activePlayer] + roundScore;
  // Уг тоглогч хожсон эсэхийг шалгах
  if (score[activePlayer] >= 20) {
    // шалагч гэсэ теxt нэрнийх нь оронд гаргана.
    document.getElementById("name-" + activePlayer).textContent = "WINNER!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
  } else {
  }

  document.getElementById("score-" + activePlayer).textContent =
    score[activePlayer];
  switchToNextPlayer();
});

//Энэ функц нь тоглох ээлжийг дараагийн ээлжинд шилжүүлнэ
function switchToNextPlayer() {
  // энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  //улаан цэгийг шилжүүлэх код бичнэ
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // шоог түр алга болгоно
  diceDome.style.display = "none";
  // 1 буусан тул идэвхитэй тоглогчийн оноог нэмэгдүүл.
}

// шинэ тоглоом эхлүүлэх товчны эвент лестенер
document.querySelector(".btn-new").addEventListener("click", startNewGame);
