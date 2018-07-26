
//listen for submit

document.querySelector('#loan-form').addEventListener('submit', function(e){
 //Hide results
document.getElementById('results').style.display = 'none';
//Show loader
document.querySelector('.lds-roller').style.display = 'block';
setTimeout(calculateResults,1500)
  e.preventDefault();
  
});

//Calculate Results

function calculateResults(e){
 
 //UI Vars
 const amount =  document.getElementById('amount');
 const interest = document.getElementById('interest');
 const years = document.getElementById('years');
 const monthlyPayment = document.getElementById('monthly-payment');
 const totalPayment = document.getElementById('total-payment');
 const totalInterest = document.getElementById('total-interest');
 //these 6 above are the 3 fields we have in our UI

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) /100 /12;
  const calculatedPayments = parseFloat(years.value) *12;

  //Compute Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);
 
  if(isFinite(monthly)){
    monthlyPayment.value =  monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
      //show results
    document.getElementById('results').style.display = 'block';
    
  }else{
   showError('Please check your numbers')
  }
  
  //hide loader
  document.querySelector('.lds-roller').style.display = 'none';
}

//in case of error

function showError(err){
  
    //create a div
    const errorDiv = document.createElement('div');
    //add a class
    errorDiv.className ='alert alert-danger';
    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(err))

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    
      setTimeout(clearError,3000)
    
   
  
  

}
// //show loader
// function showLoader(){
//   setTimetout(function(){
//     var loader = document.querySelector('.lds-roller');
//     loader.classList.toggle('loading');
//   },1500)
  

// }

function clearError(){
  document.querySelector('.alert').remove();
  
}
