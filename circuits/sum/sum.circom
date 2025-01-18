pragma circom 2.1.6;

include "../node_modules/circomlib/circuits/comparators.circom";

template SubsetSum(n) {
  // Parameters
  signal input numbers[n];     
  signal input target;         
  signal input subset[n];      

  signal output out;

  for (var i = 0; i < n; i++) {
      subset[i] * (1 - subset[i]) === 0;
  }

  signal in[n];

  in[0] <== numbers[0] * subset[0];

  for (var i = 1; i < n; i++) {
      in[i] <== in[i - 1] + (numbers[i] * subset[i]);
  }

  component eq = IsEqual();
  eq.in[0] <== target;
  eq.in[1] <== in[n-1];

  out <== eq.out;
}

component main = SubsetSum(9);
