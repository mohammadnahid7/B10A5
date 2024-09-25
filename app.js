let defaultMoney = 10000;
const donationAmountObj = {
	noa: 0,
	feni: 0,
	injured: 0,
};
const histories = [];

const mainMoney = document.getElementById("money");
const tabContainer = document.getElementsByClassName("buttons")[0];
const donationTab = document.getElementById("donation");
const historyTab = document.getElementById("history");
const modalCloseBtn = document.querySelector(".modal button");
const modal = document.querySelector(".modal");

function toggleTabVisibility(showTab, hideTab) {
	hideTab.style.display = "none";
	showTab.style.display = "block";
}
function amountValidation(value) {
	value = parseInt(value);
	if (typeof value === "number" && value > 0 && defaultMoney - value >= 0) {
		modal.style.display = "flex";
		return parseInt(value);
	} else {
		alert("Invalid Amount");
		return 0;
	}
}
function generateHistory(amount, place) {
	if (amount > 0) {
		const d = new Date();
		const time = d.toString();
		histories.push({ amount, time, place });
	}
}
function displayHistory() {
	const places = [
		"Support Flood Relief Efforts in Noakhali, Bangladesh",
		"Contribute to Flood Relief in Feni, Bangladesh",
		"Support for Injured in the Quota Reform Movement",
	];
	let totalHtml = "";
	for (let i = histories.length - 1; i >= 0; i--) {
		const currEl = histories[i];
		totalHtml += `
            <div class="card history-item">
                <span>${currEl.amount} Taka is donated to <i>'${places[currEl.place]}'</i></span>${
			i == histories.length - 1 ? '<span id="latest" class="bg-light">latest</span>' : ""
		}
                <p>Date: ${currEl.time}</p>
            </div>`;
	}
	console.log(totalHtml);
	historyTab.innerHTML = totalHtml;
}
tabContainer.addEventListener("click", function (event) {
	const currEl = event.target;
	if (currEl.className.includes("donation-tab") && !currEl.className.includes("active")) {
		toggleTabVisibility(donationTab, historyTab);
		currEl.className += " active";
		currEl.nextElementSibling.className = currEl.nextElementSibling.className.replace(
			" active",
			""
		);
	} else if (currEl.className.includes("history-tab") && !currEl.className.includes("active")) {
		toggleTabVisibility(historyTab, donationTab);
		currEl.className += " active";
		currEl.previousElementSibling.className = currEl.previousElementSibling.className.replace(
			" active",
			""
		);
		displayHistory();
	}
});

donationTab.addEventListener("click", function (e) {
	const currentEl = e.target;
	if (currentEl.tagName == "BUTTON") {
		const donationAmount = amountValidation(currentEl.previousElementSibling.value);
		if (currentEl.className.includes("noakhali")) {
			donationAmountObj.noa += donationAmount;
			document.getElementById("noakhali-amount").textContent = donationAmountObj.noa;
			generateHistory(donationAmount, 0);
		} else if (currentEl.className.includes("feni")) {
			donationAmountObj.feni += donationAmount;
			document.getElementById("feni-amount").textContent = donationAmountObj.feni;
			generateHistory(donationAmount, 1);
		} else {
			donationAmountObj.injured += donationAmount;
			document.getElementById("injured-amount").textContent = donationAmountObj.injured;
			generateHistory(donationAmount, 2);
		}
		defaultMoney -= donationAmount;
		mainMoney.textContent = defaultMoney;
		currentEl.previousElementSibling.value = "";
	}
});
modalCloseBtn.addEventListener("click", function () {
	modal.style.display = "none";
});
