const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep','Oct', 'Nov', 'Dec'],
        datasets: [
        {
            label: 'Income',
            data: [20000, 30000, 50000],
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
            data: [10000, 10000],
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
        let conExpense= parseInt(theExpense);
        let exDate =  doc.data().exDate;

        expense += conExpense;

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