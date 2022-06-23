firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        //add payment method
        document.getElementById("saveaddPayment").onclick = function(){
            let pMethodInput = document.getElementById("pMethodInput").value;

            let addPayment = firebase.firestore().collection("paymentMethod").doc();
            addPayment.set({
                pMethodInput:pMethodInput,
                docId:addPayment.id
            }).then(()=>{
                window.location.reload();
            })
        }

        //view payment method
        firebase.firestore().collection("paymentMethod").get().then((querySnapshot)=>{
            let content = '';
            querySnapshot.forEach((doc)=>{

                let pMethod = doc.data().pMethodInput;
                let docId = doc.data().docId;

                content+=    '<tr>';
                content+=    '<td>' + pMethod +'</td>';
                content+=    '<td> <button class="btn btn-danger">Delete</button> </td>';                    
                content+=    '</tr>';

            })
            $("#paymentMethodList").append(content);
        })

    }else{
        window.location.href = "index.html";
    }
})