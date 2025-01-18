# Subset Sum zk-SNARK Game

This project implements a classic Subset Sum game enhanced with zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge). The game challenges players to select a subset of numbers from a given list such that their sum matches a target value. Using zk-SNARKs, players can prove their solution without revealing the actual subset.

## Features
- **Secure Verification**: Verify subset solutions using zk-SNARKs without revealing private inputs.
- **Interactive Frontend**: A web UI for player to input their data and verify solutions.
- **Customizable Circuit**: Built using Circom to support various list sizes and target values.

---

## Prerequisites
To run this project, ensure the following tools are installed:

1. [Node.js](https://nodejs.org/)
2. [Circom](https://docs.circom.io/)
3. [SnarkJS](https://github.com/iden3/snarkjs)
4. Basic knowledge of cryptography and zk-SNARKs.

---

## Project Structure
```
subset-sum-zk/
├── circuits/             # Circom circuits
│   ├── sum
│   │    └── sum.circom
│   │    └── compile.sh
│   │    └── generateWitness.sh
│   │    └── executeGroth16.sh 
│   │    └── input.json 
├── docs/             # web frontend
├── README.md
```

---

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/truthixify/subset-sum.git
cd subset-sum
```

### 2. Install Dependencies

### 3. Compile the Circuit

Navigate to the `circuits/` directory and run:
```bash
cd circuits
npm install
```

```bash 
cd sum
```
Compile the circuit:
```bash
./compile.sh
```

Generate witness:
```bash
./generateWitness.sh
```

Execute Groth16:
```bash
./executeGroth16.sh
```

You will then copy the `sum.wasm`, `sum_final.zkey` and `verification_key.json` into the docs folder

#### Frontend:
```bash
cd ../../docs
```

---

## Usage

1. Open the index.html in your browser.
2. Play the game to get to solve the puzzle.
3. You can also play it online [here](https://truthixify.github.io/subset-sum/)
---

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve this project.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

