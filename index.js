const form = document.forms.namedItem('login')
const dialog = document.querySelector('dialog')
const b = document.querySelector('b')
const p = document.querySelector('p')
const inputs = document.querySelectorAll('input')
let first = document.querySelector('#first')
let second = document.querySelector('#second')
let third = document.querySelector('#third')

let odin = document.querySelector('#odin')

let succes = 0
let unsucces = 0

let errorCount = 0;



const patterns = {
    name: /^[a-z ,.'-]+$/i,
    age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    phone: /^998([378]{2}|(9[013-57-9]))\d{7}$/g
}

inputs.forEach((inp) => {
    inp.onkeyup = () => {

        const errorSpan = document.querySelector('#zero');



        errorCount = 0;

        inputs.forEach((inp) => {
            inp.oninput = () => {




                if (inp.name === 'name') {
                    if (inp.value.length < 2 || inp.value.length > 10) {
                        first.textContent = 'Введено менее 2 символов или более 10 символов или же нельзя добавлять цифры на имя'
                        first.style.color = 'red'
                        errorCount++;
                    } else {
                        first.textContent = 'Все четко'
                        first.style.color = 'lime'
                        succes++
                    }
                }

                if (inp.name === 'age') {
                    if (inp.value <= 18) {
                        second.textContent = 'Малышка иди читай книжки это сайт для взрослых 18+ или же нельзя добавлять буквы на возраст!!!'
                        second.style.color = 'red'
                        errorCount++;
                    } else {
                        second.textContent = 'Все четко'
                        second.style.color = 'lime'
                        succes++
                    }
                }

                if (!patterns[inp.name].test(inp.value)) {
                    inp.classList.add('error')
                    errorCount++
                } else {
                    inp.classList.remove('error')
                    succes++

                }



                errorSpan.textContent = errorCount;
            }
        })

    }
})

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(form)
    let error = false

    let user = {}

    fm.forEach((val, key) => {
        user[key] = val
        if (val === 'not') error = true
    })
    inputs.forEach((inp) => {
        if (inp.value.length === 0 || inp.classList.contains('error')) {
            error = true
        }
    })

    if (user.language === 'not') {
        third.textContent = 'Выберите один из вариантов или же вы забыли выбрать вариант'
        third.style.color = 'red'
        unsucces++
        error = true
    } else {
        third.textContent = 'Все четко'
        third.style.color = 'lime'
        error = false
        succes++
    }


    if (error) {
        unsucces++
        alert('fill all fields')
        return
    }



    b.innerHTML = user.name

    p.innerHTML = `After 10 years you will be a senior ${user.language}`
    dialog.showModal()



    odin.length.textContent = succes;
    errorCount.textContent = unsucces;
}


dialog.onclick = () => {
    dialog.close()
}


