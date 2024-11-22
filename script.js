// إعدادات اللعبة
let currentPlayer = "X";  // اللاعب الذي يبدأ (X)
let board = ["", "", "", "", "", "", "", "", ""];  // تمثل المربعات
let gameOver = false;  // حالة اللعبة (هل انتهت؟)

// اختيار جميع المربعات
const cells = document.querySelectorAll(".cell");

// إعادة تشغيل اللعبة
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", resetGame);

// التفاعل مع المربعات
cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        if (gameOver || e.target.innerText !== "") return;

        // تعيين قيمة الكرت
        const index = e.target.getAttribute("data-index");
        board[index] = currentPlayer;
        e.target.innerText = currentPlayer;

        // التحقق من الفائز
        if (checkWinner()) {
            setTimeout(() => {
                alert(`${currentPlayer} فاز باللعبة!`);
            }, 100);
            gameOver = true;
        } else if (!board.includes("")) {
            // تعادل
            setTimeout(() => {
                alert("اللعبة انتهت بالتعادل!");
            }, 100);
            gameOver = true;
        } else {
            // تغيير اللاعب
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});

// التحقق من وجود فائز
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// إعادة تشغيل اللعبة
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    cells.forEach(cell => {
        cell.innerText = "";
    });
}
