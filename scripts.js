document.getElementById('calculateHalf').addEventListener('click', function() {
    const userName = document.getElementById('userName').value.trim();
    if (!userName || !/^[A-Za-z\s]+$/.test(userName)) {
        alert('Please enter a valid name containing only alphabets and spaces.');
        return;
    }

    const modules = [];
    let requiredValid = true;

    // Validate required modules 1-4
    for (let i = 1; i <= 4; i++) {
        const moduleName = document.getElementById(`module${i}`).value.trim();
        const caMark = parseFloat(document.getElementById(`caMark${i}`).value);
        const assignmentMark = parseFloat(document.getElementById(`assignmentMark${i}`).value);

        if (!moduleName || isNaN(caMark) || isNaN(assignmentMark)) {
            requiredValid = false;
            break;
        }

        modules.push({
            name: moduleName,
            ca: caMark,
            assignment: assignmentMark
        });
    }

    if (!requiredValid) {
        alert('Please fill in all fields for the first 4 required modules with valid numbers.');
        return;
    }

    // Add optional modules 5-6 if all fields are provided
    for (let i = 5; i <= 6; i++) {
        const moduleName = document.getElementById(`module${i}`).value.trim();
        const caMark = parseFloat(document.getElementById(`caMark${i}`).value);
        const assignmentMark = parseFloat(document.getElementById(`assignmentMark${i}`).value);

        // Include only if all fields are filled
        if (moduleName && !isNaN(caMark) && !isNaN(assignmentMark)) {
            modules.push({
                name: moduleName,
                ca: caMark,
                assignment: assignmentMark
            });
        }
    }

    // Calculate for each valid module
    const results = modules.map(module => {
        // Calculate half period mark: (0.5 * CA + 0.5 * Assignment) * 0.4
        const halfPeriod = ((0.5 * module.ca) + (0.5 * module.assignment)) * 0.4;

        // Calculate exam mark needed for 75% overall
        // Full period = halfPeriod + 0.6 * exam = 75
        // So exam = (75 - halfPeriod) / 0.6
        const examNeeded = (75 - halfPeriod) / 0.6;

        return {
            name: module.name,
            halfPeriod: halfPeriod.toFixed(2),
            examNeeded: examNeeded.toFixed(2)
        };
    });

    // Display results
    document.querySelector('#resultsContainer h2').textContent = `${userName}, Here are the Results for All of Your Modules:`;
    const resultsContainer = document.getElementById('modulesResults');
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const moduleDiv = document.createElement('div');
        moduleDiv.className = 'module-result';
        moduleDiv.innerHTML = `
            <h3>${result.name}</h3>
            <p>Half Period Mark: ${result.halfPeriod}%</p>
            <p>Exam Mark Needed for A (75%): ${result.examNeeded} out of 100</p>
        `;
        resultsContainer.appendChild(moduleDiv);
    });

    document.getElementById('resultsContainer').classList.remove('hidden');
});
