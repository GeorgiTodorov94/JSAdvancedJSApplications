window.addEventListener('load', solution);

function solution() {
  const addButton = document.getElementById("add-btn");
  const previewList = document.querySelector(".preview-list");
  const pendingList = document.querySelector(".pending-list");
  const resolvedList = document.querySelector(".resolved-list");
  const employeeInput = document.getElementById("employee");
  const categorySelect = document.getElementById("category");
  const urgencySelect = document.getElementById("urgency");
  const teamSelect = document.getElementById("team");
  const descriptionInput = document.getElementById("description");

  addButton.addEventListener("click", function (event) {
    event.preventDefault();

    const employee = employeeInput.value.trim();
    const category = categorySelect.value;
    const urgency = urgencySelect.value;
    const team = teamSelect.value;
    const description = descriptionInput.value.trim();

    if (employee && category && urgency && team && description) {
      const listItem = document.createElement("li");
      listItem.className = "problem-content";

      const article = document.createElement("article");
      const paragraphs = ["From", "Category", "Urgency", "Assigned to"];

      for (const paraText of paragraphs) {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${paraText}: ${eval(paraText.toLowerCase())}`;
        article.appendChild(paragraph);
      }

      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.textContent = description;
      article.appendChild(descriptionParagraph);

      listItem.appendChild(article);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit-btn";

      const continueButton = document.createElement("button");
      continueButton.textContent = "Continue";
      continueButton.className = "continue";

      listItem.appendChild(editButton);
      listItem.appendChild(continueButton);

      previewList.appendChild(listItem);

      employeeInput.value = "";
      categorySelect.value = "";
      urgencySelect.value = "";
      teamSelect.value = "";
      descriptionInput.value = "";
      addButton.disabled = true;
    }
  });

  document.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("edit-btn")) {
      const listItem = target.parentElement;
      moveItem(listItem, previewList);
    }

    if (target.classList.contains("continue")) {
      const listItem = target.parentElement;
      moveItem(listItem, pendingList, "Resolved");
    }

    if (target.classList.contains("resolved-btn")) {
      const listItem = target.parentElement;
      moveItem(listItem, resolvedList, "Clear");
    }

    if (target.classList.contains("clear-btn")) {
      const listItem = target.parentElement;
      listItem.remove();
    }
  });

  function moveItem(item, targetList, buttonText) {
    item.querySelector(".continue").remove();
    const button = document.createElement("button");
    button.textContent = buttonText;
    button.className = buttonText.toLowerCase() + "-btn";
    item.appendChild(button);
    targetList.appendChild(item);
  }

};
