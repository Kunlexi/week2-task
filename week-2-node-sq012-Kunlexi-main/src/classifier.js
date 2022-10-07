function classifier(input) {
  // Duplicating the array to avoid immutation
  // Because i don't want to tamper the original object
  let studentArray = [...input];
  // Throw error if input is not equal to object
  if (typeof input !== "object") {
    throw new Error("Invalid Input");
  }
  // Map through the student array to get the student ages in an array
  studentArray = studentArray.map(eachStudent => {
    eachStudent.age = new Date().getFullYear() - new Date(eachStudent.dob).getFullYear();
    return eachStudent;
  });
  // Sort student array by age
  studentArray = studentArray.sort((a, b) => a.age - b.age);
  // Set student group array to empty
  let studentGroup = [];
  // Set student age group array to empty
  let studentAgeGroup = [];
  // Set age limit initially to 0
  let limit = 0;
  // Loop through the student array again
  for (let i = 0; i < studentArray.length; i++) {
    // Set each element to person
    let person = studentArray[i];
    // Check the limit for the first time if its zero
    if (limit === 0) {
      // If true set limit to person age
      limit = person.age;
    }
    // Now access the person age and limits, to check the ones that are less than five
    // And also set condition to make sure that the student are not more than 3 in group
    if (person.age - limit <= 5 && studentAgeGroup.length < 3) {
      // Push those that return true into the student age group
      studentAgeGroup.push(person)
    } else {
      // Push those that return false for the first statement into student group
      studentGroup.push(studentAgeGroup);
      studentAgeGroup = [];
      studentAgeGroup.push(person)
      limit = person.age;
    }
  }
  // Push the student age group into the student group.
  if (studentAgeGroup.length) studentGroup.push(studentAgeGroup);
  // Set the result to empty array
  let result = {};
  // Loop through the student group to arrange the already create group in to object
  for (let i = 0; i < studentGroup.length; i++) {
    // Arrange the groups into different groups (group 1, gtoup 2, .....)
    let res = "group" + (i + 1)
    // Get the age of students in the groups by group
    let eachAge = studentGroup[i].map(e => e.age)
    eachAge;
    // Setting the values in each goups
    result[res] = {
      // Members object
      members: studentGroup[i],
      // Age of the oldest student in the group
      oldest: Math.max(...eachAge),
      // Sum the age of the students in the group
      sum: eachAge.reduce((num, tot) => num + tot, 0),
      // Students reg numbers
      regNos: studentGroup[i].map(e => parseInt(e.regNo)).sort((a, b) => a - b)
    }
  }
  // Return the result
  result.noOfGroups = studentGroup.length;
  return result;


}

module.exports = classifier;
