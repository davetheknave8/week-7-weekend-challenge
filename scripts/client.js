$(document).ready( onReady );

let employees = [];
let monthlyCost = 0;
let yearlyCost = 0;

function onReady(){
    $('#submitButton').on('click', getEmployeeSalary)
    $('#employeeOut').on('click', '#deleteButton', deleteItem)
    costRed();
}

function getEmployeeSalary(){
    let employeeFirst = $('#firstNameIn').val();
    let employeeLast = $('#lastNameIn').val();
    let employeeID= $('#idIn').val();
    let employeeTitle= $('#titleIn').val();
    let employeeSalary = $('#salaryIn').val();

    let newEmployee = {
        firstName: employeeFirst,
        lastName: employeeLast,
        id: employeeID,
        title: employeeTitle,
        salary: employeeSalary
    }

    employees.push(newEmployee);
    
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#idIn').val('');
    $('#titleIn').val('');
    $('#salaryIn').val('');

    displaySalary();
    displayMonthlyCost();
    costRed();
}

//displays all employee information and get monthly cost and appends to dom
function displaySalary(){
    let el =$('#employeeOut');
    el.empty();
    for( let currentEmployee of employees){
        el.append(`<tr><td>${currentEmployee.firstName}</td><td>${currentEmployee.lastName}</td><td>${currentEmployee.id}</td>
        <td>${currentEmployee.title}</td><td>${currentEmployee.salary}</td><td><button id="deleteButton">Delete</button></td></tr>`)
    }
}

function displayMonthlyCost(){
    monthlyCost = 0;
    yearlyCost = 0;
    let elOne = $('#monthlyCost');
    let elTwo = $('#yearlyCost');
    for (let currentEmployee of employees) {
        monthlyCost += Math.round(Number(currentEmployee.salary) / 12)
        yearlyCost += Number(currentEmployee.salary)
    }
    elOne.empty();
    elOne.append(`${monthlyCost}`)
    elTwo.empty();
    elTwo.append(`${yearlyCost}`)
}

function deleteItem(event){
    let itemToDelete = $(this).parent().siblings().text()
    for(let currentEmployee of employees){
        let employeeString = currentEmployee.firstName + currentEmployee.lastName + currentEmployee.id
        + currentEmployee.title + currentEmployee.salary
        if(employeeString === itemToDelete){
            monthlyCost -= Math.round(Number(currentEmployee.salary) / 12);
            yearlyCost -= Number(currentEmployee.salary)
            $('#monthlyCost').empty();
            $('#monthlyCost').append(`${monthlyCost}`);
            $('#yearlyCost').empty()
            $('#yearlyCost').append(`${yearlyCost}`)
            employees.splice(employees.indexOf(currentEmployee), 1);
            displaySalary();
            costRed();
            return true;
        }
    }
}

function costRed(){
    if(monthlyCost > 20000){
        $('#cost').addClass('costRed')
    } else if(monthlyCost < 20000){
        $('#cost').removeClass('costRed')
    }
}

