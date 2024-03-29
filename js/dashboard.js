const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep','Oct', 'Nov', 'Dec'],
        datasets: [
        {
            label: 'Income',
            data: [50000, 30000, 20000, 15000, 21000, 30000, 10000, 21000, 13000, 40000, 30000, 52000, 34000],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },

        {
            label: 'Expense',
            data: [10000, 4000, 14000, 10000, 17000, 18000, 10000, 31000, 17000, 20000, 20000, 32000, 30000],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },

    ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//calculate income today
firebase.firestore().collection("income").get().then((querySnapshot)=>{
    let income = 0;
    querySnapshot.forEach((doc)=>{

        let incomeAmount = doc.data().inAmount;
        let incomeDate =  doc.data().incDate;
        let conAmou = parseInt(incomeAmount)


        //getting todays date
        let todaysDate = new Date();
        let thisYear = todaysDate.getFullYear();
        let thisMonth = todaysDate.getMonth();

        thisMonth = thisMonth + 1;

        if(thisMonth < 10){
        
            thisMonth = "0" + thisMonth
        }

        let thisDate = todaysDate.getDate();
        let todaysFullDate = thisYear + "-" +  thisMonth + "-" + thisDate;



        //splitting time from date
        let splitDate = incomeDate.split("T");
        let firstIndex = splitDate[0]


        if(todaysFullDate == firstIndex){

        income = conAmou + income;

        }



    })

    function toCommas(value){
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    document.getElementById("todaysIncome").innerText = "KES." + toCommas(income);
})


//calculate expense
firebase.firestore().collection("expense").get().then((querySnapshot)=>{
    let expense = 0;
    querySnapshot.forEach((doc)=>{
        let theExpense = doc.data().exAmount;
        let exDate =  doc.data().exDate;
        let conExpense= parseInt(theExpense);        

        //getting todays date
        let todaysDate = new Date();
        let thisYear = todaysDate.getFullYear();
        let thisMonth = todaysDate.getMonth();

        thisMonth = thisMonth + 1;

        if(thisMonth < 10){
        
            thisMonth = "0" + thisMonth
        }

        let thisDate = todaysDate.getDate();
        let todaysFullDate = thisYear + "-" +  thisMonth + "-" + thisDate;

        //splitting time from date
        let splitDate = exDate.split("T");
        let firstIndex = splitDate[0]


            if(todaysFullDate == firstIndex){

            expense = conExpense + expense;

        }


    })

    function toCommas(value){
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    document.getElementById("todaysExpense").innerText = "KES." + toCommas(expense);    
})


// monthly income

firebase.firestore().collection("income").get().then((querySnapshot) => {
	let data = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep','Oct', 'Nov', 'Dec']; 
    
    
	querySnapshot.forEach((doc) => {
	
		var amount = doc.data().amount;
		var  date = doc.data().date;

		//2022-06-28
	
		let splitDate = date.split(" ");
		date = splitDate[1];        

		//find data in Jan

		if(month == 01){
		
		Jan = parseInt(amount);
		}

		if(month == 02){
		
		Feb = parseInt(amount);

		}

		if(month == 03){
		
		March = parseInt(amount);

		}	
        if(month == 04){
		
            April = parseInt(amount);    
    
        }	

        if(month == 05){
		
            May = parseInt(amount);
    
    
        }	


        if(month == 06){
    
            June = parseInt(amount);
    
    
        }	

        if(month == 07){

            July = parseInt(amount);
    
    
        }	



        if(month == 08){

            Aug = parseInt(amount);
    
    
            }	   


         if(month == 09) {
          Sept = parseInt(amount)
          } 
	



	
    })

    function toCommas(value){
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
	
    data();

    document.getElementById("monthIncome").innerText = "KES." + toCommas(income);
    
})
