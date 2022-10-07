// Object properties to be match
const propertiesToMatch = ['sourceAccount', 'targetAccount', 'amount', 'category'];

// Helper Functions
// Comparing the elements of object
const compareTransaction = (transaction1, transaction2, transactionObject) => transactionObject.every(object => transaction1[object] === transaction2[object]);

// Checking for transaction less than 1 minute
const isOneMinute = (transaction1, transaction2) => Math.abs(new Date(transaction1.time) - new Date(transaction2.time)) < 60000;

// Checking for Duplicate transaction that match the transaction properties and is within 0 - 59 seconds
const isDuplicate = (transaction1, transactions2) => compareTransaction(transaction1, transactions2, propertiesToMatch) && isOneMinute(transaction1, transactions2);

// Helper function for grouping the duplicates
function groupDuplicateTransactions(duplicates) {
  // Set sub array into empty brackets
  const subArrays = [];

  // Loop through the duplicates
  for(let index = 1, previousDuplicate = false, duplicateIndex = -1; index < duplicates.length; index++) {
    // Use a nested if statements
    // If the first transaction in the array and any other transaction in the array is an exact duplicate
    if(isDuplicate(duplicates[index], duplicates[index - 1])) {
      //
      if(!previousDuplicate) {
        duplicateIndex++;
      }
      // If there is no duplicate in the sub array then set it to empty
      if(!subArrays[duplicateIndex]) subArrays[duplicateIndex] = [];

      // Then push the last element of the duplicate sub array of duplicates.
      subArrays[duplicateIndex].push(duplicates[index - 1]);

      // If transaction is equal to the last duplicates then push that transaction into the subarray
      if(index === duplicates.length - 1) subArrays[duplicateIndex].push(duplicates[index]);

      // Then return back to the state to continue the loop until its over.
      previousDuplicate = true;
    } else {
      // If there is previous duplicates the just push it to the subarray of duplicate
      if(previousDuplicate) subArrays[duplicateIndex].push(duplicates[index - 1]);

      // And return previous duplicate as false
      previousDuplicate = false;
    }
  }
  // Then return the sub arrays
  return subArrays;

}

// Duplicate transaction function (MAIN FUNCTION)
// Filtering the valid transactions and sorting transaction into group of objects
function findDuplicateTransactions(transactions) {

  // Check if transactions is not an object
  if(typeof transactions !== "object"){
    throw new Error ("");
  }
  // Spread the transations object to avoid mutation of object
  const transactionsObject = [...transactions]

     // Sort the transaction by the properties
    .sort((transaction1, transaction2) => {

      // Checking if the first transaction for source account picked is not equal to any other transaction
      if(transaction1.sourceAccount !== transaction2.sourceAccount) {

        // Then return 1 for each of the transaction found greater another transaction
        let sourceAcoountGroup = transaction1.sourceAccount > transaction2.sourceAccount ? 1 : -1;
        return sourceAcoountGroup;
      }

      // Checking if the first transaction for target account picked is not equal to any other transaction
      else if(transaction1.targetAccount !== transaction2.targetAccount) {

        // Then return 1 for each of the transaction found greater than another transaction
        let targetAccountGroup = transaction1.targetAccount > transaction2.targetAccount ? 1 : -1;
        return targetAccountGroup;
      }

      // Checking if the first transaction for amount picked is not equal to any other transaction
      else if(transaction1.amount !== transaction2.amount) {

        // Then return 1 for each of the transaction found greater another transaction
        let amountGroup = transaction1.amount > transaction2.amount ? 1 : -1;
        return amountGroup;
      }

      // Checking if the first transaction for category picked is not equal to any other transaction
      else if (transaction1.category !== transaction2.category) {
        let categoryGroup = transaction1.category > transaction2.category ? 1 : -1;
        return categoryGroup;
      }
      
      // Checking if the first transaction for source account picked is not equal to any other transaction
      else if(transaction1.time !== transaction2.time) {
        let timeGroup = transaction1.time > transaction2.time ? 1 : -1;
        return timeGroup;
        
      }

  });
  // Return the grouped duplicate after sorting with there id
  return groupDuplicateTransactions(transactionsObject).sort((transaction1, transaction2) => transaction1[0].id - transaction2[0].id);

}


export default findDuplicateTransactions;
