const todoContent = document.getElementById("todo-list");
const todoInputBox = document.getElementById("todo-content");
const todoSubmitButton = document.getElementById("todo-submit");

//console.log(todoInputBox.value);
//console.log(todoSubmitButton);
window.onload = () => {
  //This function will get all the data in todo list and display on the index.html
  fetch(`/api/get`)
    .then((response) => (response.ok ? response.json() : Promise.reject()))
    .then((data) => {
      //console.log(data["todo"]);

      //Add the add to html element
      for (let i =0; i < data["todo"].length; i++) {
        const newParagraph = document.createElement("p");
        const newContent = document.createTextNode(data["todo"][i]);
        //console.log(newContent);

        newParagraph.appendChild(newContent);
        todoContent.appendChild(newParagraph);
      }
    })

    //This function will add a event listener for user to submit the data and add it to the to do list
    todoSubmitButton.addEventListener("click", function() {
      //Header is needed!
      const headers = new Headers();
      headers.set("content-type", "application/json");

      //The user input content
      const inputContent = todoInputBox.value;

      console.log(inputContent);

      fetch('/api/post', {
        headers,
        method: "POST",
        body: JSON.stringify({
          title: inputContent,
        }),
      })
        //.then((response) => response.json());
        .then((response) => (response.ok && response.status === 201 ? response.json() : Promise.reject(response.status)))
        .then((data) => {
          console.log("hi");
          console.log(data);
        })
        .catch((err) => console.log(err));

    });
}
