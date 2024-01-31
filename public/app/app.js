import { log, timeoutPromise } from "./utils/promise-help.js";
import "./utils/array-help.js";
import { notasService as service } from "./nota/service.js";
import {
  debounceTime,
  partialize,
  pipe,
  takeUntil,
} from "./utils/operators.js";



const operations = pipe(
   partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const action = operations(
  (500,
  takeUntil(3, () =>
    timeoutPromise(200, service.sumItems("2143")).then(console.log).catch(console.log)
  ))
);

document.querySelector("#myButton").onclick = action;
