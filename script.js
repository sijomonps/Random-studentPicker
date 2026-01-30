document.addEventListener('DOMContentLoaded', () => {
    const students = [
        { name: "ABHINAV RAJESH", gender: "male" },
        { name: "ABINTO TENNICHAN", gender: "male" },
        { name: "ABY JOSEPH", gender: "male" },
        { name: "ADHIL SHAJAHAN", gender: "male" },
        { name: "ADHITHYAN V S", gender: "male" },
        { name: "AKHIL S", gender: "male" },
        { name: "ALAN AUGUSTHY", gender: "male" },
        { name: "ALAN DILEEP", gender: "male" },
        { name: "ALBERT CYRIAC", gender: "male" },
        { name: "ALBIN GEORGE", gender: "male" },
        { name: "ALBIN SAJU", gender: "male" },
        { name: "ALJO TENNIS", gender: "male" },
        { name: "ALPHIN JOBY", gender: "male" },
        { name: "AMAL THOMAS", gender: "male" },
        { name: "ANJANA V U", gender: "female" },
        { name: "ANN MARY", gender: "female" },
        { name: "ANNIE JOBEN", gender: "female" },
        { name: "ASHIN MATHEW", gender: "male" },
        { name: "ASNI ANSARI FATHIMA", gender: "female" },
        { name: "ATHULYA M NAIR", gender: "female" },
        { name: "AYUSH S", gender: "male" },
        { name: "BIBIN JOSEPH", gender: "male" },
        { name: "BINITTA SAJI", gender: "female" },
        { name: "BLESSON", gender: "male" },
        { name: "CHRISTOPHER JOE", gender: "male" },
        { name: "CYRIL THOMAS", gender: "male" },
        { name: "DENIL JOSEPH SUNU", gender: "male" },
        { name: "DEVA NANDHANAN S", gender: "male" },
        { name: "DYVIN BIJU", gender: "male" },
        { name: "GOURI NANDHAN P V", gender: "male" },
        { name: "J SREELEKHA", gender: "female" },
        { name: "JOSEPH DOMINIC", gender: "male" },
        { name: "JOYAL JOSHEY", gender: "male" },
        { name: "KIRAN KURUVILA", gender: "male" },
        { name: "LIVIA SHAIJAN", gender: "female" },
        { name: "M KIRAN", gender: "male" },
        { name: "MARIATT JOSEPH", gender: "female" },
        { name: "MEGHA BABY", gender: "female" },
        { name: "MEHA MARY SAMUVEL", gender: "female" },
        { name: "MELVIN MATHEW", gender: "male" },
        { name: "MOBIN VARGHESE", gender: "male" },
        { name: "MUHAMMED RAIHAN", gender: "male" },
        { name: "NV EDWIN", gender: "male" },
        { name: "NOBLE SUNIL", gender: "male" },
        { name: "POOJA L", gender: "female" },
        { name: "RENJITHA V R", gender: "female" },
        { name: "RIYA BOBAN", gender: "female" },
        { name: "RIYA GEORGE", gender: "female" },
        { name: "ROYAL LOUIS", gender: "male" },
        { name: "S GAUTHAM NARAYAN", gender: "male" },
        { name: "SANTHANA RAVEENDRAN", gender: "female" },
        { name: "SANTHOSH KANNAN", gender: "male" },
        { name: "SHELBIN", gender: "male" },
        { name: "SIJOMON P S", gender: "male" },
        { name: "TINU TOMY", gender: "male" },
        { name: "TOJO TOM", gender: "male" },
        { name: "VISHNUPRIYA S", gender: "female" },
        { name: "VIVEK MENON", gender: "male" },
        { name: "VYASAN BIJU", gender: "male" },
        { name: "SREEDHAR P SURESH", gender: "male" }
    ];

    const preSelectionTexts = [
        "Choosing the sharpest mind... 🔍",
        "Finding the smartest one... 🧠",
        "The Legend of MCA... 😌",
        "Calculating the next academic champion... 📚",
        "Choosing today’s genius... 🏆",
        "Searching for the top student... 📖",
        "Finding the class champion... 🏅",
        "The Star of Marian College...😎",
        "Finding today’s class genius... 🏆",
        "Who’s got the best brain today? 🧠"
    ];

    const startBtn = document.getElementById('start-picker-btn');
    const initialView = document.getElementById('initial-view');
    const loadingView = document.getElementById('loading-view');
    const loadingTextElement = document.getElementById('loading-text-element');
    const resultModal = document.getElementById('result-modal');
    const studentNameDisplay = document.getElementById('student-name-display');
    const pickAgainBtn = document.getElementById('pick-again-btn');
    const quickModeToggle = document.getElementById('quick-toggle-checkbox');
    
    // New elements for gender selection and temporary removal
    const genderToggleBtns = document.querySelectorAll('.toggle-btn');
    const tempRemovalBtn = document.getElementById('temp-removal-btn');
    const removalModal = document.getElementById('removal-modal');
    const studentsGrid = document.getElementById('students-grid');
    const resetRemovedBtn = document.getElementById('reset-removed-btn');
    const closeRemovalBtn = document.getElementById('close-removal-btn');

    let textInterval;
    let lastIndex = -1;
    let selectedGender = 'all';
    let temporarilyRemovedStudents = new Set();

    // Helper function to get available students based on gender filter and removals
    function getAvailableStudents() {
        let filteredStudents = students;
        
        // Filter by gender
        if (selectedGender === 'boys') {
            filteredStudents = students.filter(student => student.gender === 'male');
        } else if (selectedGender === 'girls') {
            filteredStudents = students.filter(student => student.gender === 'female');
        }
        
        // Filter out temporarily removed students
        filteredStudents = filteredStudents.filter(student => !temporarilyRemovedStudents.has(student.name));
        
        return filteredStudents;
    }

    // Function to populate the removal modal
    function populateRemovalModal() {
        studentsGrid.innerHTML = '';
        
        students.forEach(student => {
            const studentCard = document.createElement('div');
            studentCard.className = `student-card ${temporarilyRemovedStudents.has(student.name) ? 'removed' : ''}`;
            studentCard.textContent = student.name;
            studentCard.addEventListener('click', () => toggleStudentRemoval(student.name, studentCard));
            studentsGrid.appendChild(studentCard);
        });
    }

    // Function to toggle student removal
    function toggleStudentRemoval(studentName, cardElement) {
        if (temporarilyRemovedStudents.has(studentName)) {
            temporarilyRemovedStudents.delete(studentName);
            cardElement.classList.remove('removed');
        } else {
            temporarilyRemovedStudents.add(studentName);
            cardElement.classList.add('removed');
        }
        
        updateRemovalButtonText();
    }

    // Function to update removal button text
    function updateRemovalButtonText() {
        const removedCount = temporarilyRemovedStudents.size;
        const btn = document.getElementById('temp-removal-btn');
        if (removedCount > 0) {
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Temporary Removal (${removedCount})
            `;
        } else {
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Temporary Removal
            `;
        }
    }

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

        // 3. Animate the loading text randomly based on Quick Mode
        const isQuickMode = quickModeToggle.checked;
        
        const intervalDuration = isQuickMode ? 700 : 2500;
        const totalDuration = isQuickMode ? 1600 : 7800;
        const animationDuration = isQuickMode ? 0.7 : 2.5;

        loadingTextElement.style.animationDuration = `${animationDuration}s`;
        
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
        textInterval = setInterval(showRandomText, intervalDuration);

        // 4. After a few seconds, show the result
        setTimeout(showResult, totalDuration);
    }

    function showResult() {
        clearInterval(textInterval);

        // Get available students based on filters
        const availableStudents = getAvailableStudents();
        
        if (availableStudents.length === 0) {
            // Handle case where no students are available
            studentNameDisplay.textContent = "No students available!";
            studentNameDisplay.style.fontSize = '32px';
        } else {
            // Pick the final student
            const selectedStudent = availableStudents[Math.floor(Math.random() * availableStudents.length)];
            studentNameDisplay.textContent = selectedStudent.name.toLowerCase();
            studentNameDisplay.style.fontSize = '48px';
        }
        
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
    
    // Gender toggle event listeners
    genderToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            genderToggleBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Update selected gender
            selectedGender = btn.dataset.gender;
        });
    });
    
    // Temporary removal modal event listeners
    tempRemovalBtn.addEventListener('click', () => {
        populateRemovalModal();
        removalModal.classList.add('visible');
    });
    
    closeRemovalBtn.addEventListener('click', () => {
        removalModal.classList.remove('visible');
    });
    
    resetRemovedBtn.addEventListener('click', () => {
        temporarilyRemovedStudents.clear();
        populateRemovalModal();
        updateRemovalButtonText();
    });
    
    // Close removal modal when clicking outside
    removalModal.addEventListener('click', (e) => {
        if (e.target === removalModal) {
            removalModal.classList.remove('visible');
        }
    });
    
    // Close result modal when clicking outside
    resultModal.addEventListener('click', (e) => {
        if (e.target === resultModal) {
            resetPicker();
        }
    });
});

