// Toutes les pièces majeures et variantes pour Sportive, SUV, Collection
const pieces = {
  sportive: {
    mecanique: [
      { nom: "Moteur V8 Turbo", prix: 15000 },
      { nom: "Moteur V6 Compressé", prix: 12000 },
      { nom: "Boîte manuelle 6 rapports", prix: 5000 },
      { nom: "Boîte automatique sport", prix: 5200 },
      { nom: "Suspension sport", prix: 3000 },
      { nom: "Freins céramique", prix: 4000 },
      { nom: "Turbo simple", prix: 4500 },
      { nom: "Turbo double", prix: 8800 },
      { nom: "Radiateur haute performance", prix: 3200 },
      { nom: "Échappement titane", prix: 6200 },
      { nom: "Différentiel sport", prix: 4800 },
      { nom: "Embrayage renforcé", prix: 3700 },
      { nom: "Cardan renforcé", prix: 2500 },
      { nom: "Injecteurs sport", prix: 1500 },
      { nom: "Allumage haute perf.", prix: 1800 }
    ],
    carrosserie: [
      { nom: "Capot carbone", prix: 3800 },
      { nom: "Capot aéré", prix: 4200 },
      { nom: "Capot simple", prix: 2800 },
      { nom: "Pare-chocs avant sport", prix: 3100 },
      { nom: "Pare-chocs arrière racing", prix: 2900 },
      { nom: "Aile avant carbone", prix: 2700 },
      { nom: "Aile arrière carbone", prix: 2600 },
      { nom: "Jantes forgées 18 pouces", prix: 4500 },
      { nom: "Jantes sport 19 pouces", prix: 5200 },
      { nom: "Toit ouvrant carbone", prix: 3300 },
      { nom: "Diffuseur arrière", prix: 3600 },
      { nom: "Spoiler sport", prix: 3100 },
      { nom: "Peinture nacrée rouge", prix: 5100 },
      { nom: "Peinture mate noire", prix: 4800 },
      { nom: "Rétroviseur carbone", prix: 1200 }
    ]
  },
  suv: {
    mecanique: [
      { nom: "Moteur V6 offroad", prix: 12500 },
      { nom: "Suspension hydraulique", prix: 9000 },
      { nom: "Freins offroad", prix: 4800 },
      { nom: "Boîte automatique renforcée", prix: 6400 },
      { nom: "Turbo diesel", prix: 5200 },
      { nom: "Radiateur renforcé", prix: 3300 },
      { nom: "Amortisseurs renforcés", prix: 4300 },
      { nom: "Différentiel blocable", prix: 4800 },
      { nom: "Cardan renforcé", prix: 2700 },
      { nom: "Échappement 4x4 double sortie", prix: 4200 }
    ],
    carrosserie: [
      { nom: "Capot blindé", prix: 5000 },
      { nom: "Pare-buffle avant", prix: 4200 },
      { nom: "Pare-chocs renforcé", prix: 4100 },
      { nom: "Aile avant renforcée", prix: 3100 },
      { nom: "Aile arrière renforcée", prix: 3200 },
      { nom: "Jantes tout-terrain", prix: 3800 },
      { nom: "Toit renforcé", prix: 3900 },
      { nom: "Barre LED avant", prix: 2200 },
      { nom: "Diffuseur arrière SUV", prix: 2500 },
      { nom: "Spoiler SUV", prix: 2800 }
    ]
  },
  collection: {
    mecanique: [
      { nom: "Moteur V12 classique", prix: 15800 },
      { nom: "Boîte automatique ancienne", prix: 7200 },
      { nom: "Suspension souple", prix: 4100 },
      { nom: "Freins tambour rénovés", prix: 2900 },
      { nom: "Échappement chromé", prix: 3800 },
      { nom: "Embrayage ancien", prix: 2500 },
      { nom: "Radiateur classique", prix: 1800 },
      { nom: "Injecteurs d’époque", prix: 1500 }
    ],
    carrosserie: [
      { nom: "Capot d’époque", prix: 3500 },
      { nom: "Pare-chocs chromé", prix: 3700 },
      { nom: "Aile avant restaurée", prix: 3300 },
      { nom: "Aile arrière restaurée", prix: 3400 },
      { nom: "Jantes rétro 15 pouces", prix: 4200 },
      { nom: "Toit ouvrant ancien", prix: 3100 },
      { nom: "Diffuseur arrière chromé", prix: 2900 },
      { nom: "Spoiler discret", prix: 2500 }
    ]
  }
};

// DOM Elements
const search = document.getElementById("search");
const suggestions = document.getElementById("suggestions");
const vehicleTypeSelect = document.getElementById("vehicleType");
const categorySelect = document.getElementById("category");
const ticketBody = document.querySelector("#ticket tbody");
const totalDisplay = document.getElementById("total");
const remiseInput = document.getElementById("remise");
const remiseType = document.getElementById("remiseType");
const applyRemiseBtn = document.getElementById("apply-remise");

let total = 0;
let remise = 0;

// 🔍 Recherche dynamique
function updateSuggestions() {
  const vehicle = vehicleTypeSelect.value;
  const category = categorySelect.value;
  const query = search.value.toLowerCase().trim();
  suggestions.innerHTML = "";

  if (!query) return;

  const filtered = pieces[vehicle][category].filter(p =>
    p.nom.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aucune pièce trouvée";
    li.style.color = "#999";
    suggestions.appendChild(li);
    return;
  }

  filtered.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nom} - ${p.prix} GTA$`;
    li.addEventListener("click", () => {
      addToTicket(p.nom, category, p.prix);
      search.value = "";
      suggestions.innerHTML = "";
    });
    suggestions.appendChild(li);
  });
}

// 📌 Ajouter au ticket
function addToTicket(nom, categorie, prix) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${nom}</td>
    <td>${categorie}</td>
    <td>${prix}</td>
    <td><button class="delete">X</button></td>
  `;
  ticketBody.appendChild(row);
  total += prix;
  updateTotal();

  row.querySelector(".delete").addEventListener("click", () => {
    ticketBody.removeChild(row);
    total -= prix;
    updateTotal();
  });
}

// 💸 Appliquer remise
applyRemiseBtn.addEventListener("click", () => {
  remise = parseFloat(remiseInput.value) || 0;
  updateTotal();
});

// 🔢 Mise à jour total
function updateTotal() {
  let totalFinal = total;
  if (remiseType.value === "montant") totalFinal -= remise;
  else if (remiseType.value === "pourcentage") totalFinal -= total * (remise / 100);
  if (totalFinal < 0) totalFinal = 0;
  totalDisplay.textContent = `Total : ${totalFinal.toFixed(2)} GTA$`;
}

// Événements
search.addEventListener("input", updateSuggestions);
vehicleTypeSelect.addEventListener("change", updateSuggestions);
categorySelect.addEventListener("change", updateSuggestions);