const milestonesData = JSON.parse(data).data;
console.log(milestonesData);

function loadMilestones() {
  const milestones = document.querySelector(".milestones");

  milestones.innerHTML = `${milestonesData
    .map(function (milestone) {
      return ` <div class="milestone border-b" id= ${milestone._id}>
      <div class="flex">
        <div class="checkbox"><input type="checkbox" onclick = "markMilestone(this, ${
          milestone._id
        })" /></div>
        <div onclick="openMilestone(this, ${milestone._id})">
          <p>
            ${milestone.name}
            <span><i class="fas fa-chevron-down"></i></span>
          </p>
        </div>
      </div>
      <div class="hidden_panel">
        ${milestone.modules
          .map(function (milestone) {
            return `<div class="module border-b">
          <p>${milestone.name}</p>
        </div>`;
          })
          .join(" ")}
      </div>
    </div>`;
    })
    .join(" ")}`;
}

function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const activePanel = document.querySelector(".active");

  //first remove active class if any [other than the clicked one]
  if (activePanel && !milestoneElement.classList.contains("active")) {
    activePanel.classList.remove("active");
  }

  //toggle current clicked one
  milestoneElement.classList.toggle("active");

  //first hide previous pannel if open [other than the clicked element]
  if (!currentPanel.classList.contains("show") && shownPanel)
    shownPanel.classList.remove("show");

  //toggle current element
  currentPanel.classList.toggle("show");

  showMilestone(id);
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  const title = document.querySelector(".title");
  const details = document.querySelector(".details");

  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;

  title.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}

//listen for hero img load
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
  milestoneImage.style.opacity = "1";
};

function markMilestone(checkbox, id) {
  const milestoneslist = document.querySelector(".milestones");
  const donelist = document.querySelector(".doneList");

  const item = document.getElementById(id);

  if (checkbox.checked) {
    //mark as done
    milestoneslist.removeChild(item);
    donelist.appendChild(item);
  } else {
    //back to main list
    milestoneslist.appendChild(item);
    donelist.removeChild(item);
  }
}

loadMilestones();
