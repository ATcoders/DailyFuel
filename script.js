// --- STATE VARIABLES ---
let totalCal = 0;
let totalProtein = 0;
let totalBurned = 0;

// --- DATA SOURCE: FOODS ---
const FOODS = [
    {name:"Rice (Cooked, 100g)",cal:130,protein:2.7},
    {name:"Jeera Rice (Cooked, 100g)",cal:150,protein:3},
    {name:"Fried Rice (Cooked, 100g)",cal:170,protein:4},
    {name:"Dal (Cooked, 100g)",cal:110,protein:7},
    {name:"Rajma (Cooked, 100g)",cal:135,protein:8},
    {name:"Chole (Cooked, 100g)",cal:150,protein:8},
    {name:"Paneer Curry (100g)",cal:225,protein:12},
    {name:"Mixed Vegetable (100g)",cal:90,protein:3},
    {name:"Chapati (1 Piece)",cal:105,protein:3.5},
    {name:"Paratha (1 Piece)",cal:220,protein:5},
    {name:"Poori (1 Piece)",cal:110,protein:2},
    {name:"Banana (1 Medium)",cal:105,protein:1.3},
    {name:"Apple (1 Medium)",cal:95,protein:0.5},
    {name:"Mango (100g)",cal:60,protein:0.8},
    {name:"Orange (1 Medium)",cal:60,protein:1.2},
    {name:"Watermelon (100g)",cal:30,protein:0.6},
    {name:"Papaya (100g)",cal:43,protein:0.5},
    {name:"Pineapple (100g)",cal:50,protein:0.5},
    {name:"Grapes (100g)",cal:69,protein:0.7},
    {name:"Guava (1 Medium)",cal:68,protein:2.6},
    {name:"Milk (100ml)",cal:60,protein:3.2},
    {name:"Curd (100g)",cal:60,protein:3.5},
    {name:"Paneer (100g)",cal:265,protein:18},
    {name:"Cheese (1 Slice)",cal:70,protein:4},
    {name:"Butter (1 Tbsp)",cal:100,protein:0},
    {name:"Ghee (1 Tbsp)",cal:120,protein:0},
    {name:"Egg (1 Whole)",cal:75,protein:6},
    {name:"Egg White (1 Piece)",cal:17,protein:4},
    {name:"Chicken Breast (Cooked, 100g)",cal:165,protein:31},
    {name:"Chicken Curry (100g)",cal:180,protein:16},
    {name:"Fish (Cooked, 100g)",cal:120,protein:22},
    {name:"Soya Chunks (Dry, 100g)",cal:345,protein:52},
    {name:"Tofu (100g)",cal:90,protein:10},
    {name:"Whey Protein (1 Scoop)",cal:120,protein:24},
    {name:"Poha (100g Cooked)",cal:140,protein:3},
    {name:"Upma (100g Cooked)",cal:130,protein:3},
    {name:"Oats (100g Dry)",cal:389,protein:17},
    {name:"Idli (1 Piece)",cal:65,protein:2},
    {name:"Dosa (1 Piece)",cal:140,protein:3},
    {name:"Uttapam (1 Piece)",cal:160,protein:4},
    {name:"Pizza (1 Slice)",cal:275,protein:12},
    {name:"Burger (1 Piece)",cal:300,protein:15},
    {name:"Fries (100g)",cal:310,protein:3},
    {name:"Momos (1 Piece)",cal:35,protein:1.5},
    {name:"Noodles (100g Cooked)",cal:140,protein:4},
    {name:"Pasta (100g Cooked)",cal:140,protein:5},
    {name:"Maggi (1 Packet Prepared)",cal:310,protein:8},
    {name:"Samosa (1 Piece)",cal:260,protein:4},
    {name:"Kachori (1 Piece)",cal:280,protein:5},
    {name:"Pakora (1 Piece)",cal:60,protein:2},
    {name:"Potato Chips (100g)",cal:530,protein:6},
    {name:"Kurkure (100g)",cal:540,protein:6},
    {name:"Biscuit (1 Piece)",cal:40,protein:0.5},
    {name:"Tea (1 Cup)",cal:55,protein:1},
    {name:"Coffee (1 Cup)",cal:70,protein:1},
    {name:"Cold Drink (100ml)",cal:43,protein:0},
    {name:"Fruit Juice (100ml)",cal:50,protein:0.5},
    {name:"Lassi (100ml)",cal:85,protein:3},
    {name:"Protein Shake (1 Glass)",cal:120,protein:24},
    {name:"Gulab Jamun (1 Piece)",cal:160,protein:2},
    {name:"Rasgulla (1 Piece)",cal:110,protein:2},
    {name:"Jalebi (100g)",cal:330,protein:2},
    {name:"Laddu (1 Piece)",cal:190,protein:3},
    {name:"Ice Cream (100g)",cal:220,protein:4}
];

// --- DATA SOURCE: WORKOUTS ---
const GYM_WORKOUTS = [
    "Bench Press", "Incline Bench Press", "Push Ups", "Pull Ups", 
    "Lat Pulldown", "Barbell Row", "Seated Row", "Shoulder Press", 
    "Lateral Raise", "Rear Delt Fly", "Bicep Curl", "Hammer Curl", 
    "Tricep Pushdown", "Skull Crusher", "Squat", "Leg Press", 
    "Leg Extension", "Leg Curl", "Calf Raise", "Deadlift", "Shrugs", "Plank"
];

const CARDIO_WORKOUTS = [
    "Walking", "Running", "Jogging", "Cycling", "Swimming", 
    "Football", "Cricket", "Basketball", "Badminton", "Tennis", 
    "Volleyball", "Dance", "Yoga"
];

const WORKOUTS = [...GYM_WORKOUTS, ...CARDIO_WORKOUTS];

// --- FOOD FUNCTIONS ---
function fill(arr = FOODS) {
    food.innerHTML = "";
    arr.forEach(f => {
        const o = document.createElement("option");
        o.text = f.name;
        food.add(o);
    });
}

function filterFoods() {
    const q = search.value.toLowerCase();
    fill(FOODS.filter(f => f.name.toLowerCase().includes(q)));
}

function addFood() {
    const f = FOODS.find(x => x.name === food.value);
    if (!f) return;

    const q = Number(qty.value) || 1;
    const caloriesAdded = f.cal * q;
    const proteinAdded = f.protein * q;

    totalCal += caloriesAdded;
    totalProtein += proteinAdded;

    calories.innerText = Math.round(totalCal);
    protein.innerText = totalProtein.toFixed(1) + "g";

    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${f.name}</strong> × ${q}<br>
        ${Math.round(caloriesAdded)} kcal | ${proteinAdded.toFixed(1)}g protein<br>
        <button class="remove-btn">Remove</button>
    `;

    li.querySelector(".remove-btn").addEventListener("click", function() {
        totalCal -= caloriesAdded;
        totalProtein -= proteinAdded;
        calories.innerText = Math.round(totalCal);
        protein.innerText = totalProtein.toFixed(1) + "g";
        li.remove();
    });

    foodlog.appendChild(li);
}

// --- WORKOUT FUNCTIONS ---
function fillWorkout(arr = WORKOUTS) {
    workout.innerHTML = "";
    arr.forEach(w => {
        const o = document.createElement("option");
        o.text = w;
        workout.add(o);
    });
}

function filterWorkout() {
    const q = workoutSearch.value.toLowerCase();
    fillWorkout(WORKOUTS.filter(w => w.toLowerCase().includes(q)));
}

function updateWorkoutInputs() {
    const selected = workout.value;
    if (GYM_WORKOUTS.includes(selected)) {
        gymInputs.style.display = "block";
        cardioInputs.style.display = "none";
    } else {
        gymInputs.style.display = "none";
        cardioInputs.style.display = "block";
    }
}

function addWorkout() {
    const selected = workout.value;
    const p = JSON.parse(localStorage.getItem("profile") || "{}");
    const bodyWeight = p.weight || 70;
    let caloriesBurned = 0;
    const li = document.createElement("li");

    if (GYM_WORKOUTS.includes(selected)) {
        const s = Number(sets.value) || 0;
        const r = Number(reps.value) || 0;
        const w = Number(gymWeight.value) || 0;
        
        // Custom calculation logic for gym exercises from your snippets
        caloriesBurned = Math.round((s * r * Math.max(w, 20)) / 20);
        
        li.innerHTML = `
            <strong>${selected}</strong><br>
            ${s} Sets × ${r} Reps ${w > 0 ? `@ ${w}kg` : ""}<br>
            ~${caloriesBurned} kcal burned<br>
            <button class="remove-btn">Remove</button>
        `;
    } else {
        const mins = Number(minutes.value) || 0;
        
        // Dynamic metabolic intensive logic from your snippets
        const highIntensityCardio = ["Running", "Jogging", "Swimming", "Cycling", "Football", "Basketball", "Badminton"];
        const factor = highIntensityCardio.includes(selected) ? 0.12 : 0.08;
        
        caloriesBurned = Math.round(bodyWeight * factor * mins);

        li.innerHTML = `
            <strong>${selected}</strong><br>
            ${mins} minutes<br>
            ~${caloriesBurned} kcal burned<br>
            <button class="remove-btn">Remove</button>
        `;
    }

    totalBurned += caloriesBurned;
    // UI update placeholder for burned calories can be injected here if required (e.g., burnedDisplay.innerText = totalBurned;)

    li.querySelector(".remove-btn").addEventListener("click", function() {
        totalBurned -= caloriesBurned;
        li.remove();
    });

    workoutlog.appendChild(li);
}

// --- PROFILE & SETTINGS ---
function saveProfile() {
    const p = {
        age: +age.value,
        height: +height.value,
        weight: +weight.value,
        gender: gender.value,
        activity: activity.value,
        goal: goal.value
    };
    localStorage.setItem("profile", JSON.stringify(p));
    updateProfile();
}

function updateProfile() {
    const p = JSON.parse(localStorage.getItem("profile") || "{}");
    if (!p.weight) return;

    // Fixed the syntax formatting errors present in original math strings (e.g., 10p.weight to 10*p.weight)
    const bmr = p.gender === "male"
        ? (10 * p.weight) + (6.25 * p.height) - (5 * p.age) + 5
        : (10 * p.weight) + (6.25 * p.height) - (5 * p.age) - 161;

    const maintenanceCal = Math.round(bmr * Number(p.activity));
    const targetCal = maintenanceCal + (p.goal === "lose" ? -500 : p.goal === "gain" ? 500 : 0);

    maintenance.innerText = maintenanceCal;
    target.innerText = targetCal;
}

// --- INITIALIZATION ---
fill();
fillWorkout();
updateProfile();
updateWorkoutInputs();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
