export function checkId(product, arr) {
    for (const element of arr) {
      if (element.id === product.id) {
        console.warn('Id del elemento ya existente')
        return this.newId(product, arr)
      }
    }
    return product.id
  }
  
  export function newId(product, arr) {
    arr.sort((a, b) => a - b) 
    product.id = parseInt(arr[arr.length - 1].id) + 1
    console.log(`Nuevo id ${product.id}`)
    return product.id
  }
  
  export function isLoggedIn(req, res, next) {
    req.session.nombre ? next() : res.redirect("/")
  }
  
  export function isLoggedOut(req, res, next) {
    req.session.nombre ? res.redirect('/home') : next()
  }
  
  export function getTimestamp() {
    return `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} - ${new Date().toLocaleTimeString('es-AR')}`
  }
  