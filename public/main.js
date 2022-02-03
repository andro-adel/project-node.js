{
  // dark
  const dark = document.getElementById("dark");
  const body = document.getElementById("body");

  dark.addEventListener("click", (eo) => {
    body.classList.toggle("dark");
  });
}

// loop foreach

const courses = ["HTML", "CSS", "JavaScript", { myname: "andro" }];

courses.forEach((item) => {
  console.log(item);
  console.log(courses[3].myname);
});

const items = [
  { title: "c#" },
  { title: "asp.net" },
  { title: "laravel" },
  { title: "react" },
];

items.forEach((item) => {
  console.log(item.title);
});

console.log(maintitle.getAttribute("data-article"));

console.log(maintitle.getAttribute("id"));

console.log(maintitle.getAttribute("dir"));

console.log(maintitle.getAttribute("lang"));
