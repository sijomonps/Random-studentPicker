document.addEventListener('DOMContentLoaded', () => {
    const students = [
        "ABHINAV RAJESH", "ABINTO TENNICHAN", "ABY JOSEPH", "ADHIL SHAJAHAN", "ADHITHYAN V S", "AKHIL S", 
        "ALAN AUGUSTHY", "ALAN DILEEP", "ALBERT CYRIAC", "ALBIN GEORGE", "ALBIN SAJU", "ALJO TENNIS", 
        "Alphin Joby", "AMAL THOMAS", "ANJANA V U", "ANN MARY", "ANNIE JOBEN", "ASHIN MATHEW LALICHAN", 
        "ASNI ANSARI FATHIMA", "ATHULYA M NAIR", "Ayush S", "BIBIN JOSEPH", "BINITTA SAJI", "BLESSON", 
        "CHRISTOPHER JOE", "CYRIL THOMAS", "DENIL JOSEPH SUNU", "Deva Nandhanan S", "DYVIN BIJU", 
        "GOURI NANDHAN P V", "J Sreeleha", "JOSEPH DOMINIC", "JOYALJOSHEY", "KIRAN Kuruvalla", 
        "LIVIA SHAIJAN", "M KIRAN", "MARIATT JOSEPH", "MEGHA BABY", "MEHA MARY SAMUVEL", "MELVIN MATHEW", 
        "MOBIN VARGHESE", "MUHAMMED RAIHAN", "NV EDWIN", "NOBLE SUNIL", "POOJA L", "RENJITHA V R", 
        "RIYA BOBAN", "RIYA GEORGE", "ROYAL LOUIS", "S GAUTHAM NARAYAN", "SANTHANA RAVEENDRAN", 
        "SANTHOSH KANNAN", "SHELBIN", "SIJOMON P S", "TINU TOMY", "TOJO TOM", "VISHNUPRIYA S", 
        "VIVEK MENON", "VYASAN BIJU", "SREEDHAR P SURESH"
    ];

    const preSelectionTexts = [
        "Picking the most powerful person...",
        "Searching for the legend...",
        "Who is the greatest of all time?",
        "Destiny is calling a name...",
        "Analyzing academic signatures...",
        "Calculating potential greatness..."
    ];

    const startBtn = document.getElementById('start-picker-btn');
    const initialView = document.getElementById('initial-view');
    const loadingView = document.getElementById('loading-view');
    const loadingTextElement = document.getElementById('loading-text-element');
    const resultModal = document.getElementById('result-modal');
    const studentNameDisplay = document.getElementById('student-name-display');
    const pickAgainBtn = document.getElementById('pick-again-btn');

    let textInterval;
    let lastIndex = -1;

    function startPicking() {
        // 1. Fade out the initial button
        initialView.style.opacity = '0';
        initialView.style.transform = 'scale(0.95)';
        initialView.style.pointerEvents = 'none';

        // 2. Fade in the loading view after a short delay
        setTimeout(() => {
            loadingView.style.opacity = '1';
            loadingView.style.transform = 'scale(1)';
        }, 400);

        // 3. Animate the loading text randomly
        const showRandomText = () => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * preSelectionTexts.length);
            } while (randomIndex === lastIndex);
            lastIndex = randomIndex;
            
            loadingTextElement.textContent = preSelectionTexts[randomIndex];
            loadingTextElement.classList.remove('animate');
            void loadingTextElement.offsetWidth; // Trigger reflow to restart animation
            loadingTextElement.classList.add('animate');
        };
        
        showRandomText(); // Show the first text immediately
        textInterval = setInterval(showRandomText, 2500); // Change text every 2.5 seconds

        // 4. After a few seconds, show the result
        setTimeout(showResult, 7800); // Total loading time
    }

    function showResult() {
        clearInterval(textInterval);

        // Pick the final student
        const selectedStudent = students[Math.floor(Math.random() * students.length)];
        studentNameDisplay.textContent = selectedStudent.toLowerCase();
        
        // Hide loading view and show modal
        loadingView.style.opacity = '0';
        resultModal.classList.add('visible');
    }

    function resetPicker() {
        resultModal.classList.remove('visible');

        // Reset views after modal fades out
        setTimeout(() => {
            initialView.style.opacity = '1';
            initialView.style.transform = 'scale(1)';
            initialView.style.pointerEvents = 'auto';
            loadingView.style.transform = 'scale(0.95)';
            loadingTextElement.textContent = '';
            lastIndex = -1; // Reset last index
        }, 400);
    }

    startBtn.addEventListener('click', startPicking);
    pickAgainBtn.addEventListener('click', resetPicker);
});