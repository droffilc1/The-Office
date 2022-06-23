firebase.auth().onAuthStateChanged((user)=> {
    if(user) {

        // pull payment method

        firebase.firestore().collection("paymentMethod").get().then((querySnapshot)=> {
            let content = '';

            querySnapshot.forEach((doc) =>{
                let pMethod = doc.data().pMethodInput;
                let docId = doc.data().docId;   
                
                content += '<option value="'+pMethod+'">'+pMethod+'</option>';
            })

            $("#paymentMethod").append(content)
        })
        
    }else {

    }
})