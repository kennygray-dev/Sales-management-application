const progress = document.getElementById('progress');
const items = document.querySelectorAll('.num');
const steps = ["Travelers", "Seat selection", "Food & drinks", "Additional products", "Payment"]; // 
let currentStepIndex = 0; 
const maxSteps = steps.length;
let progressIncrement = 100 / maxSteps; 

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (steps[index] === steps[currentStepIndex]) { 
      item.classList.add('clicked'); 

     
      const newWidth = progressIncrement * (currentStepIndex + 1);
      progress.style.width = `${newWidth}%`;

      
      currentStepIndex++;
    }
  });
});




