export default function showDateTime() {
  const time = document.querySelector(".time");
  const dateText = document.querySelector(".date");
  const greeting = document.querySelector(".greeting");

  const date = new Date();
  const hours = date.getHours();

  function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
  }

  function showDate() {
    const date = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const currentDate = date.toLocaleDateString("en-US", options);
    dateText.textContent = currentDate;
  }

  function getTimeOfDay() {
    const timesOfDay = ["night", "morning", "afternoon", "evening"];
    return timesOfDay[Math.floor(hours / 6)];
  }

  function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
  }

  showTime();

  function setLocalStorage() {
    const name = document.querySelector(".name");
    localStorage.setItem("name", name.value);
  }

  window.addEventListener("beforeunload", setLocalStorage);

  function getLocalStorage() {
    const name = document.querySelector(".name");
    if (localStorage.getItem("name")) {
      name.value = localStorage.getItem("name");
    }
  }

  window.addEventListener("load", getLocalStorage);
}
