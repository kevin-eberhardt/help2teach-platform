"use client";
export default function ConsentButton() {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.querySelector("button.CookiebotWidget-logo")?.click();
    document
      .getElementById("CookiebotWidget")
      ?.setAttribute("style", "visibility: visible");
  }
  return (
    <a href="#" onClick={onClick}>
      Cookies
    </a>
  );
}
