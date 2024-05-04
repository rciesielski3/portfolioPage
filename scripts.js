document.addEventListener("DOMContentLoaded", function() {
    const contentContainer = document.getElementById("contentContainer");
    const contactContent = document.getElementById("contactContent");
    const form = document.getElementById("form");

    const aboutMeContent =  ["Father", "QA tester", "Sports enthusiast",
    "Talkative, inquisitive, ambitious, constantly looking for self-development and eager for news."]
        
    const respAndSkills = {
       "Main responsibilities": [
            "Develop and maintain test plans and test cases for software mobile and desctop applications",
            "Execute manual and automated tests to ensure software meets requirements",
            "Identify, document, and track bugs and other issues",
            "Monitor and report on quality metrics",
            "Collaborate with developers and other stakeholders to ensure quality",
            "Analyze and report on test results",
            "Create and maintain test environments",
            "Develop and maintain test data",
            "Participate in code reviews",
            "Investigate and troubleshoot customer issues"
        ],
        "Skills & Competencies": [
            "Test planning and execution",
            "Test case development and maintenance",
            "Bug identification and documentation",
            "Test environment management",
            "Code review and feedback",
            "Quality metrics analysis and reporting",
            "Troubleshooting and problem-solving",
            "Cross-functional collaboration",
            "Customer issue resolution",
            "Agile methodologies",
        ]
    }

function displayAboutMeInfo() {
    contentContainer.innerHTML = "";
    const aboutContainer = document.createElement("div");
    aboutContainer.classList.add("display-about-me-info");  

    const title = document.createElement("h2");
    title.textContent = "Who I am?";

    aboutContainer.appendChild(title);

    aboutMeContent.forEach(element => {
        const box = document.createElement("div");
        box.classList.add("box");

        const paragraph = document.createElement("p");
        paragraph.textContent = element;

        box.appendChild(paragraph);

        aboutContainer.appendChild(box);
    });

    contentContainer.appendChild(aboutContainer);
}

function displaySkillsPage() {
    contentContainer.innerHTML = "";
    for (const sectionTitle in respAndSkills) {
        const sectionContainer = document.createElement("div");
        sectionContainer.classList.add("section");

        const title = document.createElement("h2");
        title.textContent = sectionTitle;

        sectionContainer.appendChild(title);

        const skillList = document.createElement("ul");

        respAndSkills[sectionTitle].forEach(skill => {
            const listItem = document.createElement("li");
            listItem.textContent = skill;
            skillList.appendChild(listItem);
        });

        sectionContainer.appendChild(skillList);
        contentContainer.appendChild(sectionContainer);
    }
}

    
    async function fetchRepoData() {
        const response = await fetch("https://api.github.com/users/rciesielski3/repos");
        const data = await response.json();
        return data;
    }

    async function displayRepoContent() {
        const repos = await fetchRepoData();
    
        contentContainer.innerHTML = "";
        if (repos.length === 0) {
            displayUnderConstructionMessage(); 
        } else {
            const repoGrid = document.createElement("div");
            repoGrid.classList.add("repo-grid");
    
            repos.forEach(repo => {
                const repoBox = document.createElement("div");
                repoBox.classList.add("repo-box");
    
                const repoLink = document.createElement("a");
                repoLink.href = repo.html_url;
                repoLink.textContent = repo.name;
    
                const repoDescription = document.createElement("p");
                repoDescription.textContent = repo.description || "No description provided.";
    
                repoBox.appendChild(repoLink);
                repoBox.appendChild(repoDescription);
    
                repoGrid.appendChild(repoBox);
            });
    
            const title = document.createElement("h2");
            title.textContent = "Github Repositories";

            contentContainer.appendChild(title);
            contentContainer.appendChild(repoGrid);
        }
    }
    
    function displayMysmarthomePreview() {
        contentContainer.innerHTML = "";

        const iframe = document.createElement("iframe");
        iframe.src = "https://mysmarthome.cba.pl";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";

        contentContainer.appendChild(iframe);
    }

    function displayBlogPreview() {
        contentContainer.innerHTML = "";

        const iframe = document.createElement("iframe");
        iframe.src = "https://qa-journey.blogspot.com/";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";

        contentContainer.appendChild(iframe);
    }

    async function fetchLinkedInProfile() {
        try {
            const response = await fetch("https://www.linkedin.com/in/rafa%C5%82-ciesielski-820309100/details/experience/");
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const experienceSection = doc.getElementById("experience");
            return experienceSection ? experienceSection.innerHTML : null;
        } catch (error) {
            console.error("Error fetching LinkedIn profile:", error);
            return null;
        }
    }

    async function displayLinkedInProfile() {
        contentContainer.innerHTML = "<div class='spinner'></div>";
    
        try {
            const profileInfo = await fetchLinkedInProfile();
            contentContainer.innerHTML = "";
    
            if (profileInfo) {
                contentContainer.innerHTML = profileInfo;
            } else {
                const message = document.createElement("p");
                message.textContent = "Could not fetch LinkedIn profile information.";
    
                const showProfileButton = document.createElement("button");
                showProfileButton.classList.add("btnLinkedIn");
                showProfileButton.textContent = "Show LinkedIn Profile";
                showProfileButton.addEventListener("click", function() {
                    window.open("https://www.linkedin.com/in/rafa%C5%82-ciesielski-820309100", "_blank");
                });
                contentContainer.appendChild(message);
                contentContainer.appendChild(showProfileButton);
                contentContainer.classList.add("contentContainer")
            }
        } catch (error) {
            console.error("Error fetching LinkedIn profile:", error);
            contentContainer.innerHTML = "<p>An error occurred while fetching LinkedIn profile. Please try again later.</p>";
        }
    }
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const formData = new FormData(form);

        fetch("submit_form.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {

                alert("Your message has been sent! Thank you.");
                form.reset();
            } else {
         
                alert("Failed to send message. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    });

 
    function displayUnderConstructionMessage() {
        const message = document.createElement("p");
        message.textContent = "Coming soon. \n Under construction.";
        contentContainer.appendChild(message);
    }

const menuLinks = document.querySelectorAll(".menu nav ul li a");
menuLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        menuLinks.forEach(menuLink => {
            menuLink.parentElement.classList.remove("active");
        });

        link.parentElement.classList.add("active");
        const tab = link.getAttribute("href").substring(1); 


        contentContainer.innerHTML = "";
        contactContent.style.display = "none";

        switch (tab) {
            case "about":
                displayAboutMeInfo();
                break;
            case "skills":
                displaySkillsPage();
                break;
            case "github":
                displayRepoContent();
                break;
            case "mysmarthome":
                displayMysmarthomePreview();
                break;
            case "blog":
                displayBlogPreview();
                break;
            case "experience":
                displayLinkedInProfile();
                break;
            case "contact":
                contactContent.style.display = "block";
                break;
            default:
                displayUnderConstructionMessage();
                break;
        }
    });
});

displayAboutMeInfo();
});