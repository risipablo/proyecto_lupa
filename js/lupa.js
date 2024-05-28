
document.addEventListener("DOMContentLoaded",function(){
    const img = document.getElementById('image')
    const lupa = document.getElementById('lens')
    const factor = 2// parametro de zoom

    // fondo de lupa
    lupa.style.backgroundImage = `url('${img.src}')`

    // tamaño de lupa
    lupa.style.backgroundSize = `${img.width * factor}px ${img.height * factor}px`

    // llama a las funciones de mover lupa (mas abajo aparecera dicha función)
    img.addEventListener("mousemove",moveLens)
    lupa.addEventListener("mousemove", moveLens)
    img.addEventListener("mouseleave", hideLens)
    lupa.addEventListener("mouseleave", hideLens)

    function moveLens(event){
        const pos = getCursorpos(event);
        const x = pos.x
        const y = pos.y 

        let lensX = x - lupa.offsetWidth / 2
        let lensY = y - lupa.offsetHeight / 2

        // Limitar el movimiento de la lupa dentro de la imagen
        if (lensX < 0) lensX = 0
        if (lensY < 0) lensY = 0
        if (lensX > img.width - lupa.offsetWidth) lensX = img.width - lupa.offsetWidth
        if (lensY > img.height - lupa.offsetHeight) lensY = img.height - lupa.offsetHeight

        lupa.style.left = `${lensX}px`
        lupa.style.top = `${lensY}px`
        lupa.style.backgroundPosition = `-${lensX * factor}px -${lensY * factor}px`;
        lupa.style.visibility = 'visible'
    }

    function hideLens(){
        lupa.style.visibility = 'hidden'
    }

    function getCursorpos(event){
        const rect = img.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
})