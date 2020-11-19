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
          //store the send back data to a variable
          const jsonContent = data["title"];
          //console.log(jsonContent);

          //Need to append the data to the HTML
          //so the user will see the update of the todo list
          const newParagraph = document.createElement("p");
          const newContent = document.createTextNode(jsonContent);

          newParagraph.appendChild(newContent);
          todoContent.appendChild(newParagraph);

          //Empty the input content, so user don't need to manually delete it
          todoInputBox.value = "";
        })
        .catch((err) => console.log(err));

    });
}
