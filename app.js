let A, B, C, D;
let results = document.getElementById("results").querySelectorAll("p");

document.getElementById("solveButton").addEventListener("click", solveTriangle);

function solveTriangle() {
  A = Number(document.getElementById("sideA").value);
  B = Number(document.getElementById("sideB").value);
  C = Number(document.getElementById("sideC").value);
  D = Number(document.getElementById("sideD").value);
  ABCD = solve(A, B, C, D);
  if (!Array.isArray(ABCD)) {
    error("show", ABCD);
    return;
  }

  error("hide");

  ABCD.forEach((result, index) => {
    results[index].querySelector("span").innerText = ABCD[index];
  });
}

function solve(A, B, C, D) {
  if (A && B) {
    givenC = C;
    givenD = D;
    C = Math.sqrt(B ** 2 + A ** 2);
    D = C / 2;
    if ((givenC != "" && givenC != C) || (givenD != "" && givenD != D)) {
      return "Impossible sizes for a right triangle";
    }
    return [A, B, C, D];
  }

  if (A && C) {
    givenB = B;
    givenD = D;
    B = Math.sqrt(C ** 2 - A ** 2);
    D = C / 2;
    if ((givenB != "" && givenB != B) || (givenD != "" && givenD != D)) {
      return "Impossible sizes for a right triangle";
    }
    return [A, B, C, D];
  }

  if (B && C) {
    givenA = A;
    givenD = D;
    A = Math.sqrt(C ** 2 - B ** 2);
    D = C / 2;
    if ((givenA != "" && givenA != A) || (givenD != "" && givenD != D)) {
      return "Impossible sizes for a right triangle";
    }
    return [A, B, C, D];
  }

  if (A && D) {
    givenB = B;
    givenC = C;
    C = 2 * D;
    B = Math.sqrt(C ** 2 - A ** 2);
    if (givenC != C || givenB != C || givenC != B || givenB != B) {
      return "Impossible sizes for a right triangle";
    }
    return [A, B, C, D];
  }

  if (B && D) {
    givenA = A;
    givenC = C;
    A = Math.sqrt(C ** 2 - B ** 2);
    C = 2 * D;
    if ((givenC != "" && givenC != C) || (givenA != "" && givenA != A)) {
      return "Impossible values";
    }
    return [A, B, C, D];
  }

  if (D && C) {
    return `Sadly, without more information, there is no way to find the other sides`;
  }

  if (InsufficientInfo([A, B, C, D])) {
    console.log("line 87")
    return `Sadly, without more information, there is no way to find the other sides`;
  }
}

function error(action, errorText) {
  errorTag = document.getElementById("error");
  if (action === "hide") {
    errorTag.style.display = "none";
  }
  if (action === "show") {
    errorTag.innerText = errorText;
    errorTag.style.display = "block";
  }
}

function InsufficientInfo(arr) {
  let emptyCount = 0;
  let nonEmptyCount = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == false) {
      emptyCount++;
    } else {
      nonEmptyCount++;
    }
  }
  
  return emptyCount === 3 && nonEmptyCount === 1;
}
