import { squadMottos } from "../data/academyData.js";

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function setStatus(message) {
  const status = document.querySelector("#status");
  status.textContent = message;
}

export function renderDragon(dragon) {
  const container = document.querySelector("#dragonContent");
  container.innerHTML = `
    <p><strong>Name:</strong> ${dragon.name}</p>
    <p><strong>Type:</strong> ${dragon.type}</p>
    <p><strong>Size:</strong> ${dragon.size}</p>
    <p><strong>Alignment:</strong> ${dragon.alignment}</p>
    <p><strong>HP:</strong> ${dragon.hit_points}</p>
    <p><strong>CR:</strong> ${dragon.challenge_rating}</p>
    <p><strong>Speed:</strong> ${Object.values(dragon.speed).join(", ")}</p>
    <p><strong>Top Actions:</strong> ${(dragon.actions || []).slice(0, 3).map((action) => action.name).join(", ") || "Unknown"}</p>
  `;
}

export function renderRider(rider) {
  const container = document.querySelector("#riderContent");
  container.innerHTML = `
    <img class="avatar" src="${rider.picture.large}" alt="Portrait of ${rider.fullName}" />
    <p><strong>Name:</strong> ${rider.fullName}</p>
    <p><strong>Specialty:</strong> ${rider.specialty}</p>
    <p><strong>Temperament:</strong> ${rider.temperament}</p>
    <p><strong>Call Sign:</strong> ${rider.callSign}</p>
  `;
}

export function renderCompatibility(score) {
  const badge = document.querySelector("#compatibilityBadge");
  badge.textContent = `Compatibility: ${score}%`;
}

export function renderSavedTeams(teams, onDelete) {
  const container = document.querySelector("#savedTeams");

  if (!teams.length) {
    container.innerHTML = '<p class="placeholder">No squads saved yet.</p>';
    return;
  }

  container.innerHTML = teams
    .map(
      (team) => `
      <article class="saved-card" data-id="${team.id}">
        <div class="saved-card-head">
          <h3>${team.rider.fullName} &amp; ${team.dragon.name}</h3>
          <span class="badge">${team.compatibility}%</span>
        </div>
        <p><strong>Specialty:</strong> ${team.rider.specialty}</p>
        <p><strong>Dragon:</strong> ${team.dragon.type}, ${team.dragon.size}</p>
        <p><strong>Motto:</strong> ${team.motto}</p>
        <button class="secondary-button delete-team-btn" data-id="${team.id}">Remove</button>
      </article>
    `
    )
    .join("");

  container.querySelectorAll(".delete-team-btn").forEach((button) => {
    button.addEventListener("click", () => onDelete(button.dataset.id));
  });
}

export function createTeam(dragon, rider, compatibility) {
  return {
    id: crypto.randomUUID(),
    dragon,
    rider,
    compatibility,
    motto: randomItem(squadMottos),
    createdAt: new Date().toISOString()
  };
}
