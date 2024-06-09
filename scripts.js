document.addEventListener("DOMContentLoaded", function () {
  const contentContainer = document.getElementById("contentContainer");
  const contactContent = document.getElementById("contactContent");
  const form = document.getElementById("form");

  const aboutMeContent = [
    "Father",
    "QA tester",
    "Sports enthusiast",
    "Talkative, inquisitive, ambitious, constantly looking for self-development and eager for news.",
  ];

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
      "Investigate and troubleshoot customer issues",
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
    ],
  };

  const certificationCourses = [
    {
      title: "Backend Testing Academy",
      image: "images/stb2EN.jpeg",
    },
    {
      title: "Podstawy sztucznej inteligencji",
      image: "images/podstawyAI.jpeg",
    },
    {
      title: "ISTQB Certified Tester",
      image: "images/istqb.jpeg",
    },
    {
      title: "QA: Bezpieczeństwo w testach",
      image: "images/bezpieczenstwo_w_testach.jpg",
    },
    {
      title: "HDI analityk centrum wsparcia",
      image: "images/analityk.jpg",
    },
    {
      title: "Budowa katalogu usług",
      image: "images/katalog_uslug.jpg",
    },
    {
      title: "Administration of Linux OS",
      image: "images/administration_Linux.jpg",
    },
    {
      title: "CCNA: Introduction to Networks",
      image: "images/Cisco_certificate_1.jpg",
    },
    {
      title: "CCNA: Routing and Switching Essentials",
      image: "images/Cisco_certificate_2.jpg",
    },
    {
      title: "CCNA: Scaling Networks",
      image: "images/Cisco_certificate_3.jpg",
    },
    {
      title: "CCNA: Connecting Networks",
      image: "images/Cisco_certificate_4.jpg",
    },
  ];

  function displayAboutMeInfo() {
    contentContainer.innerHTML = "";
    const aboutContainer = document.createElement("div");
    aboutContainer.classList.add("display-about-me-info");

    const title = document.createElement("h2");
    title.textContent = "Who I am?";

    aboutContainer.appendChild(title);

    aboutMeContent.forEach((element) => {
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

      respAndSkills[sectionTitle].forEach((skill) => {
        const listItem = document.createElement("li");
        listItem.textContent = skill;
        skillList.appendChild(listItem);
      });

      sectionContainer.appendChild(skillList);
      contentContainer.appendChild(sectionContainer);
    }
  }

  function displayCertificationCourses() {
    contentContainer.innerHTML = "";

    const pageTitle = document.createElement("h2");
    pageTitle.classList.add("main-title");
    pageTitle.textContent = "Certifications & Courses";
    contentContainer.appendChild(pageTitle);

    const certificationCoursesContainer = document.createElement("div");
    certificationCoursesContainer.classList.add("certification-courses");

    certificationCourses.forEach((course) => {
      const card = document.createElement("div");
      card.classList.add("certification-course-card");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("course-image-container");

      const image = document.createElement("img");
      image.src = course.image;
      image.alt = course.title;
      image.addEventListener("click", () => {
        window.open(course.image, "_blank");
      });

      imageContainer.appendChild(image);

      const title = document.createElement("h3");
      title.textContent = course.title;

      card.appendChild(imageContainer);
      card.appendChild(title);

      certificationCoursesContainer.appendChild(card);
    });

    contentContainer.appendChild(certificationCoursesContainer);
  }

  async function fetchRepoData() {
    const response = await fetch(
      "https://api.github.com/users/rciesielski3/repos"
    );
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

      repos.forEach((repo) => {
        const repoBox = document.createElement("div");
        repoBox.classList.add("repo-box");

        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.textContent = repo.name;

        const repoDescription = document.createElement("p");
        repoDescription.textContent =
          repo.description || "No description provided.";

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
    const iframeContainer = document.getElementById("contentContainer");
    contentContainer.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.src = "https://mysmarthome.cba.pl/";
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("webkitallowfullscreen", "");
    iframeContainer.appendChild(iframe);
  }

  function displayBlogPreview() {
    const iframeContainer = document.getElementById("contentContainer");
    iframeContainer.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.src = "https://qa-journey.blogspot.com/";
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("webkitallowfullscreen", "");
    iframeContainer.appendChild(iframe);
  }

  async function fetchLinkedInProfile() {
    try {
      const response = await fetch(
        "https://www.linkedin.com/in/rafa%C5%82-ciesielski-820309100/details/experience/"
      );
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
        showProfileButton.addEventListener("click", function () {
          window.open(
            "https://www.linkedin.com/in/rafa%C5%82-ciesielski-820309100",
            "_blank"
          );
        });
        contentContainer.appendChild(message);
        contentContainer.appendChild(showProfileButton);
        contentContainer.classList.add("contentContainer");
      }
    } catch (error) {
      console.error("Error fetching LinkedIn profile:", error);
      contentContainer.innerHTML =
        "<p>An error occurred while fetching LinkedIn profile. Please try again later.</p>";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(form);

      fetch("./submit_form.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            alert("Your message has been sent! Thank you.");
            form.reset();
          } else {
            alert("Failed to send message. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    });
  });

  function displayUnderConstructionMessage() {
    const message = document.createElement("p");
    message.textContent = "Coming soon. \n Under construction.";
    contentContainer.appendChild(message);
  }

  const menuLinks = document.querySelectorAll(".menu nav ul li a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      menuLinks.forEach((menuLink) => {
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
        case "courses":
          displayCertificationCourses();
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
