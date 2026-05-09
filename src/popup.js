function openPopup(location) {
    const popup = document.getElementById("popup");

    popup.classList.add("active");

    document.getElementById("popupTitle").textContent = location.name;
    document.getElementById("popupCategory").textContent = location.category;
    document.getElementById("popupImage").src = location.image;
    document.getElementById("popupCost").textContent = location.cost;
    document.getElementById("popupReview").textContent = location.review;
    document.getElementById("popupMapLink").href = location.googleMapsLink;

    const tipsContainer = document.getElementById("popupTips");
    tipsContainer.innerHTML = "";

    location.tips.forEach(tip => {
	const li = document.createElement("li");
	li.textContent = tip;
	tipsContainer.appendChild(li);
    });

    const ratingsContainer = document.getElementById("popupRatings");
    ratingsContainer.innerHTML = "";

    Object.entries(location.ratings).forEach(([k, v]) => {
	const card = document.createElement("div");
	card.className = "rating-card";
	card.innerHTML = `<span>${v}/10</span>${k}`;
	ratingsContainer.appendChild(card);
    });
}

document.getElementById("closeBtn").addEventListener("click", () => {
    document.getElementById("popup").classList.remove("active");
});
