let array = [];
const stepsContainer = document.getElementById('steps-container');
const message = document.getElementById('message');

function renderSteps(steps) {
    stepsContainer.innerHTML = '';
    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.textContent = `Step ${index + 1}: ${step}`;
        stepsContainer.appendChild(stepDiv);

        const rowDiv = document.createElement('div');
        rowDiv.className = 'array-row';
        array.forEach((value, i) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = value;
            if (i === step[0]) {
                element.classList.add('active'); // Highlight left index
            } else if (i === step[1]) {
                element.classList.add('active'); // Highlight right index
            }
            if (i === step[2]) {
                element.classList.add('mid'); // Highlight mid index
            }
            if (step[3] === 'found' && i === step[2]) {
                element.classList.add('found'); // Highlight found value
            }
            if (step[3] === 'not-found' && i === array.length - 1) {
                element.classList.add('not-found'); // Highlight last element if not found
            }
            rowDiv.appendChild(element);
        });
        stepsContainer.appendChild(rowDiv);
    });
}

function startSearch() {
    const arrayInput = document.getElementById('arrayInput').value;
    const searchValue = parseInt(document.getElementById('searchValue').value);

    if (!arrayInput || isNaN(searchValue)) {
        message.textContent = 'Please enter a valid array and number';
        return;
    }

    array = arrayInput.split(',').map(Number).sort((a, b) => a - b);
    message.textContent = '';
    stepsContainer.innerHTML = '';
    renderSteps([]);
    binarySearch(array, searchValue);
}

function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;
    const steps = [];

    function searchStep() {
        if (left <= right) {
            const mid = Math.floor((left + right) / 2);
            steps.push([left, right, mid, '']);
            if (array[mid] === target) {
                steps[steps.length - 1][3] = 'found';
                renderSteps(steps);
                message.textContent = `Value found at index ${mid}`;
                return;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
            setTimeout(searchStep, 1000);
        } else {
            steps.push([left, right, array.length - 1, 'not-found']);
            renderSteps(steps);
            message.textContent = 'Value not found';
        }
    }

    searchStep();
}

document.addEventListener('DOMContentLoaded', () => {
    renderSteps([]);
});
