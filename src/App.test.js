test('getacct',()=>{
  fetch("http://localhost:3000/getacct",{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: 1
            })
        })
        .then(response => 
            response.json()
        ).then(ret=>{
          expect(ret.id).toBe(1);
        })
});