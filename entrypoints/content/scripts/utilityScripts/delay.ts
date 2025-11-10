interface CancelableDelay<T> {
  promise: Promise<T>;
  cancel: () => void;
}

export function createCancelableDelay<T>(ms: number, value?: T): CancelableDelay<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  let rejectPromise: (reason?: any) => void;

  const promise = new Promise<T>((resolve, reject) => {
    rejectPromise = reject; // Store the reject function to allow external cancellation
    timeoutId = setTimeout(() => {
      resolve(value as T); // Resolve with the provided value after the delay
    }, ms);
  });

  const cancel = () => {
    clearTimeout(timeoutId); // Clear the scheduled timeout
    rejectPromise(new Error("Delay canceled")); // Reject the promise to indicate cancellation
  };

  return { promise, cancel };
}

// Example usage:
// async function demonstrateCancelableDelay() {
//   console.log("Starting delay...");
//   const delayInstance = createCancelableDelay(3000, "Delay completed!");
// 
//   // You can set a timeout to cancel the delay after a shorter period
//   setTimeout(() => {
//     console.log("Attempting to cancel delay...");
//     delayInstance.cancel();
//   }, 1000);
// 
//   try {
//     const result = await delayInstance.promise;
//     console.log(result); // This will not be reached if canceled
//   } catch (error: any) {
//     console.error("Delay caught an error:", error.message); // This will be reached if canceled
//   }
// 
//   console.log("Delay demonstration finished.");
// }
// 
// demonstrateCancelableDelay();
// 
// Another example where the delay completes
// async function demonstrateSuccessfulDelay() {
//   console.log("Starting successful delay...");
//   const delayInstance = createCancelableDelay(2000, "Successful delay finished!");
//   try {
//     const result = await delayInstance.promise;
//     console.log(result);
//   } catch (error: any) {
//     console.error("Error in successful delay:", error.message);
//   }
//   console.log("Successful delay demonstration finished.");
// }
// 
// demonstrateSuccessfulDelay();