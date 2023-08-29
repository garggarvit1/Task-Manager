window.addEventListener("load", () => {
    tkmanages = JSON.parse(localStorage.getItem('tkmanages')) || [];
    display(tkmanages);
    const form = document.querySelector("#new_task_form");
    const filter = document.querySelector("#filter");
    // const drop=document.querySelector("#dropdowm");
    console.log(filter.value);

    //for pop form
    const closeReference = document.querySelector("#divOne");
    const addNewTaskButon = document.querySelector(".addTask");

    addNewTaskButon.addEventListener("click", function () {
        closeReference.setAttribute("style", "display:block;");
    });

    form.addEventListener('submit', e => {

        e.preventDefault();
        
        // closeReference.setAttribute("style", "display:block;");
        // console.log(e.target.elements);
        const task_input = {
            content: e.target.elements.content_input.value,
            category: e.target.elements.catgories.value,
            date: new Date().getTime(),
            end: e.target.elements.end_date.value,
            done: false
        }

        console.log(task_input.end);
        // console.log(tkmanages.length);

        if (!task_input.category) {
            alert("please select category");
            return;
        }
        if (!task_input.end) {
            alert("Please Select Date");
            return;
        }
        let endDate = new Date(task_input.end).getTime();
        if (endDate < task_input.date) {
            alert("Please Select Valid Date");
            return;
        }

        // console.log(task_input.content);

        tkmanages.push(task_input);

        localStorage.setItem('tkmanages', JSON.stringify(tkmanages));

        e.target.reset();

        // for(let i=0;i<tkmanages.length;i++){
        //     console.log("a");
        // }

        display(tkmanages);

        closeReference.setAttribute("style", "display:none;");
    })

    filter.addEventListener('click', e => {

        const fl = filter.value;
        console.log(filter.value);
        displayFilter(fl);
        filter.value = "";
    })
})

function display(displayArgument) {
    //sort a table
    displayArgument.sort((s1, s2) => s2.date - s1.date);

    const tklist = document.querySelector(".tasklist");

    tklist.innerHTML = "";

    displayArgument.forEach(task_input => {
        const tkitem = document.createElement('div');
        tkitem.classList.add('content');

        const tkcategory = document.createElement('div');
        tkcategory.classList.add('content');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = task_input.done;


        console.log(new Date(task_input.date).getDay());
        const input_task = document.createElement('input');
        input_task.classList.add('task');
        input_task.type = "text";
        input_task.value = task_input.content;
        input_task.setAttribute("readonly", "readonly");

        const date=document.createElement('div');
        date.classList.add('Showdate');
        let eddate=new Date(task_input.end).getDate()+"-"+new Date(task_input.end).getFullYear();
        date.innerHTML=new Date(task_input.date).getDate()+' to '+eddate;

        const input_categoery = document.createElement('input');
        input_categoery.classList.add('task');
        input_categoery.type = "text";
        input_categoery.value = task_input.category;
        input_categoery.setAttribute("readonly", "readonly");



        const action_button = document.createElement('div');
        action_button.setAttribute("id", "option_button");

        const edit_button = document.createElement('button');
        edit_button.classList.add('edit');
        edit_button.innerHTML = "Edit";

        const delete_button = document.createElement('button');
        delete_button.classList.add('delete');
        delete_button.innerHTML = "Delete";

        tkitem.appendChild(input);
        tkitem.appendChild(input_task);
     
        tkcategory.appendChild(input_categoery);
        tkcategory.appendChild(date);
        action_button.appendChild(edit_button);
        action_button.appendChild(delete_button);



        tklist.appendChild(tkitem);
        tklist.appendChild(tkcategory);
        tklist.appendChild(action_button);

        if (task_input.done) {
            input_task.classList.add('checked')
        }

        input.addEventListener('click', e => {
            task_input.done = e.target.checked;
            localStorage.setItem('tkmanages', JSON.stringify(tkmanages));

            if (task_input.done) {
                input_task.classList.add('checked');
            }
            else {
                input_task.classList.remove('checked');
            }

            display(tkmanages);
        })

        edit_button.addEventListener('click', e => {
            const edit_input = tkitem.querySelector(".task");
            edit_input.removeAttribute('readonly');
            edit_input.focus();

            edit_input.addEventListener('blur', e => {
                edit_input.setAttribute('readonly', true);
                task_input.content = e.target.value;
                task_input.date = new Date().getTime();
                localStorage.setItem('tkmanages', JSON.stringify(tkmanages));
                // tkmanages.sort((s1,s2)=>{
                //     s2.date-s1.date;
                // })
                display(tkmanages);
            })
        })

        delete_button.addEventListener('click', e => {
            tkmanages = tkmanages.filter(t => t != task_input);
            localStorage.setItem('tkmanages', JSON.stringify(tkmanages));
            display(tkmanages);
        })


    })
}


function displayFilter(filterVlaue) {
    tkmanages.sort((s1, s2) => s2.date - s1.date);
    const filterlist = document.querySelector(".tasklist");
    filterlist.innerHTML = "";
    if (filter.value) {

        tkmanages.forEach(task_input => {
            const tkitem = document.createElement('div');
            tkitem.classList.add('content');

            const tkcategory = document.createElement('div');
            tkitem.classList.add('content');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = task_input.done;

            if (task_input.category === filterVlaue) {
                const input_task = document.createElement('input');
                input_task.classList.add('task');
                input_task.type = "text";
                input_task.value = task_input.content;
                input_task.setAttribute("readonly", "readonly");

                const input_categoery = document.createElement('input');
                input_categoery.classList.add('task');
                input_categoery.type = "text";
                input_categoery.value = task_input.category;
                input_categoery.setAttribute("readonly", "readonly");



                const action_button = document.createElement('div');
                action_button.setAttribute("id", "option_button");

                const edit_button = document.createElement('button');
                edit_button.classList.add('edit');
                edit_button.innerHTML = "Edit";

                const delete_button = document.createElement('button');
                delete_button.classList.add('delete');
                delete_button.innerHTML = "Delete";

                tkitem.appendChild(input);
                tkitem.appendChild(input_task);
                tkcategory.appendChild(input_categoery);
                action_button.appendChild(edit_button);
                action_button.appendChild(delete_button);



                filterlist.appendChild(tkitem);
                filterlist.appendChild(tkcategory);
                filterlist.appendChild(action_button);

                if (task_input.done) {
                    input_task.classList.add('checked')
                }

                input.addEventListener('click', e => {
                    task_input.done = e.target.checked;
                    localStorage.setItem('tkmanages', JSON.stringify(tkmanages));

                    if (task_input.done) {
                        input_task.classList.add('checked');
                    }
                    else {
                        input_task.classList.remove('checked');
                    }

                    display(tkmanages);
                })

                edit_button.addEventListener('click', e => {
                    const edit_input = tkitem.querySelector(".task");
                    edit_input.removeAttribute('readonly');
                    edit_input.focus();

                    edit_input.addEventListener('blur', e => {
                        edit_input.setAttribute('readonly', true);
                        task_input.content = e.target.value;
                        task_input.date = new Date().getTime();
                        localStorage.setItem('tkmanages', JSON.stringify(tkmanages));
                        // tkmanages.sort((s1,s2)=>{
                        //     s2.date-s1.date;
                        // })
                        display(tkmanages);
                    })
                })

                delete_button.addEventListener('click', e => {
                    tkmanages = tkmanages.filter(t => t != task_input);
                    localStorage.setItem('tkmanages', JSON.stringify(tkmanages));
                    display(tkmanages);
                })
            }
        })
    }
    else {

        display(tkmanages);
    }
}

const inputSearch = document.querySelector(".search-box");

inputSearch.addEventListener("click", function (event) {
    let cl = document.querySelector('.input-search').classList;
    if (cl.contains('input-search-active')) {
        document.querySelector('.input-search').classList.remove('input-search-active');
    }
    else {
        document.querySelector('.input-search').classList.add('input-search-active');
        document.querySelector(".input-search").focus();
    }
});

inputSearch.addEventListener("keyup", function (event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredTasks = tkmanages.filter(task => task.content.toLowerCase().includes(searchValue));

    if (searchValue === "") {
        display(tkmanages); // If the search box is empty, display all tasks
    } else {
        console.log(filteredTasks);
        display(filteredTasks);

    }
});

// function displayFilteredTasks(filTasks) {
//     //sort a table

//     const tklist = document.querySelector(".tasklist");

//     tklist.innerHTML = "";

//     filTasks.forEach(task_input => {
//         const tkitem = document.createElement('div');
//         tkitem.classList.add('content');

//         const tkcategory = document.createElement('div');
//         tkitem.classList.add('content');

//         const input = document.createElement('input');
//         input.type = 'checkbox';
//         input.checked = task_input.done;



//         const input_task = document.createElement('input');
//         input_task.classList.add('task');
//         input_task.type = "text";
//         input_task.value = task_input.content;
//         input_task.setAttribute("readonly", "readonly");

//         const input_categoery = document.createElement('input');
//         input_categoery.classList.add('task');
//         input_categoery.type = "text";
//         input_categoery.value = task_input.category;
//         input_categoery.setAttribute("readonly", "readonly");



//         const action_button = document.createElement('div');
//         action_button.setAttribute("id", "option_button");

//         const edit_button = document.createElement('button');
//         edit_button.classList.add('edit');
//         edit_button.innerHTML = "Edit";

//         const delete_button = document.createElement('button');
//         delete_button.classList.add('delete');
//         delete_button.innerHTML = "Delete";

//         tkitem.appendChild(input);
//         tkitem.appendChild(input_task);
//         tkcategory.appendChild(input_categoery);
//         action_button.appendChild(edit_button);
//         action_button.appendChild(delete_button);



//         tklist.appendChild(tkitem);
//         tklist.appendChild(tkcategory);
//         tklist.appendChild(action_button);

//         if (task_input.done) {
//             input_task.classList.add('checked')
//         }

//         input.addEventListener('click', e => {
//             task_input.done = e.target.checked;
//             localStorage.setItem('tkmanages', JSON.stringify(tkmanages));

//             if (task_input.done) {
//                 input_task.classList.add('checked');
//             }
//             else {
//                 input_task.classList.remove('checked');
//             }

//             display(tkmanages);
//         })

//         edit_button.addEventListener('click', e => {
//             const edit_input = tkitem.querySelector(".task");
//             edit_input.removeAttribute('readonly');
//             edit_input.focus();

//             edit_input.addEventListener('blur', e => {
//                 edit_input.setAttribute('readonly', true);
//                 task_input.content = e.target.value;
//                 task_input.date = new Date().getTime();
//                 localStorage.setItem('tkmanages', JSON.stringify(tkmanages));
//                 // tkmanages.sort((s1,s2)=>{
//                 //     s2.date-s1.date;
//                 // })
//                 display(tkmanages);
//             })
//         })

//         delete_button.addEventListener('click', e => {
//             tkmanages = tkmanages.filter(t => t != task_input);
//             localStorage.setItem('tkmanages', JSON.stringify(tkmanages));
//             display(tkmanages);
//         })


//     })
// }