const fire = document.getElementsByClassName("fa-fire");
const poop = document.getElementsByClassName("fa-poop");
const xDelete = document.getElementsByClassName("fa-x");

Array.from(fire).forEach(function(element) { //find and loop thru all icons and add smurf
    element.addEventListener('click', async function(){
        const id = this.parentNode.parentNode.id.split('-')[1] // Get the Shoe ID
    try {
      const response = await fetch(`/shoes/${id}/hot`, { method: 'PUT' }) // increase the hot count for this sneaker
      if (response.ok) {
        window.location.reload()
      }
    } catch (err) {
      console.error('Error increasing hot:', err)
    }
  })
})

Array.from(poop).forEach(function(element) { //find and loop thru all icons and add smurf
    element.addEventListener('click', async function(){
        const id = this.parentNode.parentNode.id.split('-')[1] // Get the Shoe ID - go up to the li and grab just the id
    try {
      const response = await fetch(`/shoes/${id}/not`, { method: 'PUT' }) // increase the not count for this sneaker
      if (response.ok) {
        window.location.reload()
      }
    } catch (err) {
      console.error('Error increasing not:', err)
    }
  })
})

Array.from(xDelete).forEach(function(element) {
    element.addEventListener('click', async function(){
        const id = this.parentNode.parentNode.id.split('-')[1] // Get the Shoe ID - go up to the li and grab just the id
    try {
      const response = await fetch(`/shoes/${id}`, { method: 'DELETE' }) // Delete' this sneaker
      if (response.ok) {
        window.location.reload()
      }
    } catch (err) {
      console.error('Error increasing not:', err)
    }
  })
})
