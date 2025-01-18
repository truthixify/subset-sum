let numbers = generateNumbers(9)
let target = generateTarget(numbers)
let current = 0
let subset = Array(9).fill(0)

const numbersBoard = document.querySelector(".numbers-board")
const targetBoard = document.querySelector(".target-board span")
const currentBoard = document.querySelector(".current-board span")

addEventListener("DOMContentLoaded", () => {
  startGame()

  const submitBtn = document.querySelector(".submit-btn")
  const resetBtn = document.querySelector(".reset-btn")


  resetBtn.addEventListener("click", () => {
    currentBoard.textContent = 0
    currentBoard.parentElement.classList.remove("bg-green-400")
    currentBoard.parentElement.classList.remove("bg-yellow-400")
    currentBoard.parentElement.classList.add("bg-red-400")
    numbers = generateNumbers(9)
    target = generateTarget(numbers)
    current = 0
    subset = Array(9).fill(0)
    startGame()
  })

  submitBtn.addEventListener("click", async () => {
    try {
        const proof = await verifyProof(numbers, target, subset)

        if (proof) {
            alert("Valid proof")
        }
    } catch (error) {
        alert("Invalid proof")
    }
  })
})

function generateNumbers(length, min = 1, max = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function generateTarget(numbers) {
  const subset = numbers.filter(() => Math.random() > 0.5); 
  return subset.reduce((sum, num) => sum + num, 0); 
}

async function startGame() {
  numbersBoard.replaceChildren()

  numbers.forEach(num => {
    const numberHolder = document.createElement("p")
    numberHolder.classList.add("number-holder", "border-2", "border-green-400", "text-green-400", "text-center", "cursor-pointer")

    numberHolder.textContent = num

    numbersBoard.appendChild(numberHolder)
  })

  const numberHolders = document.querySelectorAll(".number-holder")
  numberHolders.forEach((holder, i) => {
    holder.addEventListener("click", () => {
      if (subset[i] === 1 ) {
        current -= numbers[i]
        holder.classList.add("text-green-400")
        holder.classList.remove("bg-green-400", "text-white")
      } else {
        current += numbers[i]
        holder.classList.remove("text-green-400")
        holder.classList.add("bg-green-400", "text-white")
      }

      subset[i] === 1 ? subset[i] = 0 : subset[i] = 1
      currentBoard.textContent = current

      if (current == target) {
        currentBoard.parentElement.classList.remove("bg-yellow-400")
        currentBoard.parentElement.classList.remove("bg-red-400")
        currentBoard.parentElement.classList.add("bg-green-400")
      } else if (current > target) {
        currentBoard.parentElement.classList.remove("bg-yellow-400")
        currentBoard.parentElement.classList.remove("bg-green-400")
        currentBoard.parentElement.classList.add("bg-red-400")
      } else if (current > target / 2) {
        currentBoard.parentElement.classList.remove("bg-green-400")
        currentBoard.parentElement.classList.remove("bg-red-400")
        currentBoard.parentElement.classList.add("bg-yellow-400")
      } else {
        currentBoard.parentElement.classList.remove("bg-green-400")
        currentBoard.parentElement.classList.remove("bg-yellow-400")
        currentBoard.parentElement.classList.add("bg-red-400")
      }
    })
  })

  targetBoard.textContent = target
}

async function verifyProof(numbers, target, subset) {
  const input = {
    numbers, 
    target, 
    subset
  }

  const { proof, publicSignals } = await snarkjs.groth16.fullProve( input, "sum.wasm", "sum_final.zkey");

  const vkey = await fetch("verification_key.json").then( function(res) {
      return res.json();
  });

  const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);

  return res
}