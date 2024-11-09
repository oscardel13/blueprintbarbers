// app.get('/api/barbers', async (req,res) => {
//     const barbersList = await getBarbersList()
    
//     const barbers = await  Promise.all(barbersList.map(async el => {
//       try{
//         posts = await instagramPosts(el.instagram)
//       }
//       catch{
//         posts = []
//       }
//         const updatedEl = {...el.toObject(), instagram: posts}
//         console.log(el.name)
//         return updatedEl
//     }))

//     res.status(200).json({barbers : barbers});
//   });