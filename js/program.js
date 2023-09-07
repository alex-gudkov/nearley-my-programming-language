let n = 10;
let i = 1;
let x_prev = 1;
let x_prev_prev = 1;
while (i <= n) {
  console.log(x_prev);
  let x = x_prev + x_prev_prev;
  x_prev = x_prev_prev;
  x_prev_prev = x;
  i = i + 1;
}
